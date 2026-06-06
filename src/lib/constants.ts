/** Official contact details, lexislegis.com */
export const CONTACT = {
  address: "Anamnagar Kathmandu, Nepal",
  email: "info@lexislegis.com",
  phones: [
    { display: "+977 15922904", tel: "+97715922904" },
    { display: "9856044154", tel: "+9779856044154" },
  ],
  hours: "09:00 AM to 07:00 PM",
  days: "Sunday - Friday",
  /** Anamnagar, Kathmandu — used for local SEO schema */
  geo: {
    latitude: 27.69784,
    longitude: 85.32856,
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Anamnagar+Kathmandu+Nepal",
  googleReviewsUrl:
    "https://www.google.com/maps/place/Lexis+%26+Legis+Law+Associates/@27.69784,85.3259851,17z/data=!4m8!3m7!1s0x39eb19bd8c5408bb:0xf47573840eb4b843!8m2!3d27.69784!4d85.32856!9m1!1b1!16s%2Fg%2F11t_sy0fkw",
} as const;

export const BRAND = {
  name: "Lexis and Legis Law Associates",
  legalName: "Lexis and Legis Law Associates Pvt. Ltd.",
  tagline: "A Leading Law Firm Based in Kathmandu, Nepal",
  email: CONTACT.email,
  address: CONTACT.address,
  phones: CONTACT.phones,
  /** Primary line for display in single-line contexts */
  phone: `${CONTACT.phones[0].display} · ${CONTACT.phones[1].display}`,
  /** Mobile, quick-call CTA */
  phoneDisplay: CONTACT.phones[1].display,
  hours: CONTACT.hours,
  days: CONTACT.days,
  website: "https://lexislegis.com",
  social: {
    whatsapp: "https://wa.me/9779856044154",
  },
} as const;

export { PRACTICE_AREAS, PRACTICE_AREAS_INTRO } from "./services";

export const FIRM_MOTO = [
  "Client Oriented",
  "Professional and Efficient Service Delivery",
  "Confidentiality",
] as const;

export const COLORS = {
  primary: "#0F4FA8",
  navy: "#0A1F44",
  gold: "#C9A227",
  white: "#FFFFFF",
  lightGray: "#F5F7FA",
  darkText: "#1A1A1A",
} as const;

export const TRUST_STATS = [
  { value: "9 to 7", label: "Open Sun to Fri (Office Hours)" },
  { value: "Global", label: "International Clients" },
  { value: "Anamnagar", label: "Kathmandu Office" },
  { value: "18+", label: "Practice Areas" },
] as const;

export const WHY_CHOOSE = [
  {
    title: "Easy Access",
    description: "Welcoming and experienced team available to assist you, including urgent legal matters.",
  },
  {
    title: "Accountable to Clients",
    description:
      "Every stage and scope of work is well-defined and communicated to clients in advance.",
  },
  {
    title: "Partners With Extensive Experience",
    description:
      "Professionally managed by attorneys providing global legal services across jurisdictions.",
  },
  {
    title: "Quick Turnaround Time",
    description:
      "Incredibly reliable, quality and prompt services, timely advice saves time, effort and cost.",
  },
  {
    title: "Effective Communications",
    description: "We communicate with clients very well at every stage of engagement.",
  },
  {
    title: "Wide Spectrum of Clients",
    description:
      "International clients in the US, Canada, Australia, India, England, Europe, and beyond.",
  },
] as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/about", label: "About" },
  { href: "/team", label: "Teams" },
  { href: "/blog", label: "News & Events" },
  { href: "/court-fee-calculator", label: "Court Fee" },
  { href: "/contact", label: "Contact" },
] as const;

export const TEAM_MEMBERS = [
  {
    name: "Gobinda Prasad Sigdel",
    role: "Founding & Senior Partner",
    specialty: "Corporate Litigation & Arbitration",
    bio: "Founding partner with extensive experience in corporate litigation, commercial arbitration, and complex disputes before Nepalese courts and tribunals.",
  },
  {
    name: "Bichar Sigdel",
    role: "Founding & Managing Partner",
    specialty: "Corporate & Commercial Law",
    bio: "Managing partner overseeing firm operations and leading corporate, commercial, and cross-border legal matters for domestic and international clients.",
  },
  {
    name: "Kiran Gurung",
    role: "Associate",
    specialty: "Litigation & Advisory",
    bio: "Associate attorney supporting litigation, document drafting, and client advisory across civil and commercial practice areas.",
  },
  {
    name: "Gita",
    role: "Associate",
    specialty: "Legal Research & Support",
    bio: "Associate contributing to legal research, case preparation, and client support across the firm's practice areas.",
  },
] as const;

export const LEGAL_DISCLAIMER =
  "The articles and content provided on this website are intended for academic and educational purposes only. They are not intended to serve as legal advice or a substitute for professional consultation with qualified legal counsel. Laws and regulations are subject to change. Readers should not act based on any content found on this site without first seeking appropriate legal advice from a licensed attorney. Use of this website does not create an attorney-client relationship.";
