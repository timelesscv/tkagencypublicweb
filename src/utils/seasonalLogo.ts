import defaultLogo from "@/assets/logo.png";
import xmasLogo from "@/assets/xmaslogo.png";
import easterLogo from "@/assets/easterlogo.png";
import adeyabebaLogo from "@/assets/adeyabebalogo.png";
import newYearLogo from "@/assets/newyearlogo.png";
import { useEffect, useState } from "react";

export type SeasonId =
  | "standard"
  | "newyear"
  | "easter"
  | "enkutatash"
  | "xmas_gregorian"
  | "xmas_ethiopian";

export interface HolidaySchedule {
  id: SeasonId;
  name: string;
  category: "New Year" | "Christmas" | "Easter" | "Enkutatash";
  holidayDate: Date;
  windowStart: Date; // 5 days before holiday (00:00:00)
  windowEnd: Date;   // 2 days after holiday (23:59:59)
  logoSrc: string;
  logoFileName: string;
}

/**
 * Calculates Orthodox Easter (Fasika) for any Gregorian year
 * using the Meeus/Jones/Butcher astronomical formula for the Julian calendar,
 * adjusted by +13 days to convert to the Gregorian calendar (valid 1900-2099).
 */
export function getFasikaEasterDate(year: number): Date {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;
  // Julian date in UTC
  const julianDate = new Date(Date.UTC(year, month - 1, day));
  // Add 13 days to convert Julian to Gregorian
  julianDate.setUTCDate(julianDate.getUTCDate() + 13);
  return new Date(julianDate.getUTCFullYear(), julianDate.getUTCMonth(), julianDate.getUTCDate());
}

/**
 * Determines the date of Enkutatash (Ethiopian New Year) in Gregorian calendar.
 * Falls on September 12 in the year preceding a Gregorian leap year (year % 4 === 3),
 * otherwise on September 11.
 */
export function getEnkutatashDate(year: number): Date {
  const isPreLeap = year % 4 === 3;
  return new Date(year, 8, isPreLeap ? 12 : 11);
}

/**
 * Determines the date of Ethiopian Christmas (Genna) in Gregorian calendar.
 * Falls on January 8 in a Gregorian leap year (year % 4 === 0), otherwise January 7.
 */
export function getEthiopianChristmasDate(year: number): Date {
  const isLeap = year % 4 === 0;
  return new Date(year, 0, isLeap ? 8 : 7);
}

/**
 * Generates all official holiday windows for a given year.
 * Rule: 5 days before, 2 days after.
 */
export function getHolidaysForYear(year: number): HolidaySchedule[] {
  const holidays: {
    id: SeasonId;
    name: string;
    category: HolidaySchedule["category"];
    date: Date;
    logoSrc: string;
    logoFileName: string;
  }[] = [
    {
      id: "newyear",
      name: "Gregorian New Year",
      category: "New Year",
      date: new Date(year, 0, 1),
      logoSrc: newYearLogo,
      logoFileName: "newyearlogo.png",
    },
    {
      id: "eth_xmas" as SeasonId,
      name: "Ethiopian Christmas (Genna)",
      category: "Christmas",
      date: getEthiopianChristmasDate(year),
      logoSrc: xmasLogo,
      logoFileName: "xmaslogo.png",
    },
    {
      id: "easter",
      name: "Fasika (Ethiopian Easter)",
      category: "Easter",
      date: getFasikaEasterDate(year),
      logoSrc: easterLogo,
      logoFileName: "easterlogo.png",
    },
    {
      id: "enkutatash",
      name: "Enkutatash (Ethiopian New Year)",
      category: "Enkutatash",
      date: getEnkutatashDate(year),
      logoSrc: adeyabebaLogo,
      logoFileName: "adeyabebalogo.png",
    },
    {
      id: "greg_xmas" as SeasonId,
      name: "Gregorian Christmas",
      category: "Christmas",
      date: new Date(year, 11, 25),
      logoSrc: xmasLogo,
      logoFileName: "xmaslogo.png",
    },
  ];

  return holidays.map((h) => {
    // 5 days before at 00:00:00
    const windowStart = new Date(h.date.getFullYear(), h.date.getMonth(), h.date.getDate() - 5, 0, 0, 0, 0);
    // 2 days after at 23:59:59.999
    const windowEnd = new Date(h.date.getFullYear(), h.date.getMonth(), h.date.getDate() + 2, 23, 59, 59, 999);

    return {
      id: h.id,
      name: h.name,
      category: h.category,
      holidayDate: h.date,
      windowStart,
      windowEnd,
      logoSrc: h.logoSrc,
      logoFileName: h.logoFileName,
    };
  });
}

export interface ActiveSeasonResult {
  seasonId: SeasonId;
  seasonName: string;
  logoSrc: string;
  logoFileName: string;
  isSeasonal: boolean;
  activeSchedule?: HolidaySchedule;
}

/**
 * Evaluates the active seasonal logo for any target Date.
 * Checks previous, current, and next year to handle year boundary transitions smoothly.
 */
