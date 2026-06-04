"use client";

import { useState } from "react";
import { PRACTICE_AREAS } from "@/lib/constants";

interface ContactFormProps {
  source?: string;
  compact?: boolean;
  /** Full contact page form, matches lexislegis.com fields */
  full?: boolean;
  darkLabels?: boolean;
}

const inputClass = (dark: boolean) =>
  `w-full rounded-lg border px-4 py-3 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
    dark
      ? "border-gray-200 bg-white text-dark-text focus:border-primary"
      : "border-gray-200 bg-white text-dark-text focus:border-primary"
  }`;

const labelClass = (dark: boolean) =>
  `mb-1.5 block text-sm font-medium ${dark ? "text-navy" : "text-dark-text"}`;

export default function ContactForm({
  source = "contact",
  compact = false,
  full = false,
  darkLabels = false,
}: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    const subject = data.get("subject") as string | null;
    const address = data.get("address") as string | null;
    const legalMatter = (data.get("legalMatter") as string) || subject || "General Inquiry";
    let message = (data.get("message") as string) || "";
    if (address) message = `Address: ${address}\n\n${message}`.trim();

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          legalMatter,
          message,
          subject: subject || undefined,
          address: address || undefined,
          source,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className={compact || full ? "space-y-5" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label htmlFor="name" className={labelClass(darkLabels)}>
            Name *
          </label>
          <input
            id="name"
            name="name"
            required
            className={inputClass(darkLabels)}
            placeholder="Your full name"
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass(darkLabels)}>
            Phone *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className={inputClass(darkLabels)}
            placeholder="+977 15922904"
          />
        </div>
      </div>

      <div className={full ? "grid gap-5 sm:grid-cols-2" : ""}>
        <div>
          <label htmlFor="email" className={labelClass(darkLabels)}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={inputClass(darkLabels)}
            placeholder="you@email.com"
          />
        </div>
        {full && (
          <div>
            <label htmlFor="address" className={labelClass(darkLabels)}>
              Address
            </label>
            <input
              id="address"
              name="address"
              className={inputClass(darkLabels)}
              placeholder="City, Country"
            />
          </div>
        )}
      </div>

      {full ? (
        <div>
          <label htmlFor="subject" className={labelClass(darkLabels)}>
            Subject *
          </label>
          <input
            id="subject"
            name="subject"
            required
            className={inputClass(darkLabels)}
            placeholder="Brief subject of your inquiry"
          />
        </div>
      ) : (
        <div>
          <label htmlFor="legalMatter" className={labelClass(darkLabels)}>
            Legal Matter *
          </label>
          <select
            id="legalMatter"
            name="legalMatter"
            required
            className={inputClass(darkLabels)}
          >
            <option value="">Select practice area</option>
            {PRACTICE_AREAS.map((area) => (
              <option key={area.slug} value={area.navLabel ?? area.title}>
                {area.navLabel ?? area.title}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </div>
      )}

      {!compact && (
        <div>
          <label htmlFor="message" className={labelClass(darkLabels)}>
            Message {full ? "*" : ""}
          </label>
          <textarea
            id="message"
            name="message"
            required={full}
            rows={full ? 5 : 4}
            className={inputClass(darkLabels)}
            placeholder="Describe your legal matter or question..."
          />
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className={`${full ? "btn-gold w-full py-3.5 text-base" : "btn-primary w-full sm:w-auto"} disabled:opacity-60`}
      >
        {status === "loading" ? "Sending..." : full ? "Send Message" : "Submit Inquiry"}
      </button>

      {status === "success" && (
        <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
          Thank you! Our team will contact you shortly. Your details are kept confidential.
        </p>
      )}
      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Something went wrong. Please call us directly or try again.
        </p>
      )}
    </form>
  );
}
