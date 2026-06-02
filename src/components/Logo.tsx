import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logo.svg"
        alt="Lexis & Legis"
        width={180}
        height={54}
        priority
        className="h-10 w-auto sm:h-12"
      />
    </Link>
  );
}
