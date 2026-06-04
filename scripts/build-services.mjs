import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const FAQ =
  "Lexis and Legis is a leading law firm in Nepal, offering professional legal services in commercial and civil law. Our team of skilled attorneys specializes in family law, foreign investment, and corporate law, providing services such as legal consultations, document drafting, and court representation.";

const labels = {
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

function page(slug, data) {
  return { navLabel: labels[slug], faq: FAQ, ...data };
}

const pages = {
  "civil-and-criminal-litigation": page("civil-and-criminal-litigation", {
    title: "Civil and Criminal Litigation",
    subtitle: "Full-spectrum litigation before district courts, high courts, the Supreme Court and tribunals",
    description:
      "Our firm delivers full-spectrum litigation services, strategic planning, drafting legal documents, client advocacy, and courtroom litigation across various practice areas in both civil and criminal litigation ensuring your rights and interests are protected at every stage of the legal process. We have a litigation team with wealth of experience, deep legal knowledge, and provide service with a results-driven approach to every case we handle. Our lawyers are prepared to guide you through every stage of litigation. We represent in a broad area of civil and criminal cases before district courts, high courts, the Supreme Court and other tribunals.",
    body: [
      "Civil litigation involves legal disputes between individuals, businesses, or organizations, typically seeking monetary compensation or specific performance.",
      "Criminal litigation involves the defense of individuals or entities charged with crimes. Our criminal defense team provides strategic representation in cases ranging from minor offenses to serious felonies.",
    ],
    subsections: [
      {
        title: "Civil Litigation",
        items: [
          "Contract disputes",
          "Property and land conflicts",
          "Family law matters",
          "Employment disputes",
          "Tort claims (e.g., negligence, defamation)",
        ],
      },
      {
        title: "Criminal Litigation",
        items: [
          "Sexual offences, offences related to body (homicide, attempt to murder, etc.)",
          "Hurt and Grievous Hurt",
          "Drug-related offenses",
          "Cybercrime and regulatory breaches",
        ],
      },
    ],
    services: [
      "District court representation",
      "High Court and Supreme Court appeals",
      "Document drafting and legal strategy",
      "Civil and criminal defense",
      "Settlement negotiation",
    ],
  }),
  "labour-and-employment-law": page("labour-and-employment-law", {
    title: "Labour and Employment Law",
    subtitle: "Practical solutions for employers and employees under Nepalese law",
    description:
      "We provide specialized legal services in Labour and Employment Law, offering practical and strategic solutions for both employers and employees in compliance with Nepalese legal standards seeking compliance guidance or facing workplace disputes. With in-depth knowledge of Nepal's evolving labor framework, we assist clients on a broad range of labour and employment matters and legal obligations.",
    body: [
      "Our legal team advises and represents clients on employment contracts and workplace policies, disciplinary actions and employee termination, labour disputes and collective bargaining, workplace discrimination and harassment claims, wages, benefits, and occupational safety, and labour compliance under Nepalese law.",
      "Our practice is guided by the Labour Act, 2074 (2017), Labour Rules, 2075 (2018), and the Social Security Act, 2075 (2018), which establishes provisions for employees' welfare, including contributions to the Social Security Fund.",
    ],
    services: [
      "Employment contracts and workplace policies",
      "Disciplinary actions and employee termination",
      "Labour disputes and collective bargaining",
      "Workplace discrimination and harassment claims",
      "Wages, benefits, and occupational safety",
      "Labour compliance under Nepalese law",
    ],
  }),
  "foreign-investment": page("foreign-investment", {
    title: "Foreign Investment",
    subtitle: "FITTA advisory, market entry, and repatriation for international investors",
    description:
      "Nepal, a developing nation situated between two of the world's largest economies, China and India, has long sought to attract foreign direct investment (FDI) for economic growth and achieve its development goals. While the country possesses significant potential in sectors like hydropower, tourism, information technology and manufacturing, the primary legislation governing foreign investment in Nepal is the Foreign Investment and Technology Transfer Act (FITTA), 2019, along with the Public-Private Partnership and Investment Act, 2019.",
    body: [
      "We assist foreign clients through every stage of the investment lifecycle: market entry and entity setup (company registration, joint ventures, branch/subsidiary formation); regulatory compliance (FITTA approvals, NRB registration, repatriation structuring); project development and legal due diligence; contract drafting and negotiation (shareholder agreements, BOOT frameworks, tech transfer contracts); employment, tax, and immigration guidance; and dispute prevention and resolution.",
      "Foreign investment is approved through the Department of Industry (DOI) for investments up to NPR 6 billion, and the Investment Board Nepal (IBN) for investments above NPR 6 billion. FITTA's single-window mechanism is designed to provide a single point for investors to obtain all necessary approvals.",
      "FITTA allows repatriation of profits, dividends, earnings, amounts from sale of shares or assets, principal and interest on foreign loans, and royalties, with Nepal Rastra Bank approval after taxes and legal obligations are settled. FITTA also provides visa facilities for foreign investors, authorized representatives, and family members.",
    ],
    services: [
      "Market entry and entity setup",
      "FITTA and IBN approvals",
      "NRB registration and repatriation",
      "Joint ventures and technology transfer",
      "Shareholder and BOOT agreements",
      "Investor visa advisory",
    ],
  }),
  "commercial-contracts": page("commercial-contracts", {
    title: "Commercial Contracts",
    subtitle: "Legally enforceable frameworks for business relationships",
    description:
      "Commercial contracts are foundational instruments in the business world, providing a structured and legally enforceable framework for interactions between entities. They are not merely bureaucratic necessities but strategic tools that underpin operational stability and facilitate economic activity.",
    body: [
      "Key components typically found within a commercial contract include the precise identification of all parties involved, detailed transaction specifics (such as the goods or services exchanged, pricing, and payment terms), the effective date of the agreement, and clear provisions for termination.",
      "Crucial clauses often incorporated are confidentiality clauses and indemnity clauses (indemnification clauses), which represent a promise by one party to protect the other from liabilities stemming from negligent actions, breaches of contract, or third-party actions.",
      "Commercial contracts spell out exactly what each party is expected to do, what rights they have, and what their responsibilities are. Different types include sales contracts, employment contracts, service agreements, partnership agreements, non-disclosure agreements, distribution agreements, shareholders agreements and many more.",
      "Law governing contracts in Nepal includes the Muluki Civil Code, 2074; Companies Act, 2063; Industrial Enterprises Act, 2076; Foreign Investment and Technology Transfer Act (FITTA) 2075 (2019); and Labour Act 2074 (2017).",
    ],
    services: [
      "Sales and service agreements",
      "Partnership and shareholders agreements",
      "Non-disclosure agreements (NDAs)",
      "Distribution and supply contracts",
      "Indemnity and confidentiality clauses",
      "Contract review and negotiation",
    ],
  }),
  "public-procurement-and-arbitration": page("public-procurement-and-arbitration", {
    title: "Public Procurement and Arbitration",
    subtitle: "Procurement compliance and arbitration in Nepal",
    description:
      "Public Procurement and Arbitration, two vital areas of law in Nepal's evolving commercial and infrastructure development landscape. Nepal is governed primarily by the Public Procurement Act, 2063 (2007) and the Public Procurement Regulations, 2064 (2008), providing a legal framework for transparent, competitive, and accountable procurement processes in the public sector.",
    body: [
      "We assist clients in navigating procurement procedures, preparing compliant bids, responding to disqualification or rejection notices, and handling review or complaint proceedings before the Public Procurement Monitoring Office (PPMO) and other regulatory bodies. We advise both national and international clients, contractors, suppliers, consultants, and government agencies.",
      "Arbitration has become a preferred method of dispute resolution in public contracts and private commercial matters in Nepal, governed by the Arbitration Act, 2055 (1999). Our team has substantial experience representing clients in arbitral proceedings related to infrastructure projects, public-private partnerships (PPPs), construction contracts, and procurement disputes.",
      "We assist international contractors, suppliers, and consultants in participating in government tenders and PPPs, ensuring bid compliance and eligibility, addressing disqualifications and blacklisting, filing PPMO complaints, and drafting procurement and implementation contracts.",
    ],
    services: [
      "Government tenders and PPP participation",
      "Bid compliance and eligibility",
      "PPMO complaints and bid rejections",
      "Procurement contract drafting",
      "Domestic and international arbitration",
      "Infrastructure and construction disputes",
    ],
  }),
  "banking-insurance-and-financial-law": page("banking-insurance-and-financial-law", {
    title: "Banking, Insurance and Financial Law",
    subtitle: "Regulatory compliance for banks, insurers, and financial institutions",
    description:
      "Nepal's banking and financial system is primarily regulated by the Nepal Rastra Bank Act, 2058 (2002), the Bank and Financial Institutions Act (BAFIA), 2073 (2017), and sector-specific directives issued by the Nepal Rastra Bank (NRB). The insurance sector is regulated under the Insurance Act, 2079 (2022) and overseen by the Insurance Authority of Nepal (Beema Samiti).",
    body: [
      "We also assist international lenders, multilateral agencies, and investors in understanding Nepal's monetary policy, foreign exchange control regulations, and financial governance regime.",
      "With a solid grasp of both local legal requirements and international financial practices, our firm ensures that clients operate confidently and compliantly in Nepal's evolving financial services market.",
    ],
    services: [
      "Regulatory compliance and licensing for banks and financial institutions",
      "Legal due diligence and cross-border investment structuring",
      "Loan documentation, syndicated lending, and project financing",
      "Digital banking, fintech, and payment systems advisory",
      "Insurance policy drafting, regulatory filings, and claims disputes",
      "Regulatory investigations and financial disputes",
    ],
  }),
  "aviation-law": page("aviation-law", {
    title: "Aviation Law",
    subtitle: "Regulatory and commercial aviation legal services in Nepal",
    description:
      "We provide focused legal counsel in Aviation Law, assisting domestic and international clients in navigating Nepal's unique regulatory, commercial, and operational aviation landscape.",
    body: [
      "Nepal's aviation sector is governed by a combination of domestic legislation, primarily the Civil Aviation Act, 2015 (1959), the Civil Aviation Regulation, 2058 (2002), and directives issued by the Civil Aviation Authority of Nepal (CAAN), alongside international conventions such as the Chicago Convention and ICAO standards, to which Nepal is a signatory.",
      "Given Nepal's complex airspace and geographical terrain, aviation operations here require careful legal and risk management planning. We support airlines, helicopter service providers, lessors, insurers, investors, and regulatory authorities in navigating these challenges with precision and legal clarity.",
    ],
    services: [
      "Aircraft registration, leasing, and financing",
      "Air operator certificate (AOC) licensing and regulatory compliance",
      "Advisory on bilateral air service agreements (BASAs)",
      "Ground handling, maintenance, and service agreements",
      "Aviation insurance, liability, and passenger claims",
      "Representation before CAAN and other regulatory bodies",
    ],
  }),
  "capital-markets-and-securities-law": page("capital-markets-and-securities-law", {
    title: "Capital Markets and Securities Law",
    subtitle: "SEBON compliance, IPOs, and securities transactions",
    description:
      "Nepal's capital markets are regulated under the Securities Act, 2063 (2007) and overseen by the Securities Board of Nepal (SEBON). The sector is witnessing gradual liberalization, with growing participation from domestic and foreign investors, publicly listed companies, and market intermediaries.",
    body: [
      "We also assist foreign investors in understanding the legal framework for investing in Nepal's listed equities, bonds, and funds, in alignment with foreign investment laws and foreign exchange regulations of Nepal Rastra Bank.",
    ],
    services: [
      "Public offerings (IPOs, FPOs) and private placements",
      "Securities issuance, listing, and NEPSE compliance",
      "Corporate governance and disclosure requirements",
      "Regulatory licensing for capital market intermediaries",
      "Mergers, acquisitions, and takeovers of listed companies",
      "Mutual funds, debentures, and alternative instruments",
      "Securities disputes, enforcement actions, and investigations",
    ],
  }),
  "cyber-law": page("cyber-law", {
    title: "Cyber Law",
    subtitle: "IT law, e-commerce, data privacy, and cybercrime defense",
    description:
      "We offer strategic legal advisory in Information Technology Law, helping businesses, startups, digital platforms, and international tech companies navigate Nepal's growing digital legal ecosystem.",
    body: [
      "Nepal's IT sector is regulated by the Electronic Transactions Act, 2063 (2008) (ETA), the Electronic Transactions Rules, and related policies such as the Digital Nepal Framework. These laws govern electronic transactions, data protection, cybersecurity, online content, and digital signatures.",
      "We also assist foreign tech companies looking to operate in or offer services to Nepal, ensuring compliance with local IT and cross-border data regulations. Whether you are launching a digital platform, managing user data, entering a tech joint venture, or responding to a cyber incident, we deliver proactive legal support.",
    ],
    services: [
      "E-commerce and online platform regulation",
      "Drafting and reviewing software licenses, SaaS, and tech service agreements",
      "Compliance with data privacy, cybersecurity, and digital communication laws",
      "Electronic contracts, digital signatures, and online authentication",
      "Legal risk management for fintech, health tech, edtech, and digital startups",
      "Cybercrimes, content regulation, and intermediary liability",
      "Online fraud, defamation, and data breach disputes",
    ],
  }),
  "immigration-law": page("immigration-law", {
    title: "Immigration Law",
    subtitle: "Visas, work permits, and residency in Nepal",
    description:
      "We offer reliable and efficient legal services in Immigration Law, assisting foreign nationals, multinational companies, NGOs, and diplomatic missions with all aspects of immigration compliance and residency in Nepal.",
    body: [
      "Immigration matters in Nepal are governed by the Immigration Act, 2049 (1992) and the Immigration Rules, 2051 (1994), administered by the Department of Immigration under the Ministry of Home Affairs. These laws regulate the entry, stay, visa categories, and exit procedures for foreigners, as well as residency and work authorizations.",
      "Our firm is also well-versed in immigration matters for INGOs, diplomatic agencies, international consultants, and project-based foreign workers. We work closely with relevant government agencies to ensure timely processing and compliance with all regulatory requirements.",
    ],
    services: [
      "Visa applications and renewals (tourist, business, working, non-tourist, residential, diplomatic)",
      "Work permits and labor approvals for foreign employees and executives",
      "Business, investment, and startup visa advisory",
      "Residency permits and long-term stay planning",
      "Visa compliance and overstay resolution",
      "Deportation matters and blacklisting appeals",
      "Expatriates, dependents, and family members",
    ],
  }),
  "energy-and-infrastructure-law": page("energy-and-infrastructure-law", {
    title: "Energy and Infrastructure Law",
    subtitle: "Hydropower, PPPs, and infrastructure project development",
    description:
      "With abundant hydropower potential and increasing investment in transport, urban development, and renewable energy, Nepal's infrastructure sector is rapidly expanding. However, these projects require close adherence to sector-specific regulations, multi-agency approvals, and carefully structured public-private partnerships (PPPs).",
    body: [
      "Our firm regularly assists with legal compliance under the Electricity Act, 2049 (1992), Water Resources Act, Investment Board Act, and other relevant infrastructure laws and guidelines issued by the Department of Electricity Development (DOED), Nepal Electricity Authority (NEA), and Investment Board Nepal (IBN).",
    ],
    services: [
      "Hydropower and renewable energy project development",
      "Project structuring, licensing, and government approvals",
      "Power purchase agreements (PPAs) and grid connection matters",
      "Land acquisition, right of way, and environmental compliance",
      "Infrastructure concessions, PPPs, and BOOT/BOO models",
      "Cross-border transmission and export-import arrangements",
      "EPC and O&M contracts",
      "Project finance, loan documentation, and multilateral funding compliance",
      "Dispute resolution in energy and construction contracts",
    ],
  }),
  "construction-and-project-finance": page("construction-and-project-finance", {
    title: "Construction and Project Finance",
    subtitle: "EPC contracts, project finance, and infrastructure disputes",
    description:
      "With increasing public and private investment in sectors such as transportation, energy, real estate, and industrial infrastructure, Nepal's construction and project finance landscape is both promising and complex. Our firm provides the legal insight and practical experience needed to navigate project risks, regulatory compliance, and financing structures.",
    body: [
      "We work with local and international stakeholders across various sectors, hydropower, highways, airports, urban infrastructure, housing, and industrial parks, ensuring every project meets both Nepalese legal requirements and global financing standards.",
    ],
    subsections: [
      {
        title: "Construction Law",
        items: [
          "Drafting and negotiation of EPC, design-build, turnkey, and FIDIC-based contracts",
          "Construction permits, licensing, and environmental clearances",
          "Land acquisition, zoning, and right-of-way matters",
          "Contractor-subcontractor agreements and dispute management",
          "Claims, variations, delay, and termination handling",
          "Dispute resolution through arbitration, adjudication, or courts",
        ],
      },
      {
        title: "Project Finance",
        items: [
          "Structuring of project finance models (PPP, BOOT, BOT, BOO)",
          "Loan agreements, security instruments, and collateral arrangements",
          "Legal due diligence and risk allocation in project documentation",
          "Negotiation with government agencies, multilateral lenders, and ECAs",
          "FDI approvals and foreign exchange regulations",
          "Financial close and ongoing regulatory compliance",
        ],
      },
    ],
    services: [
      "EPC and FIDIC contract drafting",
      "PPP, BOOT, BOT structuring",
      "Project finance documentation",
      "Construction dispute resolution",
    ],
  }),
  "intellectual-property-law": page("intellectual-property-law", {
    title: "Intellectual Property Law",
    subtitle: "Patents, trademarks, copyright, and IP enforcement",
    description:
      "We understand that intellectual property (IP) is a critical asset for businesses, innovators, and creators operating in today's global economy. Our dedicated Intellectual Property practice offers comprehensive legal services grounded in Nepalese law and international practice, designed to safeguard your inventions, brands, artistic works, and proprietary technologies both within Nepal and internationally.",
    body: [
      "Nepal's IP framework is primarily governed by the Patents, Designs and Trademarks Act, 1965, Copyright Act, 2002, and Geographical Indications Act, 2007, alongside relevant international treaties to which Nepal is a party.",
    ],
    services: [
      "Patent registration and protection",
      "Trademark searches, registration, renewal, and enforcement",
      "Copyright and related rights, including licensing and infringement remedies",
      "Trade secrets and confidentiality agreements",
      "Geographical indications applications and enforcement",
      "IP litigation and dispute resolution before courts and arbitration forums",
    ],
  }),
  "tax-law": page("tax-law", {
    title: "Tax Law",
    subtitle: "Tax planning, VAT, customs, and dispute resolution",
    description:
      "Nepal's tax system is governed primarily by the Income Tax Act, 2002, the Value Added Tax Act, 1996, the Excise Duty Act, 2002, and other related legislation, administered by the Inland Revenue Department (IRD). Our tax law practice covers a broad spectrum of services.",
    body: [],
    services: [
      "Corporate and Individual Taxation: income tax, deductions, residency, withholding",
      "International Taxation and DTAA: cross-border transactions, transfer pricing, permanent establishment",
      "Value Added Tax (VAT): registration, compliance, refunds, audits and disputes",
      "Customs and Excise Duties: imports, exports, tariff classification, exemptions",
      "Tax Due Diligence and Structuring: M&A, restructuring, risk assessment",
      "Tax Litigation and Dispute Resolution: assessments, reassessments, appeals",
    ],
  }),
  "company-law": page("company-law", {
    title: "Company Law",
    subtitle: "Incorporation, governance, and corporate transactions",
    description:
      "Whether you are an entrepreneur launching a startup, a foreign investor establishing operations, or a corporate group navigating regulatory compliance, our team provides strategic legal counsel grounded in the Companies Act, 2006 and other relevant business laws of Nepal. Nepal's corporate legal framework continues to evolve to promote investment, corporate governance, and ease of doing business.",
    body: [],
    services: [
      "Company Formation and Structuring: private limited, public limited, joint venture, branch/liaison office",
      "Corporate Governance and Compliance: board procedures, shareholder rights, annual filings",
      "Foreign Investment and Repatriation: DOI and NRB approvals, FDI structuring, profit repatriation",
      "Mergers, Acquisitions, and Restructuring: reorganizations, share transfers, due diligence",
      "Joint Ventures and Shareholders' Agreements",
      "Company Secretarial Services: meetings, statutory compliance, regulatory filings",
      "Corporate Disputes and Litigation: shareholder disputes, winding-up, liquidation",
    ],
  }),
  "legal-due-diligence": page("legal-due-diligence", {
    title: "Legal Due Diligence",
    subtitle: "Transaction support, risk assessment, and compliance reviews",
    description:
      "We provide comprehensive legal due diligence for mergers, acquisitions, investments, and corporate transactions, identifying legal risks, regulatory compliance gaps, and contractual liabilities before you commit to a deal.",
    body: [
      "Our due diligence covers corporate records and governance, material contracts, pending and threatened litigation, intellectual property, employment and labour matters, regulatory licenses and permits, tax compliance, environmental obligations, and real property, delivered in clear reports for boards and investors.",
      "We coordinate with financial, tax, and technical advisors to support domestic and cross-border transactions, ensuring holistic readiness for financial close and post-closing integration.",
    ],
    services: [
      "M&A and investment due diligence",
      "Regulatory and license compliance reviews",
      "Contract portfolio and litigation audits",
      "IP, employment, and property assessments",
      "Risk memoranda for investors and lenders",
      "Transaction structuring and closing support",
    ],
  }),
  "sports-law": page("sports-law", {
    title: "Sports Law",
    subtitle: "Athlete contracts, governance, anti-doping, and sports disputes",
    description:
      "As Nepal's sports sector continues to expand on both national and international platforms, our firm provides the legal foundation necessary to protect the rights, integrity, and commercial interests of all stakeholders involved.",
    body: [
      "Sports law in Nepal is governed by a combination of statutes, policies, and regulatory bodies, including the National Sports Development Act, 2020 (BS 2077), the National Sports Council, and relevant international treaties and standards (such as those by the IOC, FIFA, WADA).",
    ],
    services: [
      "Athlete Contracts and Endorsements: contracts for athletes, coaches, agents, endorsement and image rights",
      "Governance and Regulation: federations, clubs, compliance, elections, disciplinary codes",
      "Sports Dispute Resolution: National Sports Council tribunals and Court of Arbitration for Sport (CAS)",
      "Anti-Doping Compliance: WADA code compliance and doping-related hearings",
      "Intellectual Property and Broadcasting Rights: sponsorship, licensing, media agreements",
      "Sports Event Management and Liability: hosting, waivers, risk management, vendor contracts",
      "Emerging Sectors: esports, adventure sports, community-based sports initiatives",
    ],
  }),
  "property-law": page("property-law", {
    title: "Property Law",
    subtitle: "Real estate transactions, title verification, and land disputes",
    description:
      "In dealing with real estate transactions, land disputes, inheritance, or foreign investment in property, our team provides practical, timely, and legally sound solutions based on the latest developments in Nepalese law.",
    body: [
      "Property law in Nepal is governed by the National Civil (Code) Act, 2017, the Land Act, 1964, the Land Revenue Act, 1978, and relevant directives issued by the Ministry of Land Management, Cooperatives and Poverty Alleviation.",
      "With deep experience in Nepal's complex land administration and ownership framework, we are well-equipped to guide both domestic clients and international investors through regulatory processes, documentation requirements, and risk management strategies. We coordinate with survey offices, notaries, local bodies, and land revenue offices to ensure smooth transactions and legal certainty.",
    ],
    services: [
      "Title Search and Due Diligence",
      "Property Transfer and Registration",
      "Joint Ownership and Partition",
      "Land Use and Development",
      "Foreign Investment in Property (including NRN limits)",
      "Tenancy and Leasing",
      "Property Inheritance and Succession",
      "Property Disputes and Litigation",
    ],
  }),
};

const header = `import { AREA_ICONS, PRACTICE_AREA_ORDER, PRACTICE_AREAS_INTRO } from "./area-icons";

export type ServiceSubsection = { title: string; items: string[] };

export type ServicePage = {
  navLabel: string;
  title: string;
  subtitle: string;
  description: string;
  services: string[];
  body?: string[];
  subsections?: ServiceSubsection[];
  faq?: string;
};

export { PRACTICE_AREAS_INTRO };

export const SERVICE_PAGES: Record<string, ServicePage> = `;

const footer = `;

export const PRACTICE_AREAS = PRACTICE_AREA_ORDER.map((slug) => ({
  slug,
  title: SERVICE_PAGES[slug].title,
  navLabel: SERVICE_PAGES[slug].navLabel,
  description: SERVICE_PAGES[slug].subtitle,
  icon: AREA_ICONS[slug] ?? "document",
}));
`;

writeFileSync(join(root, "src/lib/services.ts"), header + JSON.stringify(pages, null, 2) + footer);
console.log("Built", Object.keys(pages).length, "practice areas with full content");
