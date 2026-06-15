import Link from "next/link";
import { getBlogPosts, getInquiries } from "@/lib/data";

export default async function AdminDashboard() {
  const [posts, inquiries] = await Promise.all([getBlogPosts(), getInquiries()]);
  const unread = inquiries.filter((i) => !i.read).length;

  const stats = [
    { label: "Blog Posts", value: posts.length, href: "/studio", color: "bg-primary" },
    { label: "Inquiries", value: inquiries.length, href: "/admin/inquiries", color: "bg-gold", badge: unread },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
      <p className="mt-1 text-gray-600">Manage content in Sanity Studio and view client inquiries.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="card-hover relative rounded-lg bg-white p-6 shadow-sm"
          >
            <div className={`mb-4 h-1 w-12 rounded ${stat.color}`} />
            <p className="text-3xl font-bold text-navy">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
            {stat.badge ? (
              <span className="absolute right-4 top-4 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
                {stat.badge} new
              </span>
            ) : null}
          </Link>
        ))}

        <Link
          href="/studio"
          className="card-hover rounded-lg border border-dashed border-primary/30 bg-primary/5 p-6 shadow-sm"
        >
          <div className="mb-4 h-1 w-12 rounded bg-primary" />
          <p className="text-lg font-bold text-navy">Sanity Studio</p>
          <p className="mt-2 text-sm text-gray-600">
            Edit blog posts, site SEO, and contact page content.
          </p>
        </Link>
      </div>

      <div className="mt-10 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-navy">Recent Inquiries</h2>
        {inquiries.length === 0 ? (
          <p className="mt-4 text-sm text-gray-500">No inquiries yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-gray-100">
            {inquiries.slice(0, 5).map((inq) => (
              <li key={inq.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium text-navy">{inq.name}</p>
                  <p className="text-sm text-gray-500">{inq.legalMatter}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs ${
                    inq.read ? "bg-gray-100 text-gray-600" : "bg-green-100 text-green-700"
                  }`}
                >
                  {inq.read ? "Read" : "New"}
                </span>
              </li>
            ))}
          </ul>
        )}
        <Link href="/admin/inquiries" className="mt-4 inline-block text-sm text-primary hover:underline">
          View all inquiries →
        </Link>
      </div>
    </div>
  );
}
