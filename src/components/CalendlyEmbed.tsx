"use client";

import { InlineWidget } from "react-calendly";

type CalendlyEmbedProps = {
  url: string;
};

export default function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <InlineWidget
        url={url}
        styles={{ height: "700px", minWidth: "100%" }}
        pageSettings={{
          backgroundColor: "ffffff",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "0f4fa8",
          textColor: "0a1f44",
        }}
      />
    </div>
  );
}
