/**
 * Sync Google reviews to data/google-reviews-cache.json
 * Usage: GOOGLE_PLACES_API_KEY=your_key node scripts/sync-google-reviews.mjs
 */
import fs from "fs";
import path from "path";

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const QUERY = "Lexis and Legis Law Associates, Anamnagar, Kathmandu, Nepal";
const MAPS_URL =
  "https://www.google.com/maps/place/Lexis+%26+Legis+Law+Associates/@27.69784,85.3259851,17z/data=!4m8!3m7!1s0x39eb19bd8c5408bb:0xf47573840eb4b843!8m2!3d27.69784!4d85.32856!9m1!1b1!16s%2Fg%2F11t_sy0fkw";

if (!API_KEY) {
  console.error("Set GOOGLE_PLACES_API_KEY to sync reviews.");
  process.exit(1);
}

async function resolvePlaceId() {
  if (PLACE_ID) return PLACE_ID;
  const params = new URLSearchParams({
    input: QUERY,
    inputtype: "textquery",
    fields: "place_id",
    locationbias: "circle:1000@27.69784,85.32856",
    key: API_KEY,
  });
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?${params}`
  );
  const data = await res.json();
  if (data.status !== "OK" || !data.candidates?.[0]?.place_id) {
    throw new Error(`Could not resolve place ID: ${data.status}`);
  }
  console.log("Place ID:", data.candidates[0].place_id);
  return data.candidates[0].place_id;
}

async function fetchReviews(placeId) {
  const params = new URLSearchParams({
    place_id: placeId,
    fields: "reviews,rating,user_ratings_total,url",
    key: API_KEY,
  });
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?${params}`
  );
  const data = await res.json();
  if (data.status !== "OK") throw new Error(`Place details failed: ${data.status}`);
  return data.result;
}

const placeId = await resolvePlaceId();
const result = await fetchReviews(placeId);

const output = {
  rating: result.rating ?? 0,
  totalReviews: result.user_ratings_total ?? 0,
  mapsUrl: result.url ?? MAPS_URL,
  reviews: (result.reviews ?? [])
    .filter((r) => r.text?.trim())
    .map((r) => ({
      author: r.author_name ?? "Google User",
      rating: r.rating ?? 5,
      text: r.text.trim(),
      relativeTime: r.relative_time_description,
      profilePhotoUrl: r.profile_photo_url,
    })),
};

const outPath = path.join("data", "google-reviews-cache.json");
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`Saved ${output.reviews.length} reviews to ${outPath}`);
