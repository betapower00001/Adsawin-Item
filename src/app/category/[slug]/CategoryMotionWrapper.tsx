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
        {/* 🔙 ปุ่มกลับหน้าแรก (Glass + Glow Style) */}
        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/")}

            style={{
              fontFamily: "'Anuphan', sans-serif",
              padding: "12px 28px",
              borderRadius: "14px",
              fontWeight: 600,
              fontSize: "1.05rem",
              cursor: "pointer",
              border: "1px solid rgba(255, 255, 255, 0.35)",
              backdropFilter: "blur(14px)",
              background: "rgba(255, 255, 255, 0.12)",
              color: "#3b3737ff",
              letterSpacing: "0.3px",
              transition: "all 0.25s ease",
              boxShadow:
                "0 8px 25px rgba(155, 120, 255, 0.35), inset 0 0 0 0 rgba(255,255,255,0.4)",
            }}

            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.18)";
              (e.target as HTMLButtonElement).style.border = "1px solid rgba(255, 255, 255, 0.6)";
              (e.target as HTMLButtonElement).style.boxShadow =
                "0 10px 28px rgba(155, 120, 255, 0.45), inset 0 0 12px rgba(255,255,255,0.5)";
            }}

            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.12)";
              (e.target as HTMLButtonElement).style.border =
                "1px solid rgba(255, 255, 255, 0.35)";
              (e.target as HTMLButtonElement).style.boxShadow =
                "0 8px 25px rgba(155, 120, 255, 0.35), inset 0 0 0 0 rgba(255,255,255,0.4)";
            }}
          >
            🏠 หน้าแรก
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
