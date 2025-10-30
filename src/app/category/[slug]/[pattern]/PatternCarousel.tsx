"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./PatternPage.module.css";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface Props {
  products: Product[];
  slug: string;
}

export default function PatternGallery({ products, slug }: Props) {
  if (!products || products.length === 0) {
    return (
      <div className={styles.notFound}>
        <h1>ไม่พบลายที่ต้องการ</h1>
        <p>กรุณากลับไปเลือกหมวดหมู่อีกครั้ง</p>
      </div>
    );
  }

  return (
    <motion.section
      className={styles.patternPage}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className={styles.title}>
        ลายจากหมวด <span>{slug}</span>
      </h2>

      <div className={styles.galleryGrid}>
        {products.map((item) => (
          <motion.div
            key={item.id}
            className={styles.card}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.imageWrapper}>
              <Image
                src={item.image}
                alt={item.name}
                width={800}
                height={600}
                className={styles.cardImage}
                priority
              />
            </div>
            <div className={styles.cardContent}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