export function getActiveSeasonalLogo(currentDate: Date = new Date()): ActiveSeasonResult {
  const currentYear = currentDate.getFullYear();
  const candidateYears = [currentYear - 1, currentYear, currentYear + 1];

  const allHolidays: HolidaySchedule[] = [];
  for (const yr of candidateYears) {
    allHolidays.push(...getHolidaysForYear(yr));
  }

  // Find all holidays where currentDate falls in [windowStart, windowEnd]
  const activeMatches: { schedule: HolidaySchedule; distance: number }[] = [];
  const currentTs = currentDate.getTime();

  for (const h of allHolidays) {
    if (currentTs >= h.windowStart.getTime() && currentTs <= h.windowEnd.getTime()) {
      const distance = Math.abs(currentTs - h.holidayDate.getTime());
      activeMatches.push({ schedule: h, distance });
    }
  }

  if (activeMatches.length === 0) {
    return {
      seasonId: "standard",
      seasonName: "Standard",
      logoSrc: defaultLogo,
      logoFileName: "logo.png",
      isSeasonal: false,
    };
  }

  // If multiple overlap (e.g. Dec 27), the one closest to its central holiday date wins
  activeMatches.sort((a, b) => a.distance - b.distance);
  const winner = activeMatches[0].schedule;

  return {
    seasonId: winner.id,
    seasonName: winner.name,
    logoSrc: winner.logoSrc,
    logoFileName: winner.logoFileName,
    isSeasonal: true,
    activeSchedule: winner,
  };
}

// Seasonal logos directory map for manual preview override
export const SEASONAL_LOGOS_MAP = {
  standard: {
    name: "Standard",
    logoSrc: defaultLogo,
    logoFileName: "logo.png",
    seasonId: "standard" as SeasonId,
  },
  adeyabeba: {
    name: "Enkutatash (Adey Abeba)",
    logoSrc: adeyabebaLogo,
    logoFileName: "adeyabebalogo.png",
    seasonId: "enkutatash" as SeasonId,
  },
  enkutatash: {
    name: "Enkutatash (Adey Abeba)",
    logoSrc: adeyabebaLogo,
    logoFileName: "adeyabebalogo.png",
    seasonId: "enkutatash" as SeasonId,
  },
  xmas: {
    name: "Christmas (Xmas)",
    logoSrc: xmasLogo,
    logoFileName: "xmaslogo.png",
    seasonId: "xmas_gregorian" as SeasonId,
  },
  easter: {
    name: "Fasika (Easter)",
    logoSrc: easterLogo,
    logoFileName: "easterlogo.png",
    seasonId: "easter" as SeasonId,
  },
  newyear: {
    name: "New Year",
    logoSrc: newYearLogo,
    logoFileName: "newyearlogo.png",
    seasonId: "newyear" as SeasonId,
  },
};

/**
 * Custom React Hook providing the reactive seasonal logo,
 * handling automatic time checks, URL preview overrides (?season=xmas, ?season=easter, etc.),
 * and dynamic favicon updating.
 */
export function useSeasonalLogo() {
  const [override, setOverride] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    const urlParams = new URLSearchParams(window.location.search);
    const seasonParam = urlParams.get("season")?.toLowerCase();
    if (seasonParam && seasonParam in SEASONAL_LOGOS_MAP) {
      return seasonParam;
    }
    return localStorage.getItem("tk_agency_logo_override") || null;
  });

  const [simulatedDate, setSimulatedDate] = useState<Date | null>(() => {
    if (typeof window === "undefined") return null;
    const urlParams = new URLSearchParams(window.location.search);
    const dateParam = urlParams.get("date");
    if (dateParam) {
      const parsed = new Date(dateParam);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return null;
  });

  const [activeLogo, setActiveLogo] = useState<ActiveSeasonResult>(() => {
    if (override && override in SEASONAL_LOGOS_MAP) {
      const entry = SEASONAL_LOGOS_MAP[override as keyof typeof SEASONAL_LOGOS_MAP];
      return {
        seasonId: entry.seasonId,
        seasonName: entry.name,
        logoSrc: entry.logoSrc,
        logoFileName: entry.logoFileName,
        isSeasonal: entry.seasonId !== "standard",
      };
    }
    return getActiveSeasonalLogo(simulatedDate || new Date());
  });

  // Re-evaluate whenever override or simulated date changes
  useEffect(() => {
    if (override && override in SEASONAL_LOGOS_MAP) {
      const entry = SEASONAL_LOGOS_MAP[override as keyof typeof SEASONAL_LOGOS_MAP];
      setActiveLogo({
        seasonId: entry.seasonId,
        seasonName: entry.name,
        logoSrc: entry.logoSrc,
        logoFileName: entry.logoFileName,
        isSeasonal: entry.seasonId !== "standard",
      });
      return;
    }

    const update = () => {
      const res = getActiveSeasonalLogo(simulatedDate || new Date());
      setActiveLogo(res);
    };

    update();
    const interval = setInterval(update, 60000); // check every minute
    return () => clearInterval(interval);
  }, [override, simulatedDate]);

  // Dynamically update favicon if seasonal
  useEffect(() => {
    if (typeof document === "undefined") return;
    const link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (link) {
      // If seasonal, use the seasonal logo; otherwise default to /assets/logo2.png
      if (activeLogo.isSeasonal) {
        link.href = activeLogo.logoSrc;
      } else {
        link.href = "/assets/logo2.png";
      }
    }
  }, [activeLogo]);

  const setManualOverride = (seasonKey: string | null) => {
    if (seasonKey && seasonKey in SEASONAL_LOGOS_MAP) {
      setOverride(seasonKey);
      localStorage.setItem("tk_agency_logo_override", seasonKey);
    } else {
      setOverride(null);
      localStorage.removeItem("tk_agency_logo_override");
    }
  };

  return {
    logoSrc: activeLogo.logoSrc,
    logoFileName: activeLogo.logoFileName,
    seasonName: activeLogo.seasonName,
    seasonId: activeLogo.seasonId,
    isSeasonal: activeLogo.isSeasonal,
    activeSchedule: activeLogo.activeSchedule,
    override,
    setManualOverride,
    simulatedDate,
    setSimulatedDate,
  };
}
