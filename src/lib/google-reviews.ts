import { unstable_cache } from "next/cache";
import { promises as fs } from "fs";
import path from "path";
import { BRAND, CONTACT } from "./constants";
import { GOOGLE_REVIEWS } from "./google-reviews-data";

export interface GoogleReview {
  author: string;
  rating: number;
  text: string;
  relativeTime?: string;
  profilePhotoUrl?: string;
}

export interface GoogleReviewsData {
  rating: number;
  totalReviews: number;
  reviews: GoogleReview[];
  mapsUrl: string;
}

const PLACE_QUERY = `${BRAND.name}, Anamnagar, Kathmandu, Nepal`;
const CACHE_FILE = "google-reviews-cache.json";

type LegacyReview = {
  author_name?: string;
  rating?: number;
  text?: string;
  relative_time_description?: string;
  profile_photo_url?: string;
};

type LegacyDetailsResponse = {
  status?: string;
  result?: {
    rating?: number;
    user_ratings_total?: number;
    url?: string;
    reviews?: LegacyReview[];
  };
};

type LegacyFindResponse = {
  status?: string;
  candidates?: { place_id?: string }[];
};

async function readCache(): Promise<GoogleReviewsData | null> {
  const filePath = path.join(process.cwd(), "data", CACHE_FILE);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(raw) as GoogleReviewsData;
    return data.reviews?.length ? data : null;
  } catch {
    return null;
  }
}

async function resolvePlaceId(apiKey: string): Promise<string | null> {
  const configured = process.env.GOOGLE_PLACE_ID?.trim();
  if (configured) return configured;

  const { latitude, longitude } = CONTACT.geo;
  const params = new URLSearchParams({
    input: PLACE_QUERY,
    inputtype: "textquery",
    fields: "place_id",
    locationbias: `circle:1000@${latitude},${longitude}`,
    key: apiKey,
  });

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?${params}`,
    { next: { revalidate: 604800 } }
  );
  const data = (await res.json()) as LegacyFindResponse;
  if (data.status !== "OK" || !data.candidates?.[0]?.place_id) return null;
  return data.candidates[0].place_id;
}

function mapReviews(data: LegacyDetailsResponse["result"]): GoogleReviewsData {
  const reviews = (data?.reviews ?? [])
    .filter((r) => r.text?.trim())
    .map((r) => ({
      author: r.author_name ?? "Google User",
      rating: r.rating ?? 5,
      text: r.text!.trim(),
      relativeTime: r.relative_time_description,
      profilePhotoUrl: r.profile_photo_url,
    }));

  return {
    rating: data?.rating ?? 0,
    totalReviews: data?.user_ratings_total ?? reviews.length,
    reviews,
    mapsUrl: data?.url ?? CONTACT.googleReviewsUrl,
  };
}

async function fetchFromGoogle(): Promise<GoogleReviewsData | null> {
  if (GOOGLE_REVIEWS.reviews.length > 0) return GOOGLE_REVIEWS;

  const cached = await readCache();
  if (cached) return cached;

  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!apiKey) return null;

  const placeId = await resolvePlaceId(apiKey);
  if (!placeId) return readCache();

  const params = new URLSearchParams({
    place_id: placeId,
    fields: "reviews,rating,user_ratings_total,url",
    key: apiKey,
  });

  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?${params}`,
    { next: { revalidate: 86400 } }
  );
  const data = (await res.json()) as LegacyDetailsResponse;
  if (data.status !== "OK" || !data.result) return readCache();

  const mapped = mapReviews(data.result);
  return mapped.reviews.length ? mapped : readCache();
}

const getCachedGoogleReviews = unstable_cache(fetchFromGoogle, ["google-reviews"], {
  revalidate: 86400,
});

export async function getGoogleReviews(): Promise<GoogleReviewsData> {
  const fetched = await getCachedGoogleReviews();
  if (fetched) return fetched;

  return {
    rating: 0,
    totalReviews: 0,
    reviews: [],
    mapsUrl: CONTACT.googleReviewsUrl,
  };
}
