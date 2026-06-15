import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export function resolvePostImage(
  image?: SanityImageSource | null,
  imageUrl?: string | null
): string | undefined {
  if (imageUrl?.trim()) {
    return imageUrl.trim();
  }
  if (image) {
    return urlFor(image).width(1200).quality(85).url();
  }
  return undefined;
}

export function resolveOgImage(image?: SanityImageSource | null): string | undefined {
  if (!image) return undefined;
  return urlFor(image).width(1200).height(630).fit("crop").url();
}
