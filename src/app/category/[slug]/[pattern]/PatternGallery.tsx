/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useParams } from "next/navigation";
import styles from "./PatternGallery.module.css";

interface Product {
  id?: string;
  img: string;
  name: string;
}

interface Props {
  products: Product[];
  name: string;
  detail?: string;
}

function cleanProducts(products: Product[], fallbackName: string) {
  return products
    .filter((product) => typeof product.img === "string" && product.img.trim().length > 0)
    .map((product, index) => ({
      ...product,
      id: product.id || `${index}`,
      img: product.img.trim(),
      name: product.name?.trim() || `${fallbackName} ${index + 1}`,
    }));
}

export default function PatternGallery({ products, name, detail }: Props) {
  const galleryProducts = useMemo(
    () => cleanProducts(products, name),
    [products, name],
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const { slug } = useParams();

  useEffect(() => {
    if (selectedIndex >= galleryProducts.length) {
      setSelectedIndex(0);
    }
  }, [galleryProducts.length, selectedIndex]);

  if (galleryProducts.length === 0) {
    return <div className={styles.galleryContainer}>ไม่มีภาพสำหรับแสดงผล</div>;
  }

  const selectedProduct = galleryProducts[selectedIndex] ?? galleryProducts[0];

  return (
    <div className={styles.galleryContainer}>
      {/* ====== ซ้าย: ปุ่มกลับ + ภาพใหญ่ ====== */}
      <div className={styles.leftPanel}>
        <div className={styles.backButtonWrapper}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(`/category/${slug}`)}
            className={styles.backButton}
          >
            🔙 เลือกลาย
          </motion.button>
        </div>

        <div className={styles.imageWrapper}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedProduct.id}-${selectedProduct.img}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={styles.fadeWrapper}
            >
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                className={styles.mainImage}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                }}
                loading="eager"
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
          {galleryProducts.map((prod, index) => (
            <motion.button
              key={`${prod.id}-${prod.img}`}
              type="button"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`${styles.thumb} ${index === selectedIndex ? styles.active : ""}`}
              onClick={() => index !== selectedIndex && setSelectedIndex(index)}
            >
              <img
                src={prod.img}
                alt={prod.name}
                className={styles.thumbImage}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "block",
                  objectFit: "cover",
                }}
                loading="lazy"
              />
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
