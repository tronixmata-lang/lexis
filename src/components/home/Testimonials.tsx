"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { GoogleReview, GoogleReviewsData } from "@/lib/google-reviews";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 text-gold" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-current" : "fill-gray-200"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <article className="flex w-[340px] shrink-0 flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:w-[380px]">
      <div className="flex items-center gap-4">
        {review.profilePhotoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={review.profilePhotoUrl}
            alt=""
            width={48}
            height={48}
            className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-gold/20"
          />
        ) : (
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy/10 text-lg font-semibold text-navy">
            {review.author.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-navy">{review.author}</p>
          {review.relativeTime && (
            <p className="text-xs text-gray-500">{review.relativeTime}</p>
          )}
        </div>
      </div>
      <div className="mt-3">
        <Stars rating={review.rating} />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-gray-700">&ldquo;{review.text}&rdquo;</p>
    </article>
  );
}

export default function Testimonials({ initialData }: { initialData: GoogleReviewsData }) {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    if (initialData.reviews.length > 0) return;
    fetch("/api/google-reviews")
      .then((res) => res.json())
      .then((fetched: GoogleReviewsData) => {
        if (fetched.reviews?.length) setData(fetched);
      })
      .catch(() => undefined);
  }, [initialData.reviews.length]);

  const { reviews, rating, totalReviews, mapsUrl } = data;
  const hasReviews = reviews.length > 0;

  const loop = useMemo(
    () => (hasReviews ? [...reviews, ...reviews] : []),
    [hasReviews, reviews]
  );

  const duration = Math.min(Math.max(reviews.length * 2.5, 60), 150);

  return (
    <section id="testimonials" className="section-padding overflow-hidden bg-light-gray">
      <div className="container-narrow">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold">Client Voices</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-navy sm:text-4xl">
            What Our Clients Say
          </h2>
          {hasReviews && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Stars rating={Math.round(rating)} />
              <span className="text-sm text-gray-600">
                <strong className="font-semibold text-navy">{rating.toFixed(1)}</strong>
                {" · "}
                {totalReviews} Google {totalReviews === 1 ? "review" : "reviews"}
              </span>
            </div>
          )}
        </div>

        {hasReviews ? (
          <div className="relative mt-12 overflow-hidden">
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-light-gray to-transparent sm:w-24"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-light-gray to-transparent sm:w-24"
              aria-hidden="true"
            />
            <div
              className="testimonials-marquee flex w-max gap-6"
              style={{ animationDuration: `${duration}s` }}
            >
              {loop.map((review, i) => (
                <ReviewCard
                  key={`${review.author}-${review.text.slice(0, 24)}-${i}`}
                  review={review}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-xl rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
            <Stars rating={5} />
            <p className="mt-4 text-gray-600">
              Read what clients say about us on Google. We are proud to serve businesses and
              individuals across Kathmandu and internationally.
            </p>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 text-sm"
          >
            {hasReviews ? "View All Reviews on Google" : "Read Our Google Reviews"}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
