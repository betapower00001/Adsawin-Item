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
        {/* 🔹 ส่วนหัวมีภาพอยู่ข้างหน้า */}
        <motion.div
          className={styles.titleWithIcon}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img src="/Icon-what-your.png" alt="หมวดหมู่" className={styles.titleIcon} />
          <h1 className={styles.title}>What Your Vibe?</h1>
        </motion.div>

        {/* 🔹 กริดทั้งหมด */}
        <div className={styles.grid}>
          {characters.map((item, index) => {
            const slug = item.name
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/\./g, "");

            const isBottomTwo =
              index === characters.length - 1 || index === characters.length - 2;

            return (
              <Link key={index} href={`/category/${slug}`}>
                <motion.div
                  className={`${styles.cardBox} ${isBottomTwo ? styles.largeCard : ""}`}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className={styles.imageWrapper}>
                    <motion.img
                      src={item.img}
                      alt={item.name}
                      className={styles.image}
                      initial={{ opacity: 1 }}
                      animate={{
                        opacity: item.video && hovered === index ? 0 : 1,
                        scale: !item.video && hovered === index ? 1.05 : 1,
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />

                    <AnimatePresence>
                      {item.video && hovered === index && (
                        <motion.video
                          key="video"
                          className={styles.image}
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
