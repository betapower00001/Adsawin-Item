"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import styles from "./PatternGallery.module.css";

interface Product {
  img: string;
  name: string;
}

interface Props {
  products: Product[];
  name: string;
  detail?: string;
}

export default function PatternGallery({ products, name, detail }: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { slug } = useParams();

  if (!products || products.length === 0) {
    return <div className={styles.galleryContainer}>ไม่มีภาพสำหรับแสดงผล</div>;
  }

  return (
    <div className={styles.galleryContainer}>
      {/* ====== ซ้าย: ปุ่มกลับ + ภาพใหญ่ ====== */}
      <div className={styles.leftPanel}>
        {/* 🔙 ปุ่มกลับอยู่เหนือภาพใหญ่ */}
        <div className={styles.backButtonWrapper}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(`/category/${slug}`)}
            className={styles.backButton}
          >
            🔙 กลับไปหน้าเลือกลาย.
          </motion.button>
        </div>

        {/* ====== ภาพใหญ่ ====== */}
        <div className={styles.imageWrapper}>
          <AnimatePresence mode="wait">
            <motion.div
              key={products[selectedIndex].img}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={styles.fadeWrapper}
            >
              <Image
                src={products[selectedIndex].img}
                alt={products[selectedIndex].name}
                fill
                className={styles.mainImage}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ====== ขวา: ข้อมูล + thumbnails ====== */}
      <div className={styles.rightPanel}>
        <div className={styles.textSection}>
          <h2 className={styles.title}>{name}</h2>
          {detail && <p className={styles.detail}>{detail}</p>}
        </div>

        <div className={styles.thumbGrid}>
          {products.map((prod, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`${styles.thumb} ${i === selectedIndex ? styles.active : ""}`}
              onClick={() => i !== selectedIndex && setSelectedIndex(i)}
            >
              <Image
                src={prod.img}
                alt={prod.name}
                fill
                className={styles.thumbImage}
                sizes="200px"
                quality={90}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
