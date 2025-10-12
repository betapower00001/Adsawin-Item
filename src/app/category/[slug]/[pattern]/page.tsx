"use client";

import * as React from "react";
import Image from "next/image";
import { categories } from "@/data/characters";
import { motion } from "framer-motion";
import styles from "./PatternPage.module.css";

interface Params {
  slug: string;
  pattern: string;
}

export default function PatternPage({ params }: { params: Promise<Params> }) {
  const { slug, pattern } = React.use(params);

  const category = categories.find((c) => c.slug === slug);
  const patternData = category?.patterns.find((p) => p.id === pattern);

  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [windowWidth, setWindowWidth] = React.useState(0);

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

  const handleDragEnd = (_: any, info: any) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const threshold = 30;

    if ((offset < -threshold || velocity < -500) && currentIndex < patternData.products.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if ((offset > threshold || velocity > 500) && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // ฟังก์ชันเลื่อนไป card ถัดไปเมื่อคลิก
  const handleClick = () => {
    if (currentIndex < patternData.products.length - 1) {
      setCurrentIndex(currentIndex + 1);
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
          onDragEnd={handleDragEnd}
          animate={{ x: -currentIndex * windowWidth }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {patternData.products.map((prod, i) => (
            <div
              key={i}
              className={styles.card}
              onClick={handleClick} // คลิกเลื่อนไป card ต่อไป
            >
              <Image
                src={prod.img}
                alt={prod.name}
                width={windowWidth}
                height={window.innerHeight * 0.7}
                className={styles.cardImage}
              />
            </div>
          ))}
        </motion.div>

        {/* Prev/Next Buttons */}
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

      {/* Dots Indicator */}
      <div className={styles.dots}>
        {patternData.products.map((_, i) => (
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
