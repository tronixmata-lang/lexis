"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const LINKS = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/studio", label: "Blog & SEO (Sanity)", icon: "✏️", external: false },
  { href: "/admin/inquiries", label: "Inquiries", icon: "📬" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-64 flex-col bg-navy text-white">
      <div className="border-b border-white/10 p-6">
        <Link href="/admin" className="font-serif text-xl font-bold text-gold">
          Lexis Admin
        </Link>
        <p className="mt-1 text-xs text-gray-400">Inquiries &amp; CMS access</p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                  pathname === link.href || pathname?.startsWith(`${link.href}/`)
                    ? "bg-primary text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 px-3 text-xs leading-relaxed text-gray-500">
          Manage blog posts, SEO settings, and contact page content in Sanity Studio.
        </p>
      </nav>
      <div className="border-t border-white/10 p-4">
        <Link href="/" className="mb-2 block text-sm text-gray-400 hover:text-gold">
          ← View Website
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="w-full rounded-md bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
