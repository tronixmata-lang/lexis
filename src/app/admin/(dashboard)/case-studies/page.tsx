"use client";

import { useCallback, useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import type { CaseStudy } from "@/lib/types";

const empty: CaseStudy = {
  id: "",
  title: "",
  category: "",
  summary: "",
  outcome: "",
  featured: false,
};

export default function AdminCaseStudiesPage() {
  const [items, setItems] = useState<CaseStudy[]>([]);
  const [form, setForm] = useState<CaseStudy>(empty);
  const [editing, setEditing] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/case-studies");
    if (res.ok) setItems(await res.json());
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/case-studies", {
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
      <h1 className="text-2xl font-bold text-navy">Case Studies</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required className="rounded border px-3 py-2 text-sm" />
          <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required className="rounded border px-3 py-2 text-sm" />
        </div>
        <textarea placeholder="Summary" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} required rows={2} className="w-full rounded border px-3 py-2 text-sm" />
        <textarea placeholder="Outcome" value={form.outcome} onChange={(e) => setForm({ ...form, outcome: e.target.value })} required rows={2} className="w-full rounded border px-3 py-2 text-sm" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
          Featured on homepage
        </label>
        <button type="submit" className="btn-primary text-sm">{editing ? "Update" : "Create"}</button>
      </form>
      <div className="mt-8">
        <CrudTable items={items} columns={[{ key: "title", label: "Title" }, { key: "category", label: "Category" }]} onEdit={(s) => { setForm(s); setEditing(true); }} onDelete={async (id) => { await fetch("/api/admin/case-studies", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); load(); }} />
      </div>
    </div>
  );
}
