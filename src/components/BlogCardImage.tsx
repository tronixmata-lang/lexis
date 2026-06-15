"use client";

import Image from "next/image";
import { useState } from "react";

type BlogCardImageProps = {
  src: string;
  alt: string;
};

function isIllustration(src: string) {
  return src.startsWith("/blog/") || src.endsWith(".png") || src.endsWith(".svg");
}

export default function BlogCardImage({ src, alt }: BlogCardImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const illustration = isIllustration(imageSrc);

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill
      unoptimized={imageSrc.startsWith("/blog/")}
      className={`transition duration-500 hover:scale-[1.03] ${
        illustration ? "object-contain p-5" : "object-cover"
      }`}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      onError={() => setImageSrc("/blog-card-placeholder.svg")}
    />
  );
}
