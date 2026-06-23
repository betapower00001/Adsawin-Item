import type { CSSProperties } from "react";
import type { CmsSiteSettings } from "@/types/cms";
import {
  DEFAULT_SITE_FONT_FAMILY,
  DEFAULT_SITE_FONT_WEIGHT,
  normalizeSiteFontFamily,
  normalizeSiteFontWeight,
} from "@/lib/siteFont";

export const DEFAULT_SITE_SETTINGS: CmsSiteSettings = {
  backgroundImage: "/BG-1.jpg",
  backgroundColor: "#f2edf7",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  overlayColor: "#ffffff",
  overlayOpacity: 0,
  fontFamily: DEFAULT_SITE_FONT_FAMILY,
  fontWeight: DEFAULT_SITE_FONT_WEIGHT,
};

function text(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

function choice<T extends string>(value: unknown, values: readonly T[], fallback: T): T {
  return typeof value === "string" && values.includes(value as T)
    ? (value as T)
    : fallback;
}

function clamp(value: unknown, min: number, max: number, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback;
}

export function normalizeSiteSettings(
  value: Partial<CmsSiteSettings> | null | undefined,
): CmsSiteSettings {
  return {
    backgroundImage: text(value?.backgroundImage, DEFAULT_SITE_SETTINGS.backgroundImage),
    backgroundColor: text(value?.backgroundColor, DEFAULT_SITE_SETTINGS.backgroundColor),
    backgroundSize: choice(
      value?.backgroundSize,
      ["cover", "contain", "auto"] as const,
      DEFAULT_SITE_SETTINGS.backgroundSize,
    ),
    backgroundPosition: choice(
      value?.backgroundPosition,
      ["center", "top", "bottom"] as const,
      DEFAULT_SITE_SETTINGS.backgroundPosition,
    ),
    backgroundRepeat: choice(
      value?.backgroundRepeat,
      ["no-repeat", "repeat"] as const,
      DEFAULT_SITE_SETTINGS.backgroundRepeat,
    ),
    backgroundAttachment: choice(
      value?.backgroundAttachment,
      ["fixed", "scroll"] as const,
      DEFAULT_SITE_SETTINGS.backgroundAttachment,
    ),
    overlayColor: text(value?.overlayColor, DEFAULT_SITE_SETTINGS.overlayColor),
    overlayOpacity: clamp(
      value?.overlayOpacity,
      0,
      100,
      DEFAULT_SITE_SETTINGS.overlayOpacity,
    ),
    fontFamily: normalizeSiteFontFamily(value?.fontFamily),
    fontWeight: normalizeSiteFontWeight(
      value?.fontWeight,
      normalizeSiteFontFamily(value?.fontFamily),
    ),
  };
}

function hexToRgba(hex: string, opacityPercent: number) {
  const normalized = hex.trim().replace(/^#/, "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((character) => character + character)
          .join("")
      : normalized;

  const fallback = [255, 255, 255];
  const rgb = /^[0-9a-fA-F]{6}$/.test(expanded)
    ? [
        Number.parseInt(expanded.slice(0, 2), 16),
        Number.parseInt(expanded.slice(2, 4), 16),
        Number.parseInt(expanded.slice(4, 6), 16),
      ]
    : fallback;

  const alpha = Math.min(1, Math.max(0, opacityPercent / 100));
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}

function cssUrl(value: string) {
  return `url(${JSON.stringify(value)})`;
}

export function getSiteBackgroundStyle(settings: CmsSiteSettings): CSSProperties {
  const overlay = hexToRgba(settings.overlayColor, settings.overlayOpacity);
  const hasImage = settings.backgroundImage.trim().length > 0;

  return {
    backgroundColor: settings.backgroundColor,
    backgroundImage: hasImage
      ? `linear-gradient(${overlay}, ${overlay}), ${cssUrl(settings.backgroundImage)}`
      : `linear-gradient(${overlay}, ${overlay})`,
    backgroundSize: hasImage ? `auto, ${settings.backgroundSize}` : "auto",
    backgroundPosition: hasImage ? `center, ${settings.backgroundPosition}` : "center",
    backgroundRepeat: hasImage ? `no-repeat, ${settings.backgroundRepeat}` : "no-repeat",
    backgroundAttachment: hasImage
      ? `scroll, ${settings.backgroundAttachment}`
      : "scroll",
  };
}
