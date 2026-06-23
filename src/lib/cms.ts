import { categories as staticCategories } from "@/data/characters";
import { homeCharacters as staticHomeCharacters } from "@/data/homeCharacters";
import { arrangeHomeCharacters, isFixedHomeCharacterId } from "@/lib/homeCharacterOrder";
import { DEFAULT_SITE_SETTINGS, normalizeSiteSettings } from "@/lib/siteBackground";
import type {
  CmsCategory,
  CmsData,
  CmsHomeCharacter,
  CmsPattern,
  CmsProduct,
  CmsSiteSettings,
} from "@/types/cms";
import { getSql } from "./db";

const DOCUMENT_KEY = "site-content";
let schemaPromise: Promise<void> | null = null;

function text(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function bool(value: unknown, fallback = true) {
  return typeof value === "boolean" ? value : fallback;
}

function number(value: unknown, fallback = 0) {
  return Number.isFinite(Number(value)) ? Number(value) : fallback;
}

function stableId(prefix: string, value: string, index: number) {
  const safe = value
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9ก-๙_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();

  return `${prefix}-${safe || index}`;
}

export function getDefaultCmsData(): CmsData {
  const categories: CmsCategory[] = staticCategories.map((category, categoryIndex) => {
    const categoryId = stableId("category", category.slug || category.name, categoryIndex);

    return {
      id: categoryId,
      slug: category.slug,
      name: category.name,
      detail: category.detail ?? "",
      downloadUrl: category.downloadUrl ?? "",
      isActive: true,
      sortOrder: categoryIndex,
      patterns: category.patterns.map((pattern, patternIndex) => {
        const rowId = stableId(
          `${categoryId}-pattern`,
          pattern.id || pattern.name,
          patternIndex,
        );

        return {
          rowId,
          id: pattern.id,
          name: pattern.name,
          img: pattern.img,
          detail: pattern.detail ?? "",
          detailProducts: pattern.detailProducts ?? "",
          isActive: true,
          sortOrder: patternIndex,
          products: pattern.products.map((product, productIndex) => ({
            id: stableId(`${rowId}-product`, product.name, productIndex),
            name: product.name,
            img: product.img,
            isActive: true,
            sortOrder: productIndex,
          })),
        } satisfies CmsPattern;
      }),
    };
  });

  return {
    version: 1,
    siteSettings: { ...DEFAULT_SITE_SETTINGS },
    homeCharacters: arrangeHomeCharacters(
      staticHomeCharacters.map((item) => ({ ...item })),
      staticHomeCharacters,
    ),
    categories,
  };
}

function normalizeProduct(value: Partial<CmsProduct>, index: number, parentId: string): CmsProduct {
  return {
    id: text(value.id) || stableId(`${parentId}-product`, text(value.name), index),
    name: text(value.name, `Product ${index + 1}`),
    img: text(value.img),
    isActive: bool(value.isActive, true),
    sortOrder: number(value.sortOrder, index),
  };
}

function normalizePattern(
  value: Partial<CmsPattern>,
  index: number,
  categoryId: string,
): CmsPattern {
  const patternId = text(value.id, `pattern-${index + 1}`);
  const rowId = text(value.rowId) || stableId(`${categoryId}-pattern`, patternId, index);
  const products = Array.isArray(value.products) ? value.products : [];

  return {
    rowId,
    id: patternId,
    name: text(value.name, patternId),
    img: text(value.img),
    detail: text(value.detail),
    detailProducts: text(value.detailProducts),
    products: products
      .map((product, productIndex) => normalizeProduct(product, productIndex, rowId))
      .sort((a, b) => a.sortOrder - b.sortOrder),
    isActive: bool(value.isActive, true),
    sortOrder: number(value.sortOrder, index),
  };
}

function normalizeCategory(value: Partial<CmsCategory>, index: number): CmsCategory {
  const slug = text(value.slug, `category-${index + 1}`);
  const id = text(value.id) || stableId("category", slug, index);
  const patterns = Array.isArray(value.patterns) ? value.patterns : [];

  return {
    id,
    slug,
    name: text(value.name, slug),
    detail: text(value.detail),
    downloadUrl: text(value.downloadUrl),
    patterns: patterns
      .map((pattern, patternIndex) => normalizePattern(pattern, patternIndex, id))
      .sort((a, b) => a.sortOrder - b.sortOrder),
    isActive: bool(value.isActive, true),
    sortOrder: number(value.sortOrder, index),
  };
}

function normalizeHomeCharacter(
  value: Partial<CmsHomeCharacter>,
  index: number,
): CmsHomeCharacter {
  const name = text(value.name, `Character ${index + 1}`);
  const slug = text(value.slug) || slugify(name);
  const id = text(value.id) || stableId("home", slug || name, index);
  const placement =
    !isFixedHomeCharacterId(id) && value.placement === "external-link"
      ? "external-link"
      : "character";
  const linkType =
    placement === "external-link"
      ? "custom"
      : value.linkType === "catalog" || value.linkType === "custom"
        ? value.linkType
        : "category";

  return {
    id,
    name,
    slug,
    img: text(value.img),
    video: text(value.video),
    linkType,
    customUrl: text(value.customUrl),
    placement,
    openInNewTab: bool(value.openInNewTab, placement === "external-link"),
    isActive: bool(value.isActive, true),
    sortOrder: number(value.sortOrder, index),
  };
}


function getLegacySiteFontSettings(
  value: Partial<CmsData> | null | undefined,
): Partial<CmsSiteSettings> {
  const legacyFont = (
    value as { siteFont?: { family?: unknown; weight?: unknown } } | null | undefined
  )?.siteFont;

  if (!legacyFont) {
    return {};
  }

  return {
    fontFamily: text(legacyFont.family),
    fontWeight: text(legacyFont.weight),
  };
}

export function normalizeCmsData(value: Partial<CmsData> | null | undefined): CmsData {
  const fallback = getDefaultCmsData();
  const homeCharacters = Array.isArray(value?.homeCharacters)
    ? value.homeCharacters
    : fallback.homeCharacters;
  const categories = Array.isArray(value?.categories) ? value.categories : fallback.categories;

  return {
    version: 1,
    siteSettings: normalizeSiteSettings({
      ...getLegacySiteFontSettings(value),
      ...value?.siteSettings,
    }),
    homeCharacters: arrangeHomeCharacters(
      homeCharacters.map(normalizeHomeCharacter),
      staticHomeCharacters,
    ),
    categories: categories
      .map(normalizeCategory)
      .sort((a, b) => a.sortOrder - b.sortOrder),
    updatedAt: text(value?.updatedAt) || undefined,
  };
}

export function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\.+/g, "")
    .replace(/[^a-z0-9ก-๙_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function ensureSchema() {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS cms_documents (
          document_key TEXT PRIMARY KEY,
          data JSONB NOT NULL,
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
    })().catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }

  await schemaPromise;
}

