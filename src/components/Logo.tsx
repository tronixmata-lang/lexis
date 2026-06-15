import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  size?: "default" | "footer";
};

export default function Logo({ className = "", size = "default" }: LogoProps) {
  const imageClass =
    size === "footer" ? "h-14 w-auto sm:h-[4.25rem]" : "h-10 w-auto sm:h-12";

  return (
    <Link href="/" className={`inline-flex items-center ${className}`}>
      <Image
        src="/lexis.png"
        alt="Lexis and Legis logo"
        width={220}
        height={66}
        priority
        className={imageClass}
      />
    </Link>
  );
}
