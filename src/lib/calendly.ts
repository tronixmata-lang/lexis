/** Normalize a Calendly booking URL for inline embeds. */
export function getCalendlyUrl(): string | null {
  const raw = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim();
  if (!raw) return null;

  try {
    const url = new URL(raw);
    if (!url.hostname.endsWith("calendly.com")) return null;

    url.searchParams.set("embed_type", "Inline");
    url.searchParams.set("hide_gdpr_banner", "1");

    return url.toString();
  } catch {
    return null;
  }
}
