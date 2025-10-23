"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import styles from "./page.module.css";

interface Character {
  name: string;
  img: string;
  video?: string;
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
            const slug = item.name
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/\./g, "");

            return (
              <Link key={index} href={`/category/${slug}`}>
                <motion.div
                  className={styles.cardBox}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 900, damping: 20 }}
                >
                  <div className={styles.imageWrapper}>
                    {item.video ? (
                      <video
                        className={styles.image}
                        poster={item.img} // ✅ แสดงภาพนิ่งก่อนเล่น
                        muted
                        loop
                        preload="metadata"
                        onMouseEnter={(e) => {
                          const video = e.currentTarget;
                          video.currentTime = 0;
                          video.play().catch(() => {}); // ✅ ป้องกัน AbortError
                        }}
                        onMouseLeave={(e) => {
                          const video = e.currentTarget;
                          video.pause();
                          video.load(); // ✅ โหลดใหม่เพื่อกลับไปแสดง poster
                        }}
                      >
                        <source src={item.video} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={item.img}
                        alt={item.name}
                        className={styles.image}
                      />
                    )}
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
