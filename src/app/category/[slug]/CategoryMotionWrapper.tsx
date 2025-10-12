"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/category/CategoryPage.module.css";

interface Category {
  name: string;
  slug: string;
  patterns: { id: string; name: string; img: string }[];
}

export default function CategoryMotionWrapper({ category }: { category: Category }) {
  return (
    <section className={styles.page}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ลายทั้งหมดของ {category.name}
        </motion.h1>

        <div className={styles.grid}>
          {category.patterns.map((p) => (
            <Link key={p.id} href={`/category/${category.slug}/${p.id}`}>
              <motion.div
                className={styles.cardBox}
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 900, damping: 20 }}
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
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
