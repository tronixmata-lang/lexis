import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/constants";

const LOGO_WIDTH = 724;
const LOGO_HEIGHT = 345;

type LogoProps = {
  className?: string;
  size?: "default" | "footer";
};

export default function Logo({ className = "", size = "default" }: LogoProps) {
  const imageClass =
    size === "footer"
      ? "h-16 w-auto max-w-[min(100%,300px)] object-contain object-left sm:h-[4.5rem] sm:max-w-[340px]"
      : "h-12 w-auto max-w-[210px] object-contain object-left sm:h-14 sm:max-w-[250px] lg:h-16 lg:max-w-[280px]";

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center ${className}`}
      aria-label={`${BRAND.name} home`}
    >
      <Image
        src={BRAND.logo}
        alt={`${BRAND.name} logo`}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        sizes="(max-width: 640px) 210px, 280px"
        className={imageClass}
        priority={size === "default"}
      />
    </Link>
  );
}
