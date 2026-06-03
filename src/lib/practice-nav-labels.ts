/** Exact labels from lexislegis.com Practice Areas menu */
export const PRACTICE_NAV_LABELS: Record<string, string> = {
  "civil-and-criminal-litigation": "Civil And Criminal Litigation",
  "labour-and-employment-law": "Labour And Employment Law",
  "foreign-investment": "Foreign Investment",
  "commercial-contracts": "Commercial Contracts",
  "public-procurement-and-arbitration": "Public Procurement And Arbitration",
  "banking-insurance-and-financial-law": "Banking, Insurance And Financial Law",
  "aviation-law": "Aviation Law",
  "capital-markets-and-securities-law": "Capital Markets And Securities Law",
  "cyber-law": "Cyber Law",
  "immigration-law": "Immigration Law",
  "energy-and-infrastructure-law": "Energy And Infrastructure Law",
  "construction-and-project-finance": "Construction And Project Finance",
  "intellectual-property-law": "Intellectual Property Law",
  "tax-law": "Tax Law",
  "company-law": "Company Law",
  "legal-due-diligence": "Legal Due Diligence",
  "sports-law": "Sports Law",
  "property-law": "Property Law",
};

/** First 14 items (column 1 on live site menu) */
export const PRACTICE_AREAS_COLUMN_1 = [
  "civil-and-criminal-litigation",
  "labour-and-employment-law",
  "foreign-investment",
  "commercial-contracts",
  "public-procurement-and-arbitration",
  "banking-insurance-and-financial-law",
  "aviation-law",
  "capital-markets-and-securities-law",
  "cyber-law",
  "immigration-law",
  "energy-and-infrastructure-law",
  "construction-and-project-finance",
  "intellectual-property-law",
  "tax-law",
] as const;

/** Remaining 4 items (column 2 on live site menu) */
export const PRACTICE_AREAS_COLUMN_2 = [
  "company-law",
  "legal-due-diligence",
  "sports-law",
  "property-law",
] as const;
