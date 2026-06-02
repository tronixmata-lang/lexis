"use client";

import { useCallback, useEffect, useState } from "react";
import type { Inquiry } from "@/lib/types";

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/inquiries");
    if (res.ok) setInquiries(await res.json());
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function markRead(id: string) {
    await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: true }),
    });
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Client Inquiries</h1>
      <p className="mt-1 text-gray-600">Contact form submissions from the website</p>

      <div className="mt-8 space-y-4">
        {inquiries.length === 0 ? (
          <p className="text-gray-500">No inquiries yet.</p>
        ) : (
          inquiries.map((inq) => (
            <div
              key={inq.id}
              className={`rounded-lg border p-6 ${inq.read ? "border-gray-100 bg-white" : "border-primary/30 bg-primary/5"}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-navy">{inq.name}</h3>
                  <p className="text-sm text-gray-500">
                    {inq.email} · {inq.phone}
                  </p>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs">{inq.source}</span>
                  <p className="mt-1 text-xs text-gray-400">
                    {new Date(inq.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm font-medium text-primary">{inq.legalMatter}</p>
              {inq.message && <p className="mt-2 text-sm text-gray-600">{inq.message}</p>}
              {!inq.read && (
                <button
                  type="button"
                  onClick={() => markRead(inq.id)}
                  className="mt-4 text-sm text-primary hover:underline"
                >
                  Mark as read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
