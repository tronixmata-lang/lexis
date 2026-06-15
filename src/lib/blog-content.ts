export type ContentBlock =
  | { type: "lead"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "callout"; title: string; body?: string }
  | { type: "disclaimer"; text: string };

const DISCLAIMER_PREFIX = "The articles and content provided";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
}

function isDisclaimer(text: string): boolean {
  return text.startsWith(DISCLAIMER_PREFIX);
}

function isNumberedHeading(text: string): boolean {
  if (!/^\d+\.\s/.test(text)) return false;
  if (text.endsWith(".")) return false;
  if (text.length > 85) return false;
  if (/:\s/.test(text) && text.length > 70) return false;
  return true;
}

function isRomanHeading(text: string): boolean {
  return /^[IVX]+\.\s+/.test(text) && text.length < 160;
}

function isQuestionHeading(text: string): boolean {
  return text.endsWith("?") && text.length < 100 && !text.includes("\n");
}

function isColonSubheading(text: string): boolean {
  if (!/:\s*$/.test(text) || text.includes("\n")) return false;
  if (text.length > 130) return false;
  if (isNumberedHeading(text)) return false;

  const beforeColon = text.slice(0, text.lastIndexOf(":")).trim();
  if (beforeColon.length > 95) return false;

  return true;
}

function isSubheading(text: string): boolean {
  if (text.includes("\n")) return false;
  if (isColonSubheading(text)) return true;
  if (text.length > 90) return false;
  if (/^Step \d+:/i.test(text)) return true;
  if (
    /^(Grounds|Key |Required |Additional |Rights|Who |What |How |Why |Operation |Process |Other |Composition|Jurisdiction|Compensation|Legal Basis|Court Bench|Application |Circumstance)/i.test(
      text
    )
  ) {
    return true;
  }
  return /^[A-Z][^.!?]{2,70}:$/.test(text);
}

function isTitleLine(text: string, index: number): boolean {
  return index === 0 && text.length < 120 && !text.includes(".") && !/^\d+\./.test(text);
}

function isCalloutTitle(text: string, next?: string): boolean {
  if (text.length > 80) return false;
  if (/Case$|Why with us\??$/i.test(text)) return true;
  if (next && next.length > 100 && !isNumberedHeading(next) && !isSubheading(next)) {
    return /^[A-Z]/.test(text) && !text.endsWith(".") && text.split(" ").length <= 8;
  }
  return false;
}

function isListItem(text: string): boolean {
  if (/^•\s/.test(text)) return true;
  if (/^\(\d+\)\s/.test(text)) return true;
  if (/^\d+\.\s/.test(text) && text.length < 350) return true;
  return false;
}

function isLabeledParagraph(text: string): boolean {
  return /^[^:]+:\s+.{90,}/.test(text);
}

function isListLikeLine(text: string): boolean {
  if (text.length > 350) return false;
  if (isDisclaimer(text)) return false;
  if (isNumberedHeading(text)) return false;
  if (isRomanHeading(text)) return false;
  if (isQuestionHeading(text)) return false;
  if (isSubheading(text)) return false;
  if (isCalloutTitle(text)) return false;
  if (isLabeledParagraph(text)) return false;
  return true;
}

function stripBullet(text: string): string {
  return text.replace(/^•\s*/, "").replace(/^\(\d+\)\s*/, "").replace(/^\d+\.\s*/, "").trim();
}

function expandBulletBlock(block: string): string[] | null {
  if (!block.includes("•")) return null;
  const lines = block.split("\n").map((line) => stripBullet(line)).filter(Boolean);
  return lines.length >= 2 ? lines : null;
}

function listBlocksAreOrdered(blocks: string[]): boolean {
  return blocks.length > 0 && blocks.every((block) => /^\(\d+\)\s/.test(block) || /^\d+\.\s/.test(block));
}

