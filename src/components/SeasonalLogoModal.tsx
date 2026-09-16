import React, { useState } from "react";
import { X, Calendar, Sparkles, Check, Info } from "lucide-react";
import {
  SEASONAL_LOGOS_MAP,
  getHolidaysForYear,
  getFasikaEasterDate,
  getEnkutatashDate,
  getEthiopianChristmasDate,
} from "../utils/seasonalLogo";

interface SeasonalLogoModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeSeasonId: string;
  seasonName: string;
  isSeasonal: boolean;
  override: string | null;
  onSelectOverride: (seasonKey: string | null) => void;
}

export default function SeasonalLogoModal({
  isOpen,
  onClose,
  activeSeasonId,
  seasonName,
  isSeasonal,
  override,
  onSelectOverride,
}: SeasonalLogoModalProps) {
  const [selectedYear, setSelectedYear] = useState<number>(2027);

  if (!isOpen) return null;

  const holidays = getHolidaysForYear(selectedYear);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-brand-border bg-white shadow-2xl text-brand-navy max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-brand-border bg-brand-cream/60 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg bg-brand-navy text-brand-gold">
              <Sparkles className="size-4" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-brand-navy">Seasonal Logos Manager</h3>
              <p className="text-xs text-brand-navy/60">Automated 5-day lead & 2-day grace holiday schedule</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full text-brand-navy/60 transition-colors hover:bg-brand-navy/10 hover:text-brand-navy cursor-pointer"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Current Status Banner */}
          <div className="rounded-xl border border-brand-gold/30 bg-brand-gold/10 p-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold">Current Active Logo</span>
                <p className="text-base font-bold text-brand-navy flex items-center gap-2">
                  <span>{seasonName}</span>
                  {override ? (
                    <span className="rounded-full bg-brand-gold/20 px-2 py-0.5 text-[10px] font-semibold text-brand-navy">
                      Preview Override Active
                    </span>
                  ) : (
                    <span className="rounded-full bg-green-100 text-green-800 px-2 py-0.5 text-[10px] font-semibold">
                      Auto (Real-time Date)
                    </span>
                  )}
                </p>
              </div>
              {override && (
                <button
                  onClick={() => onSelectOverride(null)}
                  className="rounded-lg border border-brand-navy/20 bg-white px-3 py-1.5 text-xs font-semibold text-brand-navy hover:bg-brand-cream transition-colors cursor-pointer"
                >
                  Reset to Auto Date
                </button>
              )}
            </div>
          </div>

          {/* Interactive Logo Switcher / Preview */}
          <div>
            <h4 className="mb-2.5 text-xs font-bold uppercase tracking-wider text-brand-navy/70">
              Preview Seasonal Logos
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(SEASONAL_LOGOS_MAP)
                .filter(([key]) => key !== "enkutatash") // avoid duplicate of adeyabeba
                .map(([key, item]) => {
                  const isSelected = override ? override === key : key === "standard" && !isSeasonal;
                  return (
                    <button
                      key={key}
                      onClick={() => onSelectOverride(key === "standard" ? null : key)}
                      className={`flex flex-col items-center gap-2 rounded-xl border p-3 text-center transition-all cursor-pointer ${
                        isSelected
                          ? "border-brand-gold bg-brand-navy text-brand-cream shadow-md scale-[1.02]"
                          : "border-brand-border bg-white text-brand-navy hover:border-brand-navy/30 hover:bg-brand-cream/40"
                      }`}
                    >
                      <div className="flex size-12 items-center justify-center rounded-lg bg-brand-cream/80 p-1.5 border border-brand-border/40">
                        <img src={item.logoSrc} alt={item.name} className="size-9 object-contain" />
                      </div>
                      <span className="text-xs font-semibold leading-tight">{item.name}</span>
                      <span className={`text-[10px] font-mono ${isSelected ? "text-brand-gold" : "text-brand-navy/50"}`}>
                        {item.logoFileName}
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Schedule Table */}
          <div className="border-t border-brand-border pt-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="size-4 text-brand-gold" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-brand-navy/70">
                  Holidays Schedule & Active Windows (5 Days Before, 2 Days After)
                </h4>
              </div>
              <div className="flex items-center gap-1">
                {[2026, 2027, 2028, 2029, 2030, 2031].map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`rounded-md px-2 py-0.5 text-xs font-bold transition-colors cursor-pointer ${
                      selectedYear === year
                        ? "bg-brand-navy text-brand-cream"
                        : "text-brand-navy/60 hover:bg-brand-cream"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-brand-border">
              <table className="w-full text-left text-xs">
                <thead className="bg-brand-cream/80 text-[11px] font-bold text-brand-navy uppercase tracking-wider border-b border-brand-border">
                  <tr>
                    <th className="px-3 py-2.5">Holiday</th>
                    <th className="px-3 py-2.5">Holiday Date</th>
                    <th className="px-3 py-2.5">Active Window (5d before → 2d after)</th>
                    <th className="px-3 py-2.5">Logo Used</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border bg-white font-medium">
                  {holidays.map((h) => (
                    <tr key={h.id} className="hover:bg-brand-cream/30">
                      <td className="px-3 py-2.5 font-semibold text-brand-navy flex items-center gap-2">
                        <img src={h.logoSrc} alt="" className="size-4 object-contain" />
                        <span>{h.name}</span>
                      </td>
                      <td className="px-3 py-2.5 text-brand-navy/80">
                        {formatDate(h.holidayDate)}
                      </td>
                      <td className="px-3 py-2.5 text-brand-navy/70 font-mono text-[11px]">
                        {formatDate(h.windowStart)} – {formatDate(h.windowEnd)}
                      </td>
                      <td className="px-3 py-2.5 text-brand-gold font-mono text-[11px]">
                        {h.logoFileName}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-3 flex items-start gap-2 rounded-lg bg-brand-cream/60 p-3 text-[11px] text-brand-navy/70">
              <Info className="size-4 shrink-0 text-brand-gold mt-0.5" />
              <p>
                As requested, <strong>xmaslogo.png</strong> is used for both Ethiopian Christmas (Genna) and Gregorian Christmas.
                The system automatically transitions between seasonal logos and returns to <strong>logo.png</strong> once the 2-day post-holiday grace period concludes.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-brand-border bg-brand-cream/50 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-brand-navy px-5 py-2 text-xs font-bold uppercase tracking-wider text-brand-cream hover:bg-brand-navy/90 transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
