import type { CmsHomeCharacter } from "@/types/cms";

export const BASE_HOME_CHARACTER_IDS = [
  "home-seasonal",
  "home-fun-fantasy",
  "home-otaku",
  "home-mutelu",
  "home-authentic-thai",
  "home-food",
  "home-fashion-trend",
  "home-pets",
] as const;

export const OUR_CREATION_HOME_CHARACTER_ID = "home-our-creation";
export const CATALOG_HOME_CHARACTER_ID = "home-catalog";

export const FIXED_HOME_CHARACTER_IDS = [
  OUR_CREATION_HOME_CHARACTER_ID,
  CATALOG_HOME_CHARACTER_ID,
] as const;

const fixedIds = new Set<string>(FIXED_HOME_CHARACTER_IDS);

export function isFixedHomeCharacterId(id: string) {
  return fixedIds.has(id);
}

export function isExternalHomeLink(item: CmsHomeCharacter) {
  return item.placement === "external-link";
}

export function arrangeHomeCharacters(
  items: CmsHomeCharacter[],
  fixedFallbacks: CmsHomeCharacter[] = [],
): CmsHomeCharacter[] {
  const currentById = new Map(items.map((item) => [item.id, item]));
  const fallbackById = new Map(fixedFallbacks.map((item) => [item.id, item]));

  const regularCharacters = items
    .filter((item) => !fixedIds.has(item.id) && !isExternalHomeLink(item))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const ourCreation =
    currentById.get(OUR_CREATION_HOME_CHARACTER_ID) ??
    fallbackById.get(OUR_CREATION_HOME_CHARACTER_ID);

  const externalLinks = items
    .filter((item) => !fixedIds.has(item.id) && isExternalHomeLink(item))
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const catalog =
    currentById.get(CATALOG_HOME_CHARACTER_ID) ??
    fallbackById.get(CATALOG_HOME_CHARACTER_ID);

  return [
    ...regularCharacters,
    ...(ourCreation ? [ourCreation] : []),
    ...externalLinks,
    ...(catalog ? [catalog] : []),
  ].map((item, index) => ({ ...item, sortOrder: index }));
}

export function splitHomeCharacters(items: CmsHomeCharacter[]) {
  const regularCharacters = items.filter(
    (item) => !isFixedHomeCharacterId(item.id) && !isExternalHomeLink(item),
  );

  const ourCreation =
    items.find((item) => item.id === OUR_CREATION_HOME_CHARACTER_ID) ?? null;

  const externalLinks = items.filter(
    (item) => !isFixedHomeCharacterId(item.id) && isExternalHomeLink(item),
  );

  const catalog =
    items.find((item) => item.id === CATALOG_HOME_CHARACTER_ID) ?? null;

  const bottomButtons = [
    ...(ourCreation ? [ourCreation] : []),
    ...externalLinks,
    ...(catalog ? [catalog] : []),
  ];

  return {
    regularCharacters,
    ourCreation,
    externalLinks,
    catalog,
    bottomButtons,
  };
}
