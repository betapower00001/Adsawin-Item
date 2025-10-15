"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import styles from "./PatternPage.module.css";

interface Product {
  img: string;
  name: string;
}

interface Props {
  products: Product[];
  slug: string; // ✅ เพิ่ม slug
}

export default function PatternCarousel({ products, slug }: Props) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const threshold = 30;

    if ((offset < -threshold || velocity < -500) && currentIndex < products.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else if ((offset > threshold || velocity > 500) && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (offset < -threshold && currentIndex === products.length - 1) {
      // ✅ ถ้าสไลด์สุดท้ายแล้วลากไปขวา -> กลับหน้า Category
      window.location.href = `/category/${slug}`;
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    if (clickX < rect.width / 2) {
      // ✅ คลิกซีกซ้าย → ย้อนกลับ
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    } else {
      // ✅ คลิกซีกขวา → ไปต่อ
      if (currentIndex < products.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        // ✅ ถ้าอยู่ภาพสุดท้าย → กลับหน้า Category
        window.location.href = `/category/${slug}`;
      }
    }
  };

  if (windowWidth === 0) return null;

  return (
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
          {products.map((prod, i) => (
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
                height={window.innerHeight * 0.85}
                className={styles.cardImage}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {currentIndex > 0 && (
        <button
          className={`${styles.navButton} ${styles.prev}`}
          onClick={() => setCurrentIndex(currentIndex - 1)}
        >
          &#10094;
        </button>
      )}

      {currentIndex < products.length - 1 && (
        <button
          className={`${styles.navButton} ${styles.next}`}
          onClick={() => setCurrentIndex(currentIndex + 1)}
        >
          &#10095;
        </button>
      )}

      <div className={styles.dots}>
        {products.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${currentIndex === i ? styles.active : ""}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
