import { REVALIDATE_SECONDS } from "@/lib/cache";
import { getGoogleReviews } from "@/lib/google-reviews";

export async function GET() {
  const data = await getGoogleReviews();
  return Response.json(data, {
    headers: {
      "Cache-Control": `public, s-maxage=${REVALIDATE_SECONDS.googleReviews}, stale-while-revalidate=3600`,
    },
  });
}
