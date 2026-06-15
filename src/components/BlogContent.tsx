import type { ContentBlock } from "@/lib/blog-content";

type BlogContentProps = {
  blocks: ContentBlock[];
};

function formatListItem(text: string) {
  const labeled = text.match(/^([^:]{2,80}):\s+([\s\S]+)$/);
  if (labeled) {
    return (
      <>
        <strong className="text-navy">{labeled[1]}:</strong> {labeled[2]}
      </>
    );
  }
  return text;
}

export default function BlogContent({ blocks }: BlogContentProps) {
  return (
    <div className="article-prose">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "lead":
            return (
              <p key={index} className="article-lead">
                {block.text}
              </p>
            );

          case "h2":
            return (
              <h2 key={index} id={block.id} className="article-h2">
                <span className="article-h2-accent" aria-hidden="true" />
                {block.text}
              </h2>
            );

          case "h3":
            return (
              <h3 key={index} className="article-h3">
                {block.text}
              </h3>
            );

          case "paragraph": {
            const labeled = block.text.match(/^([^:]{3,90}):\s+([\s\S]+)$/);
            if (labeled && !/^(https?|Step \d)/i.test(labeled[1])) {
              return (
                <p key={index} className="article-paragraph">
                  <strong className="text-navy">{labeled[1]}:</strong> {labeled[2]}
                </p>
              );
            }
            return (
              <p key={index} className="article-paragraph">
                {block.text}
              </p>
            );
          }

          case "list":
            if (block.ordered) {
              return (
                <ol key={index} className="article-list article-list-ordered">
                  {block.items.map((item, itemIndex) => (
                    <li key={`${index}-${itemIndex}`}>{formatListItem(item)}</li>
                  ))}
                </ol>
              );
            }
            return (
              <ul key={index} className="article-list">
                {block.items.map((item, itemIndex) => (
                  <li key={`${index}-${itemIndex}`}>{formatListItem(item)}</li>
                ))}
              </ul>
            );

          case "callout":
            return (
              <aside key={index} className="article-callout">
                <p className="article-callout-title">{block.title}</p>
                {block.body && <p className="article-callout-body">{block.body}</p>}
              </aside>
            );

          case "disclaimer":
            return (
              <div key={index} className="article-disclaimer">
                <p className="article-disclaimer-label">Legal Notice</p>
                <p>{block.text}</p>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
