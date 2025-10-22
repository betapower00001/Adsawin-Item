"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./page.module.css";

interface Character {
  name: string;
  img: string;
}

interface Props {
  characters: Character[];
}

export default function CharacterGrid({ characters }: Props) {
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
          เลือกหมวดหมู่
        </motion.h1>

        <div className={styles.grid}>
          {characters.map((item, index) => {
            const slug = item.name.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "");
            return (
              <Link key={index} href={`/category/${slug}`}>
                <motion.div
                  className={styles.cardBox}
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 900, damping: 20 }}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={1024}       // ✅ ใช้ขนาดต้นฉบับ
                      height={1536}
                      quality={100}      // ✅ บังคับไม่บีบภาพ
                      priority           // ✅ ให้โหลดภาพชัดก่อน
                      className={styles.image}
                      sizes="(max-width: 768px) 100vw, 25vw"  // ✅ ช่วยให้ภาพเลือกขนาดเหมาะกับจอ
                    />
                  </div>
                  <h6>{item.name}</h6>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
