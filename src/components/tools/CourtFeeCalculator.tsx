"use client";

import { useMemo, useState } from "react";
import { calculateCourtFee, formatNpr } from "@/lib/court-fees";

function parseClaimAmount(value: string): number | null {
  const cleaned = value.replace(/,/g, "").trim();
  if (!cleaned) return null;
  const amount = Number(cleaned);
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return amount;
}

export default function CourtFeeCalculator() {
  const [rawAmount, setRawAmount] = useState("");

  const claimAmount = useMemo(() => parseClaimAmount(rawAmount), [rawAmount]);
  const result = useMemo(
    () => (claimAmount !== null ? calculateCourtFee(claimAmount) : null),
    [claimAmount],
  );

  const showError = rawAmount.trim() !== "" && claimAmount === null;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="border-b border-gray-100 bg-navy px-6 py-8 text-white sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-gold">Calculator</p>
        <h2 className="mt-2 font-serif text-2xl font-bold sm:text-3xl">Calculate Your Court Fee</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-300">
          Enter the value or amount claimed in your suit. The fee is computed instantly using the
          progressive slab rates under Section 69 of the National Civil Procedure (Code) Act, 2017.
        </p>
      </div>

      <div className="px-6 py-8 sm:px-8">
        <label htmlFor="claim-amount" className="block text-sm font-medium text-navy">
          Claim amount (NPR)
        </label>
        <div className="relative mt-3 max-w-md">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
            Rs.
          </span>
          <input
            id="claim-amount"
            type="text"
            inputMode="decimal"
            placeholder="e.g. 5,00,000"
            autoComplete="off"
            value={rawAmount}
            onChange={(e) => setRawAmount(e.target.value)}
            className="w-full rounded-lg border border-gray-200 bg-light-gray py-3.5 pl-12 pr-4 text-lg font-semibold text-navy transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        {showError && (
          <p className="mt-2 text-sm text-red-600">
            Please enter a valid claim amount greater than zero.
          </p>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-100 bg-light-gray p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Claim amount</p>
            <p className="mt-2 font-serif text-2xl font-bold text-navy">
              {result ? `Rs. ${formatNpr(result.claimAmount)}` : "—"}
            </p>
          </div>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Court fee payable</p>
            <p className="mt-2 font-serif text-2xl font-bold text-primary">
              {result ? `Rs. ${formatNpr(result.totalFee)}` : "—"}
            </p>
          </div>
          <div className="rounded-xl border border-gray-100 bg-light-gray p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Effective rate</p>
            <p className="mt-2 font-serif text-2xl font-bold text-navy">
              {result ? `${result.effectiveRate.toFixed(2)}%` : "—"}
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold text-navy">Division of fee</h3>
          <p className="mt-1 text-sm text-gray-500">
            Slab-wise breakdown showing how each portion of your claim is assessed.
          </p>

          {result ? (
            <div className="mt-4 overflow-x-auto rounded-xl border border-gray-100">
              <table className="w-full min-w-[540px] text-left text-sm">
                <thead className="bg-light-gray text-navy">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Amount range</th>
                    <th className="px-4 py-3 font-semibold">Taxable amount</th>
                    <th className="px-4 py-3 font-semibold">Rate</th>
                    <th className="px-4 py-3 text-right font-semibold">Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {result.breakdown.map((row) => (
                    <tr key={row.label} className="border-t border-gray-100">
                      <td className="px-4 py-3 text-gray-700">{row.label}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {row.slabAmount !== null ? `Rs. ${formatNpr(row.slabAmount)}` : "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{row.rateLabel}</td>
                      <td className="px-4 py-3 text-right font-medium text-navy">
                        Rs. {formatNpr(row.fee)}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t border-gray-200 bg-navy/5">
                    <td colSpan={3} className="px-4 py-3 font-semibold text-navy">
                      Total court fee
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-primary">
                      Rs. {formatNpr(result.totalFee)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="mt-4 rounded-xl border border-dashed border-gray-200 bg-light-gray/50 px-6 py-10 text-center">
              <p className="text-sm text-gray-500">
                Enter a claim amount above to view the full slab-wise fee breakdown.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