async function seedIfEmpty() {
  await ensureSchema();
  const sql = getSql();
  const seed = getDefaultCmsData();

  await sql`
    INSERT INTO cms_documents (document_key, data)
    VALUES (${DOCUMENT_KEY}, ${JSON.stringify(seed)}::jsonb)
    ON CONFLICT (document_key) DO NOTHING
  `;
}

export async function getCmsData(options: { strict?: boolean } = {}): Promise<CmsData> {
  try {
    await seedIfEmpty();
    const sql = getSql();
    const rows = await sql`
      SELECT data, updated_at
      FROM cms_documents
      WHERE document_key = ${DOCUMENT_KEY}
      LIMIT 1
    `;

    const row = rows[0] as { data?: unknown; updated_at?: string | Date } | undefined;
    const rawData =
      typeof row?.data === "string"
        ? (JSON.parse(row.data) as Partial<CmsData>)
        : (row?.data as Partial<CmsData> | undefined);

    const data = normalizeCmsData(rawData);
    data.updatedAt = row?.updated_at
      ? new Date(row.updated_at).toISOString()
      : data.updatedAt;
    return data;
  } catch (error) {
    if (options.strict) {
      throw error;
    }

    console.error("CMS database unavailable, using static fallback:", error);
    return getDefaultCmsData();
  }
}

export async function saveCmsData(input: Partial<CmsData>): Promise<CmsData> {
  await ensureSchema();
  const sql = getSql();
  const data = normalizeCmsData(input);
  data.updatedAt = new Date().toISOString();

  const rows = await sql`
    INSERT INTO cms_documents (document_key, data, updated_at)
    VALUES (${DOCUMENT_KEY}, ${JSON.stringify(data)}::jsonb, NOW())
    ON CONFLICT (document_key)
    DO UPDATE SET data = EXCLUDED.data, updated_at = NOW()
    RETURNING data, updated_at
  `;

  const row = rows[0] as { data?: unknown; updated_at?: string | Date } | undefined;
  const rawData =
    typeof row?.data === "string"
      ? (JSON.parse(row.data) as Partial<CmsData>)
      : (row?.data as Partial<CmsData> | undefined);
  const saved = normalizeCmsData(rawData);
  saved.updatedAt = row?.updated_at
    ? new Date(row.updated_at).toISOString()
    : data.updatedAt;

  return saved;
}

function decodeSafe(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export function findCategoryBySlug(data: CmsData, requestedSlug: string) {
  const requestedDecoded = decodeSafe(requestedSlug);

  return (
    data.categories.find((category) => {
      const categoryDecoded = decodeSafe(category.slug);
      return (
        category.slug === requestedSlug ||
        categoryDecoded === requestedDecoded ||
        encodeURIComponent(categoryDecoded) === requestedSlug
      );
    }) ?? null
  );
}
