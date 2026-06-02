export const BRAND = {
  name: "Lexis & Legis",
  tagline: "Legal Excellence",
  email: "info@lexislegis.com",
  phone: "+977 1-4XXXXXX",
  address: "Kathmandu, Nepal",
} as const;

export const COLORS = {
  primary: "#0F4FA8",
  navy: "#0A1F44",
  gold: "#C9A227",
  white: "#FFFFFF",
  lightGray: "#F5F7FA",
  darkText: "#1A1A1A",
} as const;

export const TRUST_STATS = [
  { value: "500+", label: "Cases Handled" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15+", label: "Years Experience" },
  { value: "50+", label: "Corporate Clients" },
] as const;

export const PRACTICE_AREAS = [
  {
    slug: "corporate-law",
    title: "Corporate Law",
    description:
      "Company formation, governance, mergers, and regulatory compliance for businesses of all sizes.",
    icon: "building",
  },
  {
    slug: "litigation",
    title: "Litigation",
    description:
      "Civil and commercial dispute resolution with strategic courtroom advocacy.",
    icon: "scale",
  },
  {
    slug: "intellectual-property",
    title: "Intellectual Property",
    description:
      "Trademark, copyright, and patent protection for innovators and brands.",
    icon: "lightbulb",
  },
  {
    slug: "contract-drafting",
    title: "Contract Drafting",
    description:
      "Precise, enforceable agreements tailored to your business relationships.",
    icon: "document",
  },
  {
    slug: "startup-advisory",
    title: "Startup Advisory",
    description:
      "Legal guidance for founders—from incorporation to investment rounds.",
    icon: "rocket",
  },
  {
    slug: "arbitration",
    title: "Arbitration & Dispute Resolution",
    description:
      "Efficient alternative dispute resolution outside traditional courts.",
    icon: "handshake",
  },
  {
    slug: "tax-compliance",
    title: "Tax & Compliance",
    description:
      "Tax planning, filings, and regulatory compliance for Nepalese businesses.",
    icon: "calculator",
  },
  {
    slug: "real-estate",
    title: "Real Estate Law",
    description:
      "Property transactions, due diligence, and land dispute resolution.",
    icon: "home",
  },
] as const;

export const WHY_CHOOSE = [
  {
    title: "Expertise",
    description:
      "Deep understanding of complex legal matters across corporate, litigation, and regulatory domains.",
  },
  {
    title: "Transparency",
    description:
      "Clear communication and upfront fee structures so you always know what to expect.",
  },
  {
    title: "Client-Centric Approach",
    description:
      "Solutions tailored to every client's unique situation, goals, and industry.",
  },
  {
    title: "Results-Oriented",
    description:
      "Focused on achieving favorable outcomes efficiently and cost-effectively.",
  },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Team" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const TEAM_MEMBERS = [
  {
    name: "Adv. Rajesh Sharma",
    role: "Managing Partner",
    specialty: "Corporate Law & Litigation",
    bio: "Over 15 years of experience advising multinational corporations and startups on complex legal matters in Nepal.",
  },
  {
    name: "Adv. Priya Thapa",
    role: "Senior Partner",
    specialty: "Intellectual Property",
    bio: "Leading IP attorney with expertise in trademark registration and IP enforcement across South Asia.",
  },
  {
    name: "Adv. Anil Karki",
    role: "Partner",
    specialty: "Tax & Compliance",
    bio: "Specializes in tax planning, regulatory compliance, and foreign investment law for growing businesses.",
  },
  {
    name: "Adv. Sunita Rai",
    role: "Associate",
    specialty: "Startup Advisory",
    bio: "Passionate about helping entrepreneurs navigate legal challenges from incorporation to scale.",
  },
] as const;
