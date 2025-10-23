"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./page.module.css";
import { useState } from "react";

interface Character {
  name: string;
  img: string;
  video?: string;
}

interface Props {
  characters: Character[];
}

export default function CharacterGrid({ characters }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

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
            const slug = item.name
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/\./g, "");

            return (
              <Link key={index} href={`/category/${slug}`}>
                <motion.div
                  className={styles.cardBox}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className={`${styles.imageWrapper} relative`}>
                    {/* Image (พื้นหลังเริ่มต้น) */}
                    <motion.img
                      src={item.img}
                      alt={item.name}
                      className={`${styles.image} absolute inset-0`}
                      initial={{ opacity: 1 }}
                      animate={{ opacity: hovered === index ? 0 : 1 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />

                    {/* Video (เฟดเข้าเมื่อ hover) */}
                    <AnimatePresence>
                      {item.video && hovered === index && (
                        <motion.video
                          key="video"
                          className={`${styles.image} absolute inset-0`}
                          muted
                          loop
                          autoPlay
                          playsInline
                          preload="auto"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                          <source src={item.video} type="video/mp4" />
                        </motion.video>
                      )}
                    </AnimatePresence>
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
