export const COURT_FEE_SLABS = [
  {
    label: "Up to Rs. 25,000",
    description: "Rs. 500 (fixed)",
    min: 0,
    max: 25_000,
    type: "flat" as const,
    fee: 500,
    rateLabel: "Fixed",
  },
  {
    label: "Rs. 25,001 to 50,000",
    description: "5% of amount in this slab",
    min: 25_001,
    max: 50_000,
    type: "rate" as const,
    rate: 0.05,
    rateLabel: "5%",
  },
  {
    label: "Rs. 50,001 to 1,00,000",
    description: "3.5% of amount in this slab",
    min: 50_001,
    max: 100_000,
    type: "rate" as const,
    rate: 0.035,
    rateLabel: "3.5%",
  },
  {
    label: "Rs. 1,00,001 to 5,00,000",
    description: "2% of amount in this slab",
    min: 100_001,
    max: 500_000,
    type: "rate" as const,
    rate: 0.02,
    rateLabel: "2%",
  },
  {
    label: "Rs. 5,00,001 to 25,00,000",
    description: "1.5% of amount in this slab",
    min: 500_001,
    max: 2_500_000,
    type: "rate" as const,
    rate: 0.015,
    rateLabel: "1.5%",
  },
  {
    label: "Above Rs. 25,00,000",
    description: "1% of amount in this slab",
    min: 2_500_001,
    max: Infinity,
    type: "rate" as const,
    rate: 0.01,
    rateLabel: "1%",
  },
] as const;

export const COURT_FEE_LEGAL_BASIS = {
  act: "National Civil Procedure (Code) Act, 2017",
  actNepali: "Muluki Civil Procedure Code, 2074",
  sections: [
    {
      number: "63",
      title: "Obligation to pay court fee",
      summary:
        "A plaintiff, appellant, or counter-claimant must pay court fee when filing a plaint, appeal, or counterclaim. The fee is determined by the value or amount claimed in the suit.",
    },
    {
      number: "69",
      title: "Basis for determining court fee",
      summary:
        "Court fee is calculated on a progressive slab basis. Each prescribed rate applies only to the portion of the claim amount falling within that specific range—not to the entire claim.",
    },
    {
      number: "70",
      title: "Cases with fixed court fee",
      summary:
        "Certain matters carry a fixed court fee regardless of the claimed amount. These include divorce, property partition without rights claims, guardianship, and eviction proceedings, among others.",
    },
  ],
} as const;

export const APPLICABLE_CASE_TYPES = [
  {
    title: "Civil & Commercial Claims",
    description:
      "Contract disputes, debt recovery, breach of agreement, business claims, and compensation for financial loss.",
  },
  {
    title: "Property & Real Estate",
    description:
      "Land disputes, title claims, partition (ansha), mortgage enforcement, and property valuation-based claims.",
  },
  {
    title: "Family & Personal Matters",
    description:
      "Alimony, maintenance, and financial claims arising from matrimonial or family disputes (subject to fixed-fee rules where applicable).",
  },
  {
    title: "Tort & Compensation",
    description:
      "Personal injury, medical negligence, defamation, and insurance-related compensation claims.",
  },
] as const;

export const FIXED_FEE_CASES = [
  "Divorce and judicial separation",
  "Property partition without rights claims",
  "Guardianship and custody matters",
  "Eviction and tenancy disputes",
  "Other matters prescribed under Section 70 of the Act",
] as const;

export type CourtFeeBreakdownRow = {
  label: string;
  slabAmount: number | null;
  rateLabel: string;
  fee: number;
};

export type CourtFeeResult = {
  claimAmount: number;
  totalFee: number;
  effectiveRate: number;
  breakdown: CourtFeeBreakdownRow[];
};

export function formatNpr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function calculateCourtFee(claimAmount: number): CourtFeeResult | null {
  if (!Number.isFinite(claimAmount) || claimAmount <= 0) {
    return null;
  }

  const breakdown: CourtFeeBreakdownRow[] = [];

  for (const slab of COURT_FEE_SLABS) {
    if (claimAmount < slab.min && slab.type === "rate") {
      continue;
    }

    if (slab.type === "flat") {
      breakdown.push({
        label: slab.label,
        slabAmount: Math.min(claimAmount, slab.max),
        rateLabel: slab.rateLabel,
        fee: slab.fee,
      });
      continue;
    }

    if (claimAmount <= slab.min - 1) {
      continue;
    }

    const slabAmount = Math.min(claimAmount, slab.max) - (slab.min - 1);
    if (slabAmount <= 0) {
      continue;
    }

    const fee = Math.round(slabAmount * slab.rate * 100) / 100;
    breakdown.push({
      label: slab.label,
      slabAmount,
      rateLabel: slab.rateLabel,
      fee,
    });
  }

  const totalFee = breakdown.reduce((sum, row) => sum + row.fee, 0);
  const effectiveRate = (totalFee / claimAmount) * 100;

  return {
    claimAmount,
    totalFee,
    effectiveRate,
    breakdown,
  };
}
