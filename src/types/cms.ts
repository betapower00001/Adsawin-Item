export type CmsLinkType = "category" | "catalog" | "custom";
export type CmsHomePlacement = "character" | "external-link";
export type CmsBackgroundSize = "cover" | "contain" | "auto";
export type CmsBackgroundPosition = "center" | "top" | "bottom";
export type CmsBackgroundRepeat = "no-repeat" | "repeat";
export type CmsBackgroundAttachment = "fixed" | "scroll";

export interface CmsSiteSettings {
  backgroundImage: string;
  backgroundColor: string;
  backgroundSize: CmsBackgroundSize;
  backgroundPosition: CmsBackgroundPosition;
  backgroundRepeat: CmsBackgroundRepeat;
  backgroundAttachment: CmsBackgroundAttachment;
  overlayColor: string;
  overlayOpacity: number;
  fontFamily: string;
  fontWeight: string;
}

export interface CmsHomeCharacter {
  id: string;
  name: string;
  slug: string;
  img: string;
  video?: string;
  linkType: CmsLinkType;
  customUrl?: string;
  placement?: CmsHomePlacement;
  openInNewTab?: boolean;
  isActive: boolean;
  sortOrder: number;
}

export interface CmsProduct {
  id: string;
  name: string;
  img: string;
  isActive: boolean;
  sortOrder: number;
}

export interface CmsPattern {
  rowId: string;
  id: string;
  name: string;
  img: string;
  detail?: string;
  detailProducts?: string;
  products: CmsProduct[];
  isActive: boolean;
  sortOrder: number;
}

export interface CmsCategory {
  id: string;
  slug: string;
  name: string;
  detail?: string;
  downloadUrl?: string;
  patterns: CmsPattern[];
  isActive: boolean;
  sortOrder: number;
}

export interface CmsData {
  version: 1;
  siteSettings: CmsSiteSettings;
  homeCharacters: CmsHomeCharacter[];
  categories: CmsCategory[];
  updatedAt?: string;
}
