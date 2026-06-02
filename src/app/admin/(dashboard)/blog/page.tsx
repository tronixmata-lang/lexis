"use client";

import { useCallback, useEffect, useState } from "react";
import CrudTable from "@/components/admin/CrudTable";
import type { BlogPost } from "@/lib/types";

const empty: BlogPost = {
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "",
  author: "",
  publishedAt: new Date().toISOString().split("T")[0],
  featured: false,
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<BlogPost>(empty);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/blog");
    if (res.ok) setPosts(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const method = editing ? "PUT" : "POST";
    const res = await fetch("/api/admin/blog", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm(empty);
      setEditing(false);
      load();
    }
  }

  async function handleDelete(id: string) {
    await fetch("/api/admin/blog", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  function startEdit(post: BlogPost) {
    setForm(post);
    setEditing(true);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Blog Posts</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="font-semibold text-navy">{editing ? "Edit Post" : "Add New Post"}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="rounded border px-3 py-2 text-sm"
          />
          <input
            placeholder="Slug (url-friendly)"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
            className="rounded border px-3 py-2 text-sm"
          />
          <input
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
            className="rounded border px-3 py-2 text-sm"
          />
          <input
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            required
            className="rounded border px-3 py-2 text-sm"
          />
          <input
            type="date"
            value={form.publishedAt}
            onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
            className="rounded border px-3 py-2 text-sm"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
            />
            Featured on homepage
          </label>
        </div>
        <input
          placeholder="Excerpt"
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          required
          className="w-full rounded border px-3 py-2 text-sm"
        />
        <textarea
          placeholder="Content (paragraphs separated by blank lines)"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
          rows={6}
          className="w-full rounded border px-3 py-2 text-sm"
        />
        <div className="flex gap-2">
          <button type="submit" className="btn-primary text-sm">
            {editing ? "Update" : "Create"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => {
                setForm(empty);
                setEditing(false);
              }}
              className="rounded border px-4 py-2 text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-8">
        <CrudTable
          items={posts}
          columns={[
            { key: "title", label: "Title" },
            { key: "category", label: "Category" },
            {
              key: "featured",
              label: "Featured",
              render: (p) => (p.featured ? "Yes" : "No"),
            },
          ]}
          onEdit={startEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
