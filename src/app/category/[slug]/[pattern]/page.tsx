"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { categories } from "@/data/characters";
import styles from "./PatternPage.module.css";

// SSR-safe
export function handleCategory(slug: string, pattern: string) {
  const category = categories.find((c) => c.slug === slug) || null;
  const patternData = category?.patterns.find((p) => p.id === pattern) || null;
  return { category, patternData };
}

interface PatternPageProps {
  params: Promise<{ slug: string; pattern: string }>;
}

export default function PatternPage({ params }: PatternPageProps) {
  const [category, setCategory] = React.useState<any>(null);
  const [patternData, setPatternData] = React.useState<any>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);

  // unwrap params
  React.useEffect(() => {
    async function loadParams() {
      const { slug, pattern } = await params;
      const { category, patternData } = handleCategory(slug, pattern);
      setCategory(category);
      setPatternData(patternData);
    }
    loadParams();
  }, [params]);

  // responsive
  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!category || !patternData || windowWidth === 0) {
    return (
      <div className={styles.notFound}>
        <h1>ไม่พบลายนี้</h1>
        <p>ลองตรวจสอบ URL หรือลองเลือกลายใหม่อีกครั้ง</p>
      </div>
    );
  }

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const threshold = 30;

    if ((offset < -threshold || velocity < -500) && currentIndex < patternData.products.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if ((offset > threshold || velocity > 500) && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging) return;
    const clickX = e.nativeEvent.offsetX;
    if (clickX < windowWidth / 2) {
      if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    } else {
      if (currentIndex < patternData.products.length - 1) setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className={styles.patternPage}>
      <h1 className={styles.title}>
        {patternData.name} <span>({category.name})</span>
      </h1>

      <div className={styles.carouselWrapper}>
        <motion.div
          className={styles.carouselInner}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={handleDragEnd}
          animate={{ x: -currentIndex * windowWidth }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <AnimatePresence initial={false}>
            {patternData.products.map((prod: any, i: number) => (
              <motion.div
                key={i}
                className={styles.card}
                onClick={handleClick}
                initial={{ opacity: 0.7, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.7, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={prod.img}
                  alt={prod.name}
                  width={windowWidth}
                  height={window.innerHeight * 0.7}
                  className={styles.cardImage}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {currentIndex > 0 && (
          <button className={`${styles.navButton} ${styles.prev}`} onClick={() => setCurrentIndex(currentIndex - 1)}>
            &#10094;
          </button>
        )}
        {currentIndex < patternData.products.length - 1 && (
          <button className={`${styles.navButton} ${styles.next}`} onClick={() => setCurrentIndex(currentIndex + 1)}>
            &#10095;
          </button>
        )}
      </div>

      <div className={styles.dots}>
        {patternData.products.map((_: any, i: number) => (
          <span
            key={i}
            className={`${styles.dot} ${currentIndex === i ? styles.active : ""}`}
            onClick={() => setCurrentIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}
