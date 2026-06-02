"use client";

import { useCallback, useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import type { Testimonial } from "@/lib/types";

const empty: Testimonial = {
  id: "",
  name: "",
  role: "",
  company: "",
  content: "",
  rating: 5,
  featured: false,
};

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [form, setForm] = useState<Testimonial>(empty);
  const [editing, setEditing] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/testimonials");
    if (res.ok) setItems(await res.json());
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/testimonials", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(empty);
    setEditing(false);
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Testimonials</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="rounded border px-3 py-2 text-sm" />
          <input placeholder="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required className="rounded border px-3 py-2 text-sm" />
          <input placeholder="Company" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required className="rounded border px-3 py-2 text-sm" />
          <input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="rounded border px-3 py-2 text-sm" />
        </div>
        <textarea placeholder="Testimonial content" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required rows={3} className="w-full rounded border px-3 py-2 text-sm" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
          Featured on homepage
        </label>
        <button type="submit" className="btn-primary text-sm">{editing ? "Update" : "Create"}</button>
      </form>
      <div className="mt-8">
        <CrudTable items={items} columns={[{ key: "name", label: "Name" }, { key: "company", label: "Company" }]} onEdit={(t) => { setForm(t); setEditing(true); }} onDelete={async (id) => { await fetch("/api/admin/testimonials", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); load(); }} />
      </div>
    </div>
  );
}
