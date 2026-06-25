import { BRAND } from "@/lib/constants";
import { LinkedInIcon } from "@/components/icons/SocialIcons";

type SocialLinksProps = {
  variant?: "footer" | "panel";
};

export default function SocialLinks({ variant = "footer" }: SocialLinksProps) {
  const linkedin = BRAND.social.linkedin;
  if (!linkedin) return null;

  const linkClassName =
    variant === "footer"
      ? "flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-gray-300 transition-colors hover:border-gold hover:text-gold"
      : "inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 hover:border-gold hover:text-gold";

  return (
    <div className={variant === "footer" ? "mt-4 flex items-center gap-3" : "contents"}>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className={linkClassName}
      >
        <LinkedInIcon className="h-5 w-5" />
        {variant === "panel" ? "LinkedIn" : null}
      </a>
    </div>
  );
}
