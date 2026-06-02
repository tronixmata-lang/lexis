"use client";

import { useState } from "react";

interface ContactFormProps {
  source?: string;
  compact?: boolean;
}

export default function ContactForm({ source = "contact", compact = false }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          legalMatter: data.get("legalMatter"),
          message: data.get("message") || "",
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-dark-text">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1 block text-sm font-medium text-dark-text">
            Phone *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="+977 ..."
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-dark-text">
          Email *
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          placeholder="you@email.com"
        />
      </div>
      <div>
        <label htmlFor="legalMatter" className="mb-1 block text-sm font-medium text-dark-text">
          Legal Matter *
        </label>
        <select
          id="legalMatter"
          name="legalMatter"
          required
          className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="">Select practice area</option>
          <option value="Corporate Law">Corporate Law</option>
          <option value="Litigation">Litigation</option>
          <option value="Intellectual Property">Intellectual Property</option>
          <option value="Contract Drafting">Contract Drafting</option>
          <option value="Startup Advisory">Startup Advisory</option>
          <option value="Tax & Compliance">Tax & Compliance</option>
          <option value="Real Estate">Real Estate</option>
          <option value="Other">Other</option>
        </select>
      </div>
      {!compact && (
        <div>
          <label htmlFor="message" className="mb-1 block text-sm font-medium text-dark-text">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full rounded-md border border-gray-200 px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Briefly describe your legal matter..."
          />
        </div>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? "Sending..." : "Submit Inquiry"}
      </button>
      {status === "success" && (
        <p className="text-sm text-green-600">Thank you! We will contact you shortly.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
