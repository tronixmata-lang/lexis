import Link from "next/link";
import { getBlogPosts, getCaseStudies, getInquiries, getTestimonials } from "@/lib/data";

export default async function AdminDashboard() {
  const [posts, testimonials, studies, inquiries] = await Promise.all([
    getBlogPosts(),
    getTestimonials(),
    getCaseStudies(),
    getInquiries(),
  ]);

  const unread = inquiries.filter((i) => !i.read).length;

  const stats = [
    { label: "Blog Posts", value: posts.length, href: "/admin/blog", color: "bg-primary" },
    { label: "Testimonials", value: testimonials.length, href: "/admin/testimonials", color: "bg-gold" },
    { label: "Case Studies", value: studies.length, href: "/admin/case-studies", color: "bg-navy" },
    { label: "Inquiries", value: inquiries.length, href: "/admin/inquiries", color: "bg-primary", badge: unread },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Dashboard</h1>
      <p className="mt-1 text-gray-600">Welcome to Lexis &amp; Legis admin panel</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
