export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  image?: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  featured?: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  summary: string;
  outcome: string;
  image?: string;
  featured?: boolean;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  legalMatter: string;
  message?: string;
  source: string;
  createdAt: string;
  read: boolean;
}
