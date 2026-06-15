import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../../../sanity/env";

export const sanityClient = createClient({
  projectId: projectId || "placeholder",
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/studio",
  },
});

export function getSanityClient() {
  if (!isSanityConfigured()) {
    return null;
  }
  return sanityClient;
}
