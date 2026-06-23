import type { CSSProperties } from "react";
import type { CmsSiteSettings } from "@/types/cms";

export type GoogleFontOption = {
  family: string;
  label: string;
  category: string;
  weights: string[];
};

export const GOOGLE_FONT_OPTIONS: GoogleFontOption[] = [
  {
    family: "Anuphan",
    label: "ฟอนต์เดิมของเว็บ (Anuphan / อนุพันธ์)",
    category: "อ่านง่าย ใช้ได้ทั่วไป",
    weights: ["300", "400", "500", "600", "700"],
  },
  {
    family: "Noto Sans Thai",
    label: "Noto Sans Thai",
    category: "มาตรฐาน อ่านง่าย",
    weights: ["300", "400", "500", "600", "700"],
  },
  {
    family: "Prompt",
    label: "Prompt / พร้อมท์",
    category: "ทันสมัย เหมาะกับเว็บ",
    weights: ["300", "400", "500", "600", "700"],
  },
  {
    family: "Kanit",
    label: "Kanit / คณิต",
    category: "ชัดเจน ทันสมัย",
    weights: ["300", "400", "500", "600", "700"],
  },
  {
    family: "Sarabun",
    label: "Sarabun / สารบรรณ",
    category: "ทางการ อ่านง่าย",
    weights: ["300", "400", "500", "600", "700"],
  },
  {
    family: "Mitr",
    label: "Mitr / มิตร",
    category: "เป็นมิตร นุ่มนวล",
    weights: ["300", "400", "500", "600", "700"],
  },
  {
    family: "Bai Jamjuree",
    label: "Bai Jamjuree / ใบจามจุรี",
    category: "พรีเมียม เรียบร้อย",
    weights: ["300", "400", "500", "600", "700"],
  },
  {
    family: "Chakra Petch",
    label: "Chakra Petch / จักรเพชร",
    category: "เทคโนโลยี สปอร์ต",
    weights: ["300", "400", "500", "600", "700"],
  },
  {
    family: "Mali",
    label: "Mali / มะลิ",
    category: "น่ารัก เป็นกันเอง",
    weights: ["300", "400", "500", "600", "700"],
  },
  {
    family: "Itim",
    label: "Itim / ไอติม",
    category: "สนุก น่ารัก",
    weights: ["400"],
  },
  {
    family: "Sriracha",
    label: "Sriracha / ศรีราชา",
    category: "ลายมือ โดดเด่น",
    weights: ["400"],
  },
];

export const DEFAULT_SITE_FONT_FAMILY = "Anuphan";
export const DEFAULT_SITE_FONT_WEIGHT = "400";

export const DEFAULT_SITE_FONT = {
  family: DEFAULT_SITE_FONT_FAMILY,
  weight: DEFAULT_SITE_FONT_WEIGHT,
};

export function getGoogleFontOption(family: string) {
  return (
    GOOGLE_FONT_OPTIONS.find((option) => option.family === family) ??
    GOOGLE_FONT_OPTIONS[0]
  );
}

export function normalizeSiteFontFamily(value: unknown) {
  return typeof value === "string" &&
    GOOGLE_FONT_OPTIONS.some((option) => option.family === value)
    ? value
    : DEFAULT_SITE_FONT_FAMILY;
}

export function normalizeSiteFontWeight(value: unknown, family = DEFAULT_SITE_FONT_FAMILY) {
  const option = getGoogleFontOption(family);
  const fallback = option.weights.includes(DEFAULT_SITE_FONT_WEIGHT)
    ? DEFAULT_SITE_FONT_WEIGHT
    : option.weights[0] ?? DEFAULT_SITE_FONT_WEIGHT;

  return typeof value === "string" && option.weights.includes(value)
    ? value
    : fallback;
}

function encodeFamilyForGoogleFonts(family: string) {
  return family.trim().replace(/\s+/g, "+");
}

export function getGoogleFontHref(family: string) {
  const option = getGoogleFontOption(normalizeSiteFontFamily(family));
  const encodedFamily = encodeFamilyForGoogleFonts(option.family);
  const weightQuery = option.weights.length
    ? `:wght@${option.weights.join(";")}`
    : "";

  return `https://fonts.googleapis.com/css2?family=${encodedFamily}${weightQuery}&display=swap`;
}

export function getSiteFontStyle(settings: Pick<CmsSiteSettings, "fontFamily" | "fontWeight">): CSSProperties {
  const fontFamily = normalizeSiteFontFamily(settings.fontFamily);
  const fontWeight = normalizeSiteFontWeight(settings.fontWeight, fontFamily);
  const fallbackStack = 'var(--font-anuphan), "Anuphan", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

  return {
    fontFamily:
      fontFamily === DEFAULT_SITE_FONT_FAMILY
        ? fallbackStack
        : `"${fontFamily}", ${fallbackStack}`,
    fontWeight,
  };
}

export function normalizeSiteFont(
  value:
    | Partial<Pick<CmsSiteSettings, "fontFamily" | "fontWeight">>
    | { family?: unknown; weight?: unknown }
    | null
    | undefined,
) {
  const rawFamily =
    value && "fontFamily" in value ? value.fontFamily : value?.family;

  const family = normalizeSiteFontFamily(rawFamily);

  const rawWeight =
    value && "fontWeight" in value ? value.fontWeight : value?.weight;

  return {
    family,
    weight: normalizeSiteFontWeight(rawWeight, family),
  };
}
