"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useState } from "react";
import { splitHomeCharacters } from "@/lib/homeCharacterOrder";
import type { CmsHomeCharacter } from "@/types/cms";
import styles from "./page.module.css";

interface Props {
  characters: CmsHomeCharacter[];
}

function getHref(item: CmsHomeCharacter) {
  if (item.linkType === "catalog") {
    return item.customUrl || "/catalog";
  }

  if (item.linkType === "custom") {
    return item.customUrl || "/";
  }

  return `/category/${item.slug}`;
}

function isExternalUrl(value: string) {
  return /^(https?:\/\/|mailto:|tel:)/i.test(value);
}

function CardLink({
  item,
  fixed,
  children,
}: {
  item: CmsHomeCharacter;
  fixed: boolean;
  children: ReactNode;
}) {
  const href = getHref(item);
  const className = fixed ? styles.fixedLink : styles.regularLink;
  const openInNewTab = item.openInNewTab === true;

  if (isExternalUrl(href)) {
    return (
      <a
        className={className}
        href={href}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      className={className}
      href={href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  );
}

export default function CharacterGrid({ characters }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { regularCharacters, bottomButtons } = splitHomeCharacters(characters);

  function renderCard(item: CmsHomeCharacter, fixed: boolean) {
    const isHovered = hoveredId === item.id;

    return (
      <motion.div
        className={`${styles.cardBox} ${
          fixed ? styles.fixedCard : styles.regularCard
        }`}
        whileHover={{ y: fixed ? -4 : -6, scale: fixed ? 1.015 : 1.025 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onMouseEnter={() => setHoveredId(item.id)}
        onMouseLeave={() => setHoveredId(null)}
      >
        <div
          className={`${styles.imageWrapper} ${
            fixed ? styles.fixedImageWrapper : ""
          }`}
        >
          <motion.img
            src={item.img}
            alt={item.name}
            className={styles.image}
            initial={{ opacity: 1 }}
            animate={{
              opacity: item.video && isHovered ? 0 : 1,
              scale: !item.video && isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />

          <AnimatePresence>
            {item.video && isHovered && (
              <motion.video
                key="video"
                className={styles.image}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <source src={item.video} type="video/mp4" />
              </motion.video>
            )}
          </AnimatePresence>
        </div>

        {fixed ? (
          <>
            <div className={styles.fixedTextGroup}>
              <h6>{item.name}</h6>
            </div>

            <span className={styles.arrowIcon} aria-hidden="true">
              ›
            </span>
          </>
        ) : (
          <h6>{item.name}</h6>
        )}
      </motion.div>
    );
  }

  return (
    <section className={styles.page}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className={styles.titleWithIcon}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src="/Icon-what-your.png"
            alt="หมวดหมู่"
            className={styles.titleIcon}
          />
          <h1 className={styles.title}>ปลั๊กของคุณเป็นแนวไหน?</h1>
        </motion.div>

        <div className={styles.grid}>
          {regularCharacters.map((item) => (
            <CardLink item={item} fixed={false} key={item.id}>
              {renderCard(item, false)}
            </CardLink>
          ))}
        </div>

        <div className={styles.fixedGrid}>
          {bottomButtons.map((item) => (
            <CardLink item={item} fixed key={item.id}>
              {renderCard(item, true)}
            </CardLink>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
