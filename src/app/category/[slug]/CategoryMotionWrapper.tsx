"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "@/app/category/CategoryPage.module.css";

interface Pattern {
  id: string;
  name: string;
  img: string;
  detail?: string;       // สำหรับหน้า pattern list
  detailProducts?: string; // ใช้เฉพาะหน้า PatternGallery/Page
}

interface Category {
  name: string;
  slug: string;
  detail?: string;
  patterns: Pattern[];
}

export default function CategoryMotionWrapper({ category }: { category: Category }) {
  const router = useRouter();

  return (
    <section className={styles.page}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* 🔙 ปุ่มกลับหน้าแรก */}
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}
            style={{
              background: "#333",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "0.95rem",
              transition: "background 0.3s, transform 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.target as HTMLButtonElement).style.background = "#555")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLButtonElement).style.background = "#333")
            }
          >
            🏠 กลับหน้าแรก
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.title}>ลายทั้งหมดของ {category.name}</h1>
          {category.detail && <p className={styles.detail}>{category.detail}</p>}
        </motion.div>

        <div className={styles.grid}>
          {category.patterns.map((p) => (
            <motion.div
              key={p.id}
              className={styles.cardBox}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 900, damping: 20 }}
              onClick={() => router.push(`/category/${category.slug}/${p.id}`)}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={p.img}
                  alt={p.name}
                  width={200}
                  height={200}
                  className={styles.image}
                />
              </div>
              <p className={styles.name}>{p.name}</p>
              {/* ✅ แสดงเฉพาะ detail */}
              {p.detail && <p className={styles.patternDetail}>{p.detail}</p>}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
