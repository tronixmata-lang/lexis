import type { BreadcrumbItem } from "@/components/Breadcrumbs";
import { SERVICE_PAGES } from "./services";
import type { BlogPost } from "./types";

export const HOME_CRUMB: BreadcrumbItem = { name: "Home", path: "/" };

export function homeTrail(): BreadcrumbItem[] {
  return [HOME_CRUMB, { name: "Index", path: "/" }];
}

export function aboutTrail(): BreadcrumbItem[] {
  return [HOME_CRUMB, { name: "About Us", path: "/about" }];
}

export function teamTrail(): BreadcrumbItem[] {
  return [...aboutTrail(), { name: "Our Legal Team", path: "/team" }];
}

export function practiceAreasTrail(): BreadcrumbItem[] {
  return [HOME_CRUMB, { name: "Practice Areas", path: "/practice-areas" }];
}

export function serviceTrail(slug: string, label?: string): BreadcrumbItem[] {
  const page = SERVICE_PAGES[slug];
  const name = label ?? page?.navLabel ?? page?.title ?? slug;
  return [...practiceAreasTrail(), { name, path: `/${slug}` }];
}

export function blogTrail(): BreadcrumbItem[] {
  return [HOME_CRUMB, { name: "News & Events", path: "/blog" }];
}

export function blogCategoryTrail(category: string): BreadcrumbItem[] {
  return [
    ...blogTrail(),
    { name: category, path: `/blog?category=${encodeURIComponent(category)}` },
  ];
}

export function blogPostTrail(post: Pick<BlogPost, "slug" | "title" | "category">): BreadcrumbItem[] {
  return [
    ...blogTrail(),
    { name: post.category, path: `/blog?category=${encodeURIComponent(post.category)}` },
    { name: post.title, path: `/blog/${post.slug}` },
  ];
}

export function caseStudiesTrail(): BreadcrumbItem[] {
  return [HOME_CRUMB, { name: "Case Studies", path: "/case-studies" }];
}

export function contactTrail(): BreadcrumbItem[] {
  return [HOME_CRUMB, { name: "Contact Us", path: "/contact" }];
}

export function consultationTrail(): BreadcrumbItem[] {
  return [HOME_CRUMB, { name: "Book Consultation", path: "/consultation" }];
}

export function courtFeeCalculatorTrail(): BreadcrumbItem[] {
  return [
    HOME_CRUMB,
    { name: "Legal Resources", path: "/blog" },
    { name: "Court Fee Calculator", path: "/court-fee-calculator" },
  ];
}

/** Resolve breadcrumbs from URL pathname (fallback for client-side bar). */
export function trailFromPathname(pathname: string): BreadcrumbItem[] {
  if (!pathname || pathname === "/") return homeTrail();

  const staticMap: Record<string, BreadcrumbItem[]> = {
    "/about": aboutTrail(),
    "/team": teamTrail(),
    "/practice-areas": practiceAreasTrail(),
    "/blog": blogTrail(),
    "/case-studies": caseStudiesTrail(),
    "/contact": contactTrail(),
    "/consultation": consultationTrail(),
    "/court-fee-calculator": courtFeeCalculatorTrail(),
  };

  if (staticMap[pathname]) return staticMap[pathname];

  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "");
    const title = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return [...blogTrail(), { name: title, path: pathname }];
  }

  const slug = pathname.replace(/^\//, "");
  if (SERVICE_PAGES[slug]) {
    return serviceTrail(slug);
  }

  const segment = pathname.split("/").filter(Boolean).pop() ?? "";
  const label = segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return [HOME_CRUMB, { name: label, path: pathname }];
}