function collectListItems(blocks: string[], start: number): { items: string[]; end: number; ordered: boolean } {
  const items: string[] = [];
  const rawItems: string[] = [];
  let i = start;

  while (i < blocks.length) {
    const block = blocks[i];
    if (isDisclaimer(block)) break;
    if (isNumberedHeading(block) || isRomanHeading(block) || isQuestionHeading(block)) break;
    if (isSubheading(block) && !isListItem(block)) break;
    if (isCalloutTitle(block, blocks[i + 1])) break;

    const bulletItems = expandBulletBlock(block);
    if (bulletItems) {
      items.push(...bulletItems);
      rawItems.push(block);
      i++;
      continue;
    }

    if (isListItem(block)) {
      items.push(stripBullet(block));
      rawItems.push(block);
      i++;
      continue;
    }

    if (isListLikeLine(block)) {
      items.push(block);
      rawItems.push(block);
      i++;
      continue;
    }

    break;
  }

  return { items, end: i, ordered: listBlocksAreOrdered(rawItems) };
}

function pushList(parsed: ContentBlock[], items: string[], ordered = false) {
  if (items.length === 0) return;
  parsed.push({
    type: "list",
    items,
    ordered,
  });
}

export function parseBlogContent(content: string, articleTitle?: string): ContentBlock[] {
  const raw = content
    .split("\n\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const parsed: ContentBlock[] = [];
  let i = 0;

  while (i < raw.length) {
    const block = raw[i];

    if (isDisclaimer(block)) {
      parsed.push({ type: "disclaimer", text: block });
      i++;
      continue;
    }

    if (isTitleLine(block, i) && articleTitle && block.toLowerCase() === articleTitle.toLowerCase()) {
      i++;
      continue;
    }

    if (isNumberedHeading(block)) {
      parsed.push({ type: "h2", text: block, id: slugify(block) });
      i++;
      continue;
    }

    if (isRomanHeading(block)) {
      parsed.push({ type: "h3", text: block });
      i++;
      continue;
    }

    if (isQuestionHeading(block)) {
      parsed.push({ type: "h3", text: block });
      i++;

      const { items, end, ordered } = collectListItems(raw, i);
      if (items.length >= 1) {
        pushList(parsed, items, ordered);
        i = end;
      }
      continue;
    }

    if (isSubheading(block)) {
      parsed.push({ type: "h3", text: block });
      i++;

      const { items, end, ordered } = collectListItems(raw, i);
      if (items.length >= 1) {
        pushList(parsed, items, ordered);
        i = end;
      }
      continue;
    }

    if (isCalloutTitle(block, raw[i + 1])) {
      const body = raw[i + 1] && !isNumberedHeading(raw[i + 1]) ? raw[i + 1] : undefined;
      parsed.push({ type: "callout", title: block, body });
      i += body ? 2 : 1;
      continue;
    }

    if (block.includes("\n•")) {
      const items = block
        .split("\n")
        .map((line) => stripBullet(line))
        .filter(Boolean);
      pushList(parsed, items);
      i++;
      continue;
    }

    const bulletItems = expandBulletBlock(block);
    if (bulletItems) {
      pushList(parsed, bulletItems);
      i++;
      continue;
    }

    if (isListItem(block)) {
      const { items, end, ordered } = collectListItems(raw, i);
      if (items.length >= 2) {
        pushList(parsed, items, ordered);
        i = end;
        continue;
      }
    }

    const ahead = collectListItems(raw, i);
    if (ahead.items.length >= 3 && !isLabeledParagraph(block)) {
      pushList(parsed, ahead.items, ahead.ordered);
      i = ahead.end;
      continue;
    }

    if (i === 0 || (parsed.length === 0 && i < 2)) {
      parsed.push({ type: "lead", text: block });
    } else {
      parsed.push({ type: "paragraph", text: block });
    }
    i++;
  }

  return parsed;
}

export function getTableOfContents(blocks: ContentBlock[]): { id: string; text: string }[] {
  return blocks
    .filter((b): b is Extract<ContentBlock, { type: "h2" }> => b.type === "h2")
    .map((b) => ({ id: b.id, text: b.text.replace(/^\d+\.\s*/, "") }));
}

export function estimateReadingTime(content: string): number {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
