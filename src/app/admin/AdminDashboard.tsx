"use client";

import { ChangeEvent, DragEvent, FormEvent, ReactNode, useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import type {
  CmsCategory,
  CmsData,
  CmsHomeCharacter,
  CmsPattern,
  CmsProduct,
  CmsSiteSettings,
} from "@/types/cms";
import {
  CATALOG_HOME_CHARACTER_ID,
  OUR_CREATION_HOME_CHARACTER_ID,
  arrangeHomeCharacters,
  isExternalHomeLink,
  isFixedHomeCharacterId,
} from "@/lib/homeCharacterOrder";
import {
  DEFAULT_SITE_SETTINGS,
  getSiteBackgroundStyle,
  normalizeSiteSettings,
} from "@/lib/siteBackground";
import {
  DEFAULT_SITE_FONT_FAMILY,
  DEFAULT_SITE_FONT_WEIGHT,
  GOOGLE_FONT_OPTIONS,
  getGoogleFontHref,
  getGoogleFontOption,
  getSiteFontStyle,
  normalizeSiteFontFamily,
  normalizeSiteFontWeight,
} from "@/lib/siteFont";
import styles from "./AdminPage.module.css";

type SiteFontDraft = Pick<CmsSiteSettings, "fontFamily" | "fontWeight">;

type ModalState =
  | { kind: "siteBackground"; draft: CmsSiteSettings }
  | { kind: "siteFont"; draft: SiteFontDraft }
  | { kind: "character"; index: number | null; draft: CmsHomeCharacter }
  | { kind: "externalLink"; index: number | null; draft: CmsHomeCharacter }
  | { kind: "category"; index: number | null; draft: CmsCategory }
  | {
      kind: "pattern";
      categoryId: string;
      index: number | null;
      draft: CmsPattern;
    }
  | null;

function uid(prefix: string) {
  const value =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${value}`;
}

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/\.+/g, "")
    .replace(/[^a-z0-9ก-๙_-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function copyData<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

type SiteFontVariableStyle = CSSProperties & {
  "--site-font-family"?: string;
  "--site-font-weight"?: string;
  "--admin-font-preview-family"?: string;
  "--admin-font-preview-weight"?: string;
};

const ANUPHAN_FONT_STACK =
  'var(--font-anuphan), "Anuphan", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

function getSiteFontVariableStyle(
  settings: Pick<CmsSiteSettings, "fontFamily" | "fontWeight">,
): SiteFontVariableStyle {
  const style = getSiteFontStyle(settings);
  const fontFamily = String(style.fontFamily || ANUPHAN_FONT_STACK);
  const fontWeight = String(style.fontWeight || DEFAULT_SITE_FONT_WEIGHT);

  return {
    ...style,
    "--site-font-family": fontFamily,
    "--site-font-weight": fontWeight,
    "--admin-font-preview-family": fontFamily,
    "--admin-font-preview-weight": fontWeight,
  };
}

function upsertGoogleFontStylesheet(key: string, href: string) {
  if (typeof document === "undefined") return;

  let link = document.querySelector<HTMLLinkElement>(
    `link[data-admin-google-font="${key}"]`,
  );

  if (!link) {
    link = document.createElement("link");
    link.rel = "stylesheet";
    link.dataset.adminGoogleFont = key;
    document.head.appendChild(link);
  }

  if (link.href !== href) {
    link.href = href;
  }
}

function blankCharacter(index: number): CmsHomeCharacter {
  return {
    id: uid("home"),
    name: "",
    slug: "",
    img: "",
    video: "",
    linkType: "category",
    customUrl: "",
    placement: "character",
    openInNewTab: false,
    isActive: true,
    sortOrder: index,
  };
}

function blankExternalLink(index: number): CmsHomeCharacter {
  return {
    id: uid("external-link"),
    name: "",
    slug: "",
    img: "",
    video: "",
    linkType: "custom",
    customUrl: "",
    placement: "external-link",
    openInNewTab: true,
    isActive: true,
    sortOrder: index,
  };
}

function normalizeExternalUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^\/+/, "")}`;
}

function blankCategory(index: number): CmsCategory {
  return {
    id: uid("category"),
    slug: "",
    name: "",
    detail: "",
    downloadUrl: "",
    patterns: [],
    isActive: true,
    sortOrder: index,
  };
}

function blankPattern(index: number): CmsPattern {
  return {
    rowId: uid("pattern"),
    id: "",
    name: "",
    img: "",
    detail: "",
    detailProducts: "",
    products: [],
    isActive: true,
    sortOrder: index,
  };
}

function blankProduct(index: number): CmsProduct {
  return {
    id: uid("product"),
    name: "",
    img: "",
    isActive: true,
    sortOrder: index,
  };
}

function sortOrders<T extends { sortOrder: number }>(items: T[]) {
  return items.map((item, index) => ({ ...item, sortOrder: index }));
}

type DragKind = "regularCharacter" | "externalLink" | "category" | "pattern";
type DragState = {
  kind: DragKind;
  id: string;
} | null;

function moveItemByKey<T>(
  items: T[],
  activeId: string,
  overId: string,
  getKey: (item: T) => string,
) {
  const activeIndex = items.findIndex((item) => getKey(item) === activeId);
  const overIndex = items.findIndex((item) => getKey(item) === overId);

  if (activeIndex < 0 || overIndex < 0 || activeIndex === overIndex) {
    return items;
  }

  const next = [...items];
  const [activeItem] = next.splice(activeIndex, 1);
  next.splice(overIndex, 0, activeItem);
  return next;
}

function reorderHomeGroup(
  items: CmsHomeCharacter[],
  activeId: string,
  overId: string,
  group: "regularCharacter" | "externalLink",
) {
  const isTargetGroup = (item: CmsHomeCharacter) =>
    group === "externalLink"
      ? !isFixedHomeCharacterId(item.id) && isExternalHomeLink(item)
      : !isFixedHomeCharacterId(item.id) && !isExternalHomeLink(item);

  const groupItems = items.filter(isTargetGroup);
  const reorderedGroup = sortOrders(
    moveItemByKey(groupItems, activeId, overId, (item) => item.id),
  );
  const reorderedById = new Map(
    reorderedGroup.map((item) => [item.id, item]),
  );

  return arrangeHomeCharacters(
    items.map((item) => reorderedById.get(item.id) ?? item),
  );
}

export default function AdminDashboard({ initialData }: { initialData: CmsData }) {
  const [data, setData] = useState<CmsData>(copyData(initialData));
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    initialData.categories[0]?.id ?? "",
  );
  const [modal, setModal] = useState<ModalState>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [dragState, setDragState] = useState<DragState>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const selectedCategory = useMemo(
    () => data.categories.find((category) => category.id === selectedCategoryId) ?? null,
    [data.categories, selectedCategoryId],
  );

  const regularCharacterEntries = useMemo(
    () =>
      data.homeCharacters
        .map((item, index) => ({ item, index }))
        .filter(
          ({ item }) =>
            !isFixedHomeCharacterId(item.id) && !isExternalHomeLink(item),
        ),
    [data.homeCharacters],
  );

  const externalLinkEntries = useMemo(
    () =>
      data.homeCharacters
        .map((item, index) => ({ item, index }))
        .filter(
          ({ item }) =>
            !isFixedHomeCharacterId(item.id) && isExternalHomeLink(item),
        ),
    [data.homeCharacters],
  );

  const ourCreationEntry = useMemo(() => {
    const index = data.homeCharacters.findIndex(
      (item) => item.id === OUR_CREATION_HOME_CHARACTER_ID,
    );
    return index >= 0 ? { item: data.homeCharacters[index], index } : null;
  }, [data.homeCharacters]);

  const catalogEntry = useMemo(() => {
    const index = data.homeCharacters.findIndex(
      (item) => item.id === CATALOG_HOME_CHARACTER_ID,
    );
    return index >= 0 ? { item: data.homeCharacters[index], index } : null;
  }, [data.homeCharacters]);

  useEffect(() => {
    upsertGoogleFontStylesheet(
      "current-site-font",
      getGoogleFontHref(data.siteSettings.fontFamily),
    );

    const style = getSiteFontVariableStyle(data.siteSettings);
    document.body.style.setProperty(
      "--site-font-family",
      style["--site-font-family"] || ANUPHAN_FONT_STACK,
    );
    document.body.style.setProperty(
      "--site-font-weight",
      style["--site-font-weight"] || DEFAULT_SITE_FONT_WEIGHT,
    );
  }, [data.siteSettings.fontFamily, data.siteSettings.fontWeight]);

  useEffect(() => {
    if (!hasUnsavedChanges) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  function markOrderChanged(nextData: CmsData, message: string) {
    setData(nextData);
    setError("");
    setNotice(message);
    setHasUnsavedChanges(true);
  }

  async function persist(nextData: CmsData, message: string) {
    setSaving(true);
    setError("");
    setNotice("");

    try {
      const response = await fetch("/api/admin/data", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextData),
      });
      const result = (await response.json()) as CmsData & { error?: string };

      if (response.status === 401) {
        window.location.reload();
        return false;
      }

      if (!response.ok) {
        throw new Error(result.error || "บันทึกข้อมูลไม่สำเร็จ");
      }

      setData(result);
      setHasUnsavedChanges(false);
      setNotice(message);
      window.setTimeout(() => setNotice(""), 2500);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "บันทึกข้อมูลไม่สำเร็จ");
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    if (
      hasUnsavedChanges &&
      !window.confirm(
        "มีการเปลี่ยนแปลงลำดับที่ยังไม่ได้บันทึก ต้องการออกจากระบบหรือไม่?",
      )
    ) {
      return;
    }

    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  function openSiteBackground() {
    setError("");
    setModal({ kind: "siteBackground", draft: copyData(data.siteSettings) });
  }

  function openSiteFont() {
    setError("");
    setModal({
      kind: "siteFont",
      draft: {
        fontFamily: data.siteSettings.fontFamily || DEFAULT_SITE_FONT_FAMILY,
        fontWeight: data.siteSettings.fontWeight || DEFAULT_SITE_FONT_WEIGHT,
      },
    });
  }

  function openCharacter(index: number | null) {
    setError("");

    const draft =
      index === null
        ? blankCharacter(regularCharacterEntries.length)
        : copyData(data.homeCharacters[index]);
    setModal({ kind: "character", index, draft });
  }

  function openExternalLink(index: number | null) {
    setError("");

    const draft =
      index === null
        ? blankExternalLink(
            externalLinkEntries.reduce(
              (highest, entry) => Math.max(highest, entry.item.sortOrder),
              data.homeCharacters.length,
            ) + 1,
          )
        : copyData(data.homeCharacters[index]);
    setModal({ kind: "externalLink", index, draft });
  }

  function openCategory(index: number | null) {
    setError("");
    const draft =
      index === null ? blankCategory(data.categories.length) : copyData(data.categories[index]);
    setModal({ kind: "category", index, draft });
  }

  function openPattern(index: number | null) {
    setError("");
    if (!selectedCategory) return;
    const draft =
      index === null
        ? blankPattern(selectedCategory.patterns.length)
        : copyData(selectedCategory.patterns[index]);
    setModal({ kind: "pattern", categoryId: selectedCategory.id, index, draft });
  }

  async function submitModal(event: FormEvent) {
    event.preventDefault();
    if (!modal) return;

    const next = copyData(data);
    let categoryToSelect: string | null = null;

    if (modal.kind === "siteBackground") {
      next.siteSettings = normalizeSiteSettings(modal.draft);
    }

    if (modal.kind === "siteFont") {
      const fontFamily = normalizeSiteFontFamily(modal.draft.fontFamily);
      next.siteSettings = normalizeSiteSettings({
        ...next.siteSettings,
        fontFamily,
        fontWeight: normalizeSiteFontWeight(modal.draft.fontWeight, fontFamily),
      });
    }

    if (modal.kind === "character") {
      const draft = {
        ...modal.draft,
        name: modal.draft.name.trim(),
        slug: modal.draft.slug.trim() || slugify(modal.draft.name),
        placement: "character" as const,
      };

      if (!draft.name || !draft.img) {
        setError("กรุณาใส่ชื่อและรูป Character");
        return;
      }

      if (modal.index === null) {
        next.homeCharacters.push(draft);

        if (draft.linkType === "category") {
          const existingCategory = next.categories.find(
            (category) => category.slug === draft.slug,
          );

          if (existingCategory) {
            categoryToSelect = existingCategory.id;
          } else {
            const category = {
              ...blankCategory(next.categories.length),
              name: draft.name,
              slug: draft.slug,
            };

            next.categories.push(category);
            next.categories = sortOrders(next.categories);
            categoryToSelect = category.id;
          }
        }
      } else {
        next.homeCharacters[modal.index] = draft;
      }
      next.homeCharacters = arrangeHomeCharacters(next.homeCharacters);
    }

    if (modal.kind === "externalLink") {
      const draft = {
        ...modal.draft,
        name: modal.draft.name.trim(),
        slug: modal.draft.slug.trim() || slugify(modal.draft.name),
        linkType: "custom" as const,
        customUrl: normalizeExternalUrl(modal.draft.customUrl ?? ""),
        placement: "external-link" as const,
        openInNewTab: modal.draft.openInNewTab !== false,
      };

      if (!draft.name || !draft.img || !draft.customUrl) {
        setError("กรุณาใส่ชื่อ รูป และ URL เว็บไซต์");
        return;
      }

      if (modal.index === null) {
        next.homeCharacters.push(draft);
      } else {
        next.homeCharacters[modal.index] = draft;
      }
      next.homeCharacters = arrangeHomeCharacters(next.homeCharacters);
    }

    if (modal.kind === "category") {
      const draft = {
        ...modal.draft,
        name: modal.draft.name.trim(),
        slug: modal.draft.slug.trim() || slugify(modal.draft.name),
      };

      if (!draft.name || !draft.slug) {
        setError("กรุณาใส่ชื่อและ slug ของ Category");
        return;
      }

      const duplicated = next.categories.some(
        (category, index) =>
          category.slug === draft.slug && index !== (modal.index ?? -1),
      );
      if (duplicated) {
        setError("slug นี้ถูกใช้งานแล้ว");
        return;
      }

      if (modal.index === null) {
        next.categories.push(draft);
        categoryToSelect = draft.id;
      } else {
        next.categories[modal.index] = draft;
      }
      next.categories = sortOrders(next.categories);
    }

    if (modal.kind === "pattern") {
      const categoryIndex = next.categories.findIndex(
        (category) => category.id === modal.categoryId,
      );
      if (categoryIndex < 0) return;

      const draft = {
        ...modal.draft,
        id: modal.draft.id.trim() || slugify(modal.draft.name),
        name: modal.draft.name.trim(),
        products: sortOrders(modal.draft.products),
      };

      if (!draft.id || !draft.name || !draft.img) {
        setError("กรุณาใส่ Pattern ID, ชื่อ และรูปหน้าปก");
        return;
      }

      const duplicated = next.categories[categoryIndex].patterns.some(
        (pattern, index) => pattern.id === draft.id && index !== (modal.index ?? -1),
      );
      if (duplicated) {
        setError("Pattern ID นี้ถูกใช้งานแล้วใน Category นี้");
        return;
      }

      if (modal.index === null) {
        next.categories[categoryIndex].patterns.push(draft);
      } else {
        next.categories[categoryIndex].patterns[modal.index] = draft;
      }
      next.categories[categoryIndex].patterns = sortOrders(
        next.categories[categoryIndex].patterns,
      );
    }

    const ok = await persist(next, "บันทึกข้อมูลเรียบร้อย");
    if (ok) {
      if (categoryToSelect) {
        setSelectedCategoryId(categoryToSelect);
        window.setTimeout(() => {
          document
            .getElementById("category-pattern-section")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
      setModal(null);
    }
  }

  async function deleteCharacter(index: number) {
    const character = data.homeCharacters[index];
    if (!character) return;

    if (isFixedHomeCharacterId(character.id)) {
      setError("ผลงานของเรา และ CATALOG ถูกล็อกไว้ ไม่สามารถลบได้");
      return;
    }

    const linkedCategory =
      character.linkType === "category"
        ? data.categories.find((category) => category.slug === character.slug)
        : undefined;

    const confirmMessage = linkedCategory
      ? `ลบ Character “${character.name}” พร้อม Category “${linkedCategory.name}” และ Pattern ทั้งหมดภายใน ใช่ไหม?`
      : `ลบ ${character.name} ใช่ไหม?`;

    if (!window.confirm(confirmMessage)) return;

    const next = copyData(data);
    next.homeCharacters.splice(index, 1);
    next.homeCharacters = arrangeHomeCharacters(next.homeCharacters);

    if (linkedCategory) {
      next.categories = sortOrders(
        next.categories.filter((category) => category.id !== linkedCategory.id),
      );
    }

    const nextSelectedCategoryId =
      linkedCategory?.id === selectedCategoryId
        ? next.categories[0]?.id ?? ""
        : selectedCategoryId;

    const ok = await persist(
      next,
      linkedCategory
        ? "ลบ Character, Category และ Pattern แล้ว"
        : "ลบ Character แล้ว",
    );

    if (ok && linkedCategory) {
      setSelectedCategoryId(nextSelectedCategoryId);
    }
  }

  async function deleteCategory(index: number) {
    const category = data.categories[index];
    if (
      !window.confirm(
        `ลบ Category “${category.name}” และ Pattern ทั้งหมดภายใน ใช่ไหม?`,
      )
    )
      return;

    const next = copyData(data);
    next.categories.splice(index, 1);
    next.categories = sortOrders(next.categories);
    const nextSelected = next.categories[0]?.id ?? "";
    const ok = await persist(next, "ลบ Category แล้ว");
    if (ok) setSelectedCategoryId(nextSelected);
  }

  async function deletePattern(index: number) {
    if (!selectedCategory) return;
    const pattern = selectedCategory.patterns[index];
    if (!window.confirm(`ลบ Pattern “${pattern.name}” ใช่ไหม?`)) return;

    const next = copyData(data);
    const categoryIndex = next.categories.findIndex(
      (category) => category.id === selectedCategory.id,
    );
    next.categories[categoryIndex].patterns.splice(index, 1);
    next.categories[categoryIndex].patterns = sortOrders(
      next.categories[categoryIndex].patterns,
    );
    await persist(next, "ลบ Pattern แล้ว");
  }

  function startDrag(
    event: DragEvent<HTMLElement>,
    kind: DragKind,
    id: string,
  ) {
    setError("");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", id);
    setDragState({ kind, id });
  }

  function allowDrop(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function clearDrag() {
    setDragState(null);
  }

  function dropRegularCharacter(
    event: DragEvent<HTMLElement>,
    overId: string,
  ) {
    event.preventDefault();
    if (!dragState || dragState.kind !== "regularCharacter") return;
    if (dragState.id === overId) {
      clearDrag();
      return;
    }

    const next = copyData(data);
    next.homeCharacters = reorderHomeGroup(
      next.homeCharacters,
      dragState.id,
      overId,
      "regularCharacter",
    );
    clearDrag();
    markOrderChanged(next, "จัดลำดับ Characters แล้ว กรุณากดบันทึกข้อมูลทั้งหมด");
  }

  function dropExternalLink(
    event: DragEvent<HTMLElement>,
    overId: string,
  ) {
    event.preventDefault();
    if (!dragState || dragState.kind !== "externalLink") return;
    if (dragState.id === overId) {
      clearDrag();
      return;
    }

    const next = copyData(data);
    next.homeCharacters = reorderHomeGroup(
      next.homeCharacters,
      dragState.id,
      overId,
      "externalLink",
    );
    clearDrag();
    markOrderChanged(next, "จัดลำดับลิงก์เว็บไซต์แล้ว กรุณากดบันทึกข้อมูลทั้งหมด");
  }

  function dropCategory(
    event: DragEvent<HTMLElement>,
    overId: string,
  ) {
    event.preventDefault();
    if (!dragState || dragState.kind !== "category") return;
    if (dragState.id === overId) {
      clearDrag();
      return;
    }

    const next = copyData(data);
    next.categories = sortOrders(
      moveItemByKey(next.categories, dragState.id, overId, (category) =>
        category.id,
      ),
    );
    clearDrag();
    markOrderChanged(next, "จัดลำดับ Category แล้ว กรุณากดบันทึกข้อมูลทั้งหมด");
  }

  function dropPattern(
    event: DragEvent<HTMLElement>,
    overRowId: string,
  ) {
    event.preventDefault();
    if (!selectedCategory || !dragState || dragState.kind !== "pattern") return;
    if (dragState.id === overRowId) {
      clearDrag();
      return;
    }

    const next = copyData(data);
    const categoryIndex = next.categories.findIndex(
      (category) => category.id === selectedCategory.id,
    );

    if (categoryIndex < 0) {
      clearDrag();
      return;
    }

    next.categories[categoryIndex].patterns = sortOrders(
      moveItemByKey(
        next.categories[categoryIndex].patterns,
        dragState.id,
        overRowId,
        (pattern) => pattern.rowId,
      ),
    );
    clearDrag();
    markOrderChanged(next, "จัดลำดับ Pattern แล้ว กรุณากดบันทึกข้อมูลทั้งหมด");
  }

  function renderLockedBottomCard(entry: {
    item: CmsHomeCharacter;
    index: number;
  }) {
    const { item, index } = entry;

    return (
      <article
        className={`${styles.fixedHomeCard} ${
          !item.isActive ? styles.inactive : ""
        }`}
        key={item.id}
      >
        <div className={styles.fixedHomeImageWrap}>
          {item.img ? <img src={item.img} alt={item.name} /> : <div>ไม่มีรูป</div>}
          {!item.isActive && <span className={styles.inactiveBadge}>ซ่อนอยู่</span>}
        </div>
        <h3>{item.name}</h3>
        <div className={styles.fixedHomeMeta}>
          <span className={styles.lockedBadge}>ล็อกเฉพาะตำแหน่ง</span>
          <button
            className={styles.fixedEditButton}
            type="button"
            onClick={() => openCharacter(index)}
          >
            แก้ไข
          </button>
        </div>
      </article>
    );
  }

  function renderExternalLinkCard(entry: {
    item: CmsHomeCharacter;
    index: number;
  }) {
    const { item, index } = entry;

    return (
      <article
        className={`${styles.fixedHomeCard} ${styles.draggableItem} ${
          dragState?.kind === "externalLink" && dragState.id === item.id
            ? styles.draggingItem
            : ""
        } ${!item.isActive ? styles.inactive : ""}`}
        draggable={!saving}
        key={item.id}
        onDragEnd={clearDrag}
        onDragOver={allowDrop}
        onDragStart={(event) => startDrag(event, "externalLink", item.id)}
        onDrop={(event) => dropExternalLink(event, item.id)}
      >
        <div className={styles.fixedHomeImageWrap}>
          {item.img ? <img src={item.img} alt={item.name} /> : <div>ไม่มีรูป</div>}
          {!item.isActive && <span className={styles.inactiveBadge}>ซ่อนอยู่</span>}
        </div>
        <div className={styles.externalLinkInfo}>
          <h3>{item.name}</h3>
          <small>{item.customUrl}</small>
        </div>
        <div className={styles.fixedHomeMeta}>
          <span className={styles.externalLinkBadge}>ลิงก์เว็บไซต์</span>
          <div className={styles.fixedCardToolRow}>
            <button
              className={styles.fixedEditButton}
              type="button"
              onMouseDown={(event) => event.stopPropagation()}
              onClick={() => openExternalLink(index)}
            >
              แก้ไข
            </button>
            <button
              className={styles.fixedDeleteButton}
              type="button"
              onMouseDown={(event) => event.stopPropagation()}
              onClick={() => deleteCharacter(index)}
            >
              ลบ
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <main className={styles.adminPage}>
      <header className={styles.topBar}>
        <div>
          <span className={styles.eyebrow}>ADSAWIN CMS</span>
          <h1>จัดการหน้าเว็บไซต์</h1>
          <p>หน้าตาใกล้เคียงหน้าเว็บจริง พร้อมปุ่มเพิ่ม แก้ไข และลบ</p>
        </div>
        <div className={styles.headerActions}>
          {hasUnsavedChanges && (
            <button
              className={styles.primaryButton}
              type="button"
              disabled={saving}
              onClick={() => persist(data, "บันทึกข้อมูลทั้งหมดเรียบร้อย")}
            >
              บันทึกข้อมูลทั้งหมด
            </button>
          )}
          <a className={styles.secondaryButton} href="/" target="_blank" rel="noreferrer">
            เปิดหน้าเว็บ
          </a>
          <button className={styles.dangerOutlineButton} onClick={logout} type="button">
            ออกจากระบบ
          </button>
        </div>
      </header>

      {(notice || error || saving || hasUnsavedChanges) && (
        <div
          className={`${styles.statusBar} ${error ? styles.statusError : ""} ${
            hasUnsavedChanges && !error ? styles.statusWarning : ""
          }`}
          role="status"
        >
          {saving
            ? "กำลังบันทึกลง Neon..."
            : error ||
              (hasUnsavedChanges
                ? notice || "มีการเปลี่ยนแปลงลำดับแล้ว กรุณากดบันทึกข้อมูลทั้งหมด"
                : notice)}
        </div>
      )}

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionNumber}>01</span>
            <h2>พื้นหลังเว็บไซต์</h2>
            <p>เปลี่ยนภาพ สี การวางภาพ และความเข้มของพื้นหลังทุกหน้าสาธารณะ</p>
          </div>
          <button
            className={styles.primaryButton}
            type="button"
            onClick={openSiteBackground}
          >
            เปลี่ยนพื้นหลัง
          </button>
        </div>

        <div className={styles.backgroundSettingCard}>
          <div
            className={styles.backgroundPreview}
            style={getSiteBackgroundStyle(data.siteSettings)}
          >
            <div className={styles.backgroundPreviewContent}>
              <strong>ตัวอย่างพื้นหลังเว็บไซต์</strong>
              <span>
                {data.siteSettings.backgroundImage
                  ? "ใช้ภาพพื้นหลัง"
                  : "ใช้สีพื้นหลังอย่างเดียว"}
              </span>
            </div>
          </div>
          <div className={styles.backgroundSettingMeta}>
            <div>
              <span>สีพื้นหลัง</span>
              <strong>{data.siteSettings.backgroundColor}</strong>
            </div>
            <div>
              <span>รูปแบบภาพ</span>
              <strong>{data.siteSettings.backgroundSize}</strong>
            </div>
            <div>
              <span>Overlay</span>
              <strong>{data.siteSettings.overlayOpacity}%</strong>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionNumber}>02</span>
            <h2>ฟอนต์เว็บไซต์</h2>
            <p>เลือกฟอนต์จาก Google Fonts แล้วใช้กับหน้าเว็บสาธารณะทั้งหมด</p>
          </div>
          <button
            className={styles.primaryButton}
            type="button"
            onClick={openSiteFont}
          >
            เปลี่ยนฟอนต์
          </button>
        </div>

        <div className={styles.fontSettingCard}>
          <div
            className={styles.fontPreviewBox}
            style={getSiteFontVariableStyle(data.siteSettings)}
          >
            <span>ตัวอย่างฟอนต์เว็บไซต์</span>
            <strong>เลือกปลั๊กที่ใช่ ลายที่ชอบ</strong>
            <p>Adsawin CMS — ภาษาไทยและภาษาอังกฤษ AaBb123</p>
          </div>
          <div className={styles.fontSettingMeta}>
            <div>
              <span>ฟอนต์ปัจจุบัน</span>
              <strong>{getGoogleFontOption(data.siteSettings.fontFamily).label}</strong>
            </div>
            <div>
              <span>น้ำหนักตัวอักษร</span>
              <strong>{data.siteSettings.fontWeight}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionNumber}>03</span>
            <h2>Characters หน้าแรก</h2>
            <p>การ์ดที่ผู้ชมเห็นในหน้าแรกของเว็บไซต์</p>
          </div>
          <div className={styles.sectionHeaderActions}>
            <button
              className={styles.secondaryButton}
              type="button"
              onClick={() => openExternalLink(null)}
            >
              + เพิ่มลิงก์เว็บไซต์
            </button>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={() => openCharacter(null)}
            >
              + เพิ่ม Character
            </button>
          </div>
        </div>

        <div className={styles.homeGrid}>
          {regularCharacterEntries.map(({ item, index }) => (
            <article
              className={`${styles.homeCard} ${styles.draggableItem} ${
                dragState?.kind === "regularCharacter" && dragState.id === item.id
                  ? styles.draggingItem
                  : ""
              } ${!item.isActive ? styles.inactive : ""}`}
              draggable={!saving}
              key={item.id}
              onDragEnd={clearDrag}
              onDragOver={allowDrop}
              onDragStart={(event) => startDrag(event, "regularCharacter", item.id)}
              onDrop={(event) => dropRegularCharacter(event, item.id)}
            >
              <div className={styles.cardImageWrap}>
                {item.img ? <img src={item.img} alt={item.name} /> : <div>ไม่มีรูป</div>}
                {!item.isActive && <span className={styles.inactiveBadge}>ซ่อนอยู่</span>}
              </div>
              <h3>{item.name}</h3>
              <div className={styles.cardTools}>
                <button
                  type="button"
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={() => openCharacter(index)}
                >
                  แก้ไข
                </button>
                <button
                  type="button"
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={() => deleteCharacter(index)}
                >
                  ลบ
                </button>
              </div>
            </article>
          ))}

          <button className={styles.addCard} type="button" onClick={() => openCharacter(null)}>
            <span>+</span>
            เพิ่ม Character
          </button>
        </div>

        <div className={styles.fixedSectionHeading}>
          <div>
            <h3>ปุ่มส่วนล่าง</h3>
            <p>
              ลิงก์เว็บไซต์จะถูกวางระหว่าง “ผลงานของเรา” และ “CATALOG” เสมอ
            </p>
          </div>
          <button
            className={styles.secondaryButton}
            type="button"
            onClick={() => openExternalLink(null)}
          >
            + เพิ่มลิงก์เว็บไซต์
          </button>
        </div>

        <div className={styles.fixedHomeGrid}>
          {ourCreationEntry && renderLockedBottomCard(ourCreationEntry)}

          {externalLinkEntries.map((entry) =>
            renderExternalLinkCard(entry),
          )}

          <button
            className={styles.addFixedLinkCard}
            type="button"
            onClick={() => openExternalLink(null)}
          >
            <span>+</span>
            <strong>เพิ่มลิงก์เว็บไซต์</strong>
            <small>จะแทรกก่อน CATALOG อัตโนมัติ</small>
          </button>

          {catalogEntry && renderLockedBottomCard(catalogEntry)}
        </div>
      </section>

      <section className={styles.section} id="category-pattern-section">
        <div className={styles.sectionHeader}>
          <div>
            <span className={styles.sectionNumber}>04</span>
            <h2>Category และ Pattern</h2>
            <p>เลือก Category ด้านล่าง แล้วจัดการ Pattern ในรูปแบบเดียวกับหน้าเว็บ</p>
          </div>
          <button className={styles.primaryButton} type="button" onClick={() => openCategory(null)}>
            + เพิ่ม Category
          </button>
        </div>

        <div className={styles.categoryTabs}>
          {data.categories.map((category, index) => (
            <div
              className={`${styles.categoryTabWrap} ${styles.draggableTab} ${
                dragState?.kind === "category" && dragState.id === category.id
                  ? styles.draggingItem
                  : ""
              } ${category.id === selectedCategoryId ? styles.activeCategory : ""}`}
              draggable={!saving}
              key={category.id}
              onDragEnd={clearDrag}
              onDragOver={allowDrop}
              onDragStart={(event) => startDrag(event, "category", category.id)}
              onDrop={(event) => dropCategory(event, category.id)}
            >
              <button
                className={styles.categoryTab}
                type="button"
                onClick={() => setSelectedCategoryId(category.id)}
              >
                {category.name}
                {!category.isActive && <small>ซ่อน</small>}
              </button>
              <button
                className={styles.miniEditButton}
                type="button"
                aria-label={`แก้ไข ${category.name}`}
                onMouseDown={(event) => event.stopPropagation()}
                onClick={() => openCategory(index)}
              >
                ✎
              </button>
              <button
                className={styles.miniDeleteButton}
                type="button"
                aria-label={`ลบ ${category.name}`}
                onMouseDown={(event) => event.stopPropagation()}
                onClick={() => deleteCategory(index)}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {selectedCategory ? (
          <div className={styles.patternPanel}>
            <div className={styles.patternHeading}>
              <div>
                <h3>ลายทั้งหมดของ {selectedCategory.name}</h3>
                {selectedCategory.detail && <p>{selectedCategory.detail}</p>}
              </div>
              <button className={styles.primaryButton} type="button" onClick={() => openPattern(null)}>
                + เพิ่ม Pattern
              </button>
            </div>

            <div className={styles.patternGrid}>
              {selectedCategory.patterns.map((pattern, index) => (
                <article
                  className={`${styles.patternCard} ${styles.draggableItem} ${
                    dragState?.kind === "pattern" && dragState.id === pattern.rowId
                      ? styles.draggingItem
                      : ""
                  } ${!pattern.isActive ? styles.inactive : ""}`}
                  draggable={!saving}
                  key={pattern.rowId}
                  onDragEnd={clearDrag}
                  onDragOver={allowDrop}
                  onDragStart={(event) => startDrag(event, "pattern", pattern.rowId)}
                  onDrop={(event) => dropPattern(event, pattern.rowId)}
                >
                  <div className={styles.patternImageWrap}>
                    {pattern.img ? (
                      <img src={pattern.img} alt={pattern.name} />
                    ) : (
                      <div>ไม่มีรูป</div>
                    )}
                    {!pattern.isActive && <span className={styles.inactiveBadge}>ซ่อนอยู่</span>}
                  </div>
                  <h4>{pattern.name}</h4>
                  {pattern.detail && <p>{pattern.detail}</p>}
                  <span className={styles.productCount}>
                    {pattern.products.length} ภาพสินค้า
                  </span>
                  <div className={styles.cardTools}>
                    <button
                      type="button"
                      onMouseDown={(event) => event.stopPropagation()}
                      onClick={() => openPattern(index)}
                    >
                      แก้ไข
                    </button>
                    <button
                      type="button"
                      onMouseDown={(event) => event.stopPropagation()}
                      onClick={() => deletePattern(index)}
                    >
                      ลบ
                    </button>
                  </div>
                </article>
              ))}

              <button className={styles.addPatternCard} type="button" onClick={() => openPattern(null)}>
                <span>+</span>
                เพิ่ม Pattern
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.emptyState}>ยังไม่มี Category กรุณากด “เพิ่ม Category”</div>
        )}
      </section>

      {modal && (
        <ModalShell title={modalTitle(modal)} onClose={() => setModal(null)}>
          <form className={styles.modalForm} onSubmit={submitModal}>
            {modal.kind === "siteBackground" && (
              <SiteBackgroundForm
                draft={modal.draft}
                onChange={(draft) => setModal({ ...modal, draft })}
              />
            )}

            {modal.kind === "siteFont" && (
              <SiteFontForm
                draft={modal.draft}
                onChange={(draft) => setModal({ ...modal, draft })}
              />
            )}

            {modal.kind === "character" && (
              <CharacterForm
                draft={modal.draft}
                onChange={(draft) => setModal({ ...modal, draft })}
              />
            )}

            {modal.kind === "externalLink" && (
              <ExternalLinkForm
                draft={modal.draft}
                onChange={(draft) => setModal({ ...modal, draft })}
              />
            )}

            {modal.kind === "category" && (
              <CategoryForm
                draft={modal.draft}
                onChange={(draft) => setModal({ ...modal, draft })}
              />
            )}

            {modal.kind === "pattern" && (
              <PatternForm
                draft={modal.draft}
                onChange={(draft) => setModal({ ...modal, draft })}
              />
            )}

            {error && <div className={styles.errorBox}>{error}</div>}

            <div className={styles.modalActions}>
              <button className={styles.secondaryButton} type="button" onClick={() => setModal(null)}>
                ยกเลิก
              </button>
              <button className={styles.primaryButton} type="submit" disabled={saving}>
                {saving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
              </button>
            </div>
          </form>
        </ModalShell>
      )}
    </main>
  );
}

function modalTitle(modal: Exclude<ModalState, null>) {
  if (modal.kind === "siteBackground") return "ตั้งค่าพื้นหลังเว็บไซต์";
  if (modal.kind === "siteFont") return "ตั้งค่าฟอนต์เว็บไซต์";
  const mode = modal.index === null ? "เพิ่ม" : "แก้ไข";
  if (modal.kind === "character") return `${mode} Character`;
  if (modal.kind === "externalLink") return `${mode} ลิงก์เว็บไซต์`;
  if (modal.kind === "category") return `${mode} Category`;
  return `${mode} Pattern`;
}

function ModalShell({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  return (
    <div className={styles.modalBackdrop} role="presentation" onMouseDown={onClose}>
      <div
        className={styles.modalCard}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
          <button type="button" onClick={onClose} aria-label="ปิด">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function SiteFontForm({
  draft,
  onChange,
}: {
  draft: SiteFontDraft;
  onChange: (draft: SiteFontDraft) => void;
}) {
  const selectedFamily = normalizeSiteFontFamily(draft.fontFamily);
  const selectedOption = getGoogleFontOption(selectedFamily);
  const selectedWeight = normalizeSiteFontWeight(draft.fontWeight, selectedFamily);

  function updateFamily(fontFamily: string) {
    const normalizedFamily = normalizeSiteFontFamily(fontFamily);
    onChange({
      fontFamily: normalizedFamily,
      fontWeight: normalizeSiteFontWeight(selectedWeight, normalizedFamily),
    });
  }

  useEffect(() => {
    upsertGoogleFontStylesheet(
      "site-font-preview",
      getGoogleFontHref(selectedFamily),
    );
  }, [selectedFamily]);

  return (
    <>
      <div
        className={styles.fontModalPreview}
        style={getSiteFontVariableStyle({
          fontFamily: selectedFamily,
          fontWeight: selectedWeight,
        })}
      >
        <span>ตัวอย่างฟอนต์จาก Google Fonts</span>
        <strong>เลือกปลั๊กที่ใช่ ลายที่ชอบ</strong>
        <p>Adsawin CMS — ภาษาไทย ภาษาอังกฤษ และตัวเลข 1234567890</p>
      </div>

      <label className={styles.fieldLabel}>
        เลือกฟอนต์
        <select
          className={styles.input}
          value={selectedFamily}
          onChange={(event) => updateFamily(event.target.value)}
        >
          {GOOGLE_FONT_OPTIONS.map((option) => (
            <option key={option.family} value={option.family}>
              {option.label} — {option.category}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.fieldLabel}>
        น้ำหนักตัวอักษร
        <select
          className={styles.input}
          value={selectedWeight}
          onChange={(event) =>
            onChange({
              ...draft,
              fontFamily: selectedFamily,
              fontWeight: normalizeSiteFontWeight(event.target.value, selectedFamily),
            })
          }
        >
          {selectedOption.weights.map((weight) => (
            <option key={weight} value={weight}>
              {weight}
            </option>
          ))}
        </select>
      </label>

      <div className={styles.formHint}>
        ระบบจะโหลดฟอนต์จาก Google Fonts ด้วยลิงก์ CSS แล้วนำไปใช้กับหน้าเว็บสาธารณะทั้งหมด
        หลังบันทึกข้อมูล
      </div>

      <button
        className={styles.secondaryButton}
        type="button"
        onClick={() =>
          onChange({
            fontFamily: DEFAULT_SITE_FONT_FAMILY,
            fontWeight: DEFAULT_SITE_FONT_WEIGHT,
          })
        }
      >
        คืนค่าฟอนต์เดิม
      </button>
    </>
  );
}

function SiteBackgroundForm({
  draft,
  onChange,
}: {
  draft: CmsSiteSettings;
  onChange: (draft: CmsSiteSettings) => void;
}) {
  return (
    <>
      <div
        className={styles.backgroundModalPreview}
        style={getSiteBackgroundStyle(draft)}
      >
        <strong>ตัวอย่างพื้นหลัง</strong>
      </div>

      <AssetField
        label="ภาพพื้นหลัง (เว้นว่างได้ หากต้องการใช้สีอย่างเดียว)"
        value={draft.backgroundImage}
        accept="image/*"
        folder="site-backgrounds"
        onChange={(backgroundImage) => onChange({ ...draft, backgroundImage })}
      />

      <div className={styles.twoColumns}>
        <ColorField
          label="สีพื้นหลัง"
          value={draft.backgroundColor}
          onChange={(backgroundColor) => onChange({ ...draft, backgroundColor })}
        />
        <ColorField
          label="สี Overlay"
          value={draft.overlayColor}
          onChange={(overlayColor) => onChange({ ...draft, overlayColor })}
        />
      </div>

      <label className={styles.fieldLabel}>
        ความเข้ม Overlay: {draft.overlayOpacity}%
        <input
          className={styles.rangeInput}
          type="range"
          min="0"
          max="100"
          step="1"
          value={draft.overlayOpacity}
          onChange={(event) =>
            onChange({ ...draft, overlayOpacity: Number(event.target.value) })
          }
        />
      </label>

      <div className={styles.twoColumns}>
        <label className={styles.fieldLabel}>
          การปรับขนาดภาพ
          <select
            className={styles.input}
            value={draft.backgroundSize}
            onChange={(event) =>
              onChange({
                ...draft,
                backgroundSize: event.target.value as CmsSiteSettings["backgroundSize"],
              })
            }
          >
            <option value="cover">เต็มพื้นที่ (Cover)</option>
            <option value="contain">เห็นภาพครบ (Contain)</option>
            <option value="auto">ขนาดจริง (Auto)</option>
          </select>
        </label>

        <label className={styles.fieldLabel}>
          ตำแหน่งภาพ
          <select
            className={styles.input}
            value={draft.backgroundPosition}
            onChange={(event) =>
              onChange({
                ...draft,
                backgroundPosition:
                  event.target.value as CmsSiteSettings["backgroundPosition"],
              })
            }
          >
            <option value="center">กึ่งกลาง</option>
            <option value="top">ด้านบน</option>
            <option value="bottom">ด้านล่าง</option>
          </select>
        </label>
      </div>

      <div className={styles.twoColumns}>
        <ActiveField
          checked={draft.backgroundRepeat === "repeat"}
          label="แสดงภาพพื้นหลังซ้ำ"
          onChange={(checked) =>
            onChange({
              ...draft,
              backgroundRepeat: checked ? "repeat" : "no-repeat",
            })
          }
        />
        <ActiveField
          checked={draft.backgroundAttachment === "fixed"}
          label="ล็อกพื้นหลังขณะเลื่อนหน้า"
          onChange={(checked) =>
            onChange({
              ...draft,
              backgroundAttachment: checked ? "fixed" : "scroll",
            })
          }
        />
      </div>

      <button
        className={styles.secondaryButton}
        type="button"
        onClick={() => onChange({ ...DEFAULT_SITE_SETTINGS })}
      >
        คืนค่าพื้นหลังเดิม
      </button>
    </>
  );
}

function CharacterForm({
  draft,
  onChange,
}: {
  draft: CmsHomeCharacter;
  onChange: (draft: CmsHomeCharacter) => void;
}) {
  return (
    <>
      <div className={styles.twoColumns}>
        <TextField
          label="ชื่อ Character *"
          value={draft.name}
          onChange={(name) =>
            onChange({ ...draft, name, slug: draft.slug || slugify(name) })
          }
        />
        <TextField
          label="Slug / URL ของ Category"
          value={draft.slug}
          onChange={(slug) => onChange({ ...draft, slug })}
          placeholder="เช่น seasonal"
        />
      </div>

      <AssetField
        label="รูป Character *"
        value={draft.img}
        accept="image/*"
        folder="characters"
        onChange={(img) => onChange({ ...draft, img })}
      />

      <AssetField
        label="วิดีโอตอน Hover (ไม่ใส่ก็ได้)"
        value={draft.video ?? ""}
        accept="video/mp4,video/webm"
        folder="character-videos"
        onChange={(video) => onChange({ ...draft, video })}
      />

      <div className={styles.twoColumns}>
        <label className={styles.fieldLabel}>
          การเชื่อมต่อเมื่อกดการ์ด
          <select
            className={styles.input}
            value={draft.linkType}
            onChange={(event) =>
              onChange({
                ...draft,
                linkType: event.target.value as CmsHomeCharacter["linkType"],
              })
            }
          >
            <option value="category">ไปหน้า Category</option>
            <option value="catalog">ไปหน้า Catalog</option>
            <option value="custom">URL กำหนดเอง</option>
          </select>
        </label>
        <TextField
          label="URL กำหนดเอง"
          value={draft.customUrl ?? ""}
          onChange={(customUrl) => onChange({ ...draft, customUrl })}
          placeholder="เช่น /catalog หรือ https://..."
        />
      </div>

      {draft.linkType === "category" && (
        <div className={styles.formHint}>
          เมื่อเพิ่ม Character ใหม่ ระบบจะสร้าง Category ชื่อและ Slug เดียวกันให้อัตโนมัติ
          หากมี Category นี้อยู่แล้ว ระบบจะเชื่อมไปยังรายการเดิมและเลือกไว้ให้พร้อมเพิ่ม Pattern
        </div>
      )}

      <ActiveField
        checked={draft.isActive}
        onChange={(isActive) => onChange({ ...draft, isActive })}
      />
    </>
  );
}

function ExternalLinkForm({
  draft,
  onChange,
}: {
  draft: CmsHomeCharacter;
  onChange: (draft: CmsHomeCharacter) => void;
}) {
  return (
    <>
      <TextField
        label="ชื่อปุ่มลิงก์ *"
        value={draft.name}
        onChange={(name) =>
          onChange({ ...draft, name, slug: draft.slug || slugify(name) })
        }
        placeholder="เช่น เว็บไซต์บริษัท"
      />

      <AssetField
        label="รูปปุ่มลิงก์ *"
        value={draft.img}
        accept="image/*"
        folder="external-links"
        onChange={(img) => onChange({ ...draft, img })}
      />

      <AssetField
        label="วิดีโอตอน Hover (ไม่ใส่ก็ได้)"
        value={draft.video ?? ""}
        accept="video/mp4,video/webm"
        folder="external-link-videos"
        onChange={(video) => onChange({ ...draft, video })}
      />

      <TextField
        label="URL เว็บไซต์ปลายทาง *"
        value={draft.customUrl ?? ""}
        onChange={(customUrl) => onChange({ ...draft, customUrl })}
        placeholder="เช่น https://example.com"
      />

      <ActiveField
        checked={draft.openInNewTab !== false}
        label="เปิดเว็บไซต์ในแท็บใหม่"
        onChange={(openInNewTab) => onChange({ ...draft, openInNewTab })}
      />

      <ActiveField
        checked={draft.isActive}
        onChange={(isActive) => onChange({ ...draft, isActive })}
      />
    </>
  );
}

function CategoryForm({
  draft,
  onChange,
}: {
  draft: CmsCategory;
  onChange: (draft: CmsCategory) => void;
}) {
  return (
    <>
      <div className={styles.twoColumns}>
        <TextField
          label="ชื่อ Category *"
          value={draft.name}
          onChange={(name) =>
            onChange({ ...draft, name, slug: draft.slug || slugify(name) })
          }
        />
        <TextField
          label="Slug *"
          value={draft.slug}
          onChange={(slug) => onChange({ ...draft, slug })}
          placeholder="เช่น seasonal"
        />
      </div>
      <TextAreaField
        label="รายละเอียด Category"
        value={draft.detail ?? ""}
        onChange={(detail) => onChange({ ...draft, detail })}
      />
      <TextField
        label="Download URL (ไม่ใส่ก็ได้)"
        value={draft.downloadUrl ?? ""}
        onChange={(downloadUrl) => onChange({ ...draft, downloadUrl })}
      />
      <ActiveField
        checked={draft.isActive}
        onChange={(isActive) => onChange({ ...draft, isActive })}
      />
    </>
  );
}

function PatternForm({
  draft,
  onChange,
}: {
  draft: CmsPattern;
  onChange: (draft: CmsPattern) => void;
}) {
  function updateProduct(index: number, product: CmsProduct) {
    const products = draft.products.map((item, itemIndex) =>
      itemIndex === index ? product : item,
    );
    onChange({ ...draft, products });
  }

  function removeProduct(index: number) {
    const products = draft.products.filter((_, itemIndex) => itemIndex !== index);
    onChange({ ...draft, products: sortOrders(products) });
  }

  return (
    <>
      <div className={styles.twoColumns}>
        <TextField
          label="ชื่อ Pattern *"
          value={draft.name}
          onChange={(name) =>
            onChange({ ...draft, name, id: draft.id || slugify(name) })
          }
        />
        <TextField
          label="Pattern ID / URL *"
          value={draft.id}
          onChange={(id) => onChange({ ...draft, id })}
          placeholder="เช่น back-to-school"
        />
      </div>

      <AssetField
        label="รูปหน้าปก Pattern *"
        value={draft.img}
        accept="image/*"
        folder="patterns"
        onChange={(img) => onChange({ ...draft, img })}
      />

      <TextAreaField
        label="รายละเอียดที่แสดงในหน้ารวม Pattern"
        value={draft.detail ?? ""}
        onChange={(detail) => onChange({ ...draft, detail })}
      />
      <TextAreaField
        label="รายละเอียดในหน้าสินค้า"
        value={draft.detailProducts ?? ""}
        onChange={(detailProducts) => onChange({ ...draft, detailProducts })}
      />

      <div className={styles.productEditorHeader}>
        <div>
          <h3>ภาพสินค้าใน Pattern</h3>
          <p>ภาพเหล่านี้จะแสดงเป็นแกลเลอรีในหน้ารายละเอียด</p>
        </div>
        <button
          className={styles.secondaryButton}
          type="button"
          onClick={() =>
            onChange({
              ...draft,
              products: [...draft.products, blankProduct(draft.products.length)],
            })
          }
        >
          + เพิ่มภาพสินค้า
        </button>
      </div>

      <div className={styles.productList}>
        {draft.products.map((product, index) => (
          <div className={styles.productEditor} key={product.id}>
            <div className={styles.productIndex}>{index + 1}</div>
            <div className={styles.productFields}>
              <TextField
                label="ชื่อภาพ/สินค้า"
                value={product.name}
                onChange={(name) => updateProduct(index, { ...product, name })}
              />
              <AssetField
                label="รูปภาพ"
                value={product.img}
                accept="image/*"
                folder="products"
                compact
                onChange={(img) => updateProduct(index, { ...product, img })}
              />
              <ActiveField
                checked={product.isActive}
                label="แสดงภาพนี้"
                onChange={(isActive) => updateProduct(index, { ...product, isActive })}
              />
            </div>
            <button
              className={styles.removeProductButton}
              type="button"
              onClick={() => removeProduct(index)}
            >
              ลบ
            </button>
          </div>
        ))}

        {draft.products.length === 0 && (
          <div className={styles.emptyProducts}>ยังไม่มีภาพสินค้า กด “เพิ่มภาพสินค้า”</div>
        )}
      </div>

      <ActiveField
        checked={draft.isActive}
        onChange={(isActive) => onChange({ ...draft, isActive })}
      />
    </>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={styles.fieldLabel}>
      {label}
      <div className={styles.colorFieldRow}>
        <input
          className={styles.colorInput}
          type="color"
          value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#ffffff"}
          onChange={(event) => onChange(event.target.value)}
        />
        <input
          className={styles.input}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="#ffffff"
        />
      </div>
    </label>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className={styles.fieldLabel}>
      {label}
      <input
        className={styles.input}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={styles.fieldLabel}>
      {label}
      <textarea
        className={styles.textarea}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function ActiveField({
  checked,
  onChange,
  label = "แสดงรายการนี้บนหน้าเว็บ",
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}) {
  return (
    <label className={styles.switchField}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span>{label}</span>
    </label>
  );
}

function AssetField({
  label,
  value,
  onChange,
  accept,
  folder,
  compact = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  accept: string;
  folder: string;
  compact?: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.set("file", file);
      const response = await fetch(`/api/admin/upload?folder=${encodeURIComponent(folder)}`, {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as { assetUrl?: string; error?: string };

      if (!response.ok || !result.assetUrl) {
        throw new Error(result.error || "อัปโหลดไม่สำเร็จ");
      }

      onChange(result.assetUrl);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "อัปโหลดไม่สำเร็จ");
    } finally {
      setUploading(false);
    }
  }

  const isVideo = accept.includes("video");

  return (
    <div className={`${styles.assetField} ${compact ? styles.assetCompact : ""}`}>
      <label className={styles.fieldLabel}>
        {label}
        <input
          className={styles.input}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="URL หรือ path เช่น /image.jpg"
        />
      </label>
      <div className={styles.assetBottom}>
        <label className={styles.uploadButton}>
          {uploading ? "กำลังอัปโหลด..." : "เลือกไฟล์จากเครื่อง"}
          <input type="file" accept={accept} onChange={upload} disabled={uploading} />
        </label>
        {value && (
          <div className={styles.assetPreview}>
            {isVideo ? (
              <video src={value} muted controls={false} />
            ) : (
              <img src={value} alt="ตัวอย่างไฟล์" />
            )}
          </div>
        )}
      </div>
      {uploadError && <small className={styles.uploadError}>{uploadError}</small>}
      <small className={styles.helpText}>อัปโหลดผ่านหน้าหลังบ้านได้ไม่เกิน 4 MB ต่อไฟล์</small>
    </div>
  );
}
