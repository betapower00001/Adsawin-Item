"use client";

import Link from "next/link";
import plugTypes from "@/data/plugTypes";
import styles from "./typeList.module.css";

export default function PlugTypeListPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>เลือกชนิดปลั๊ก</h1>

      <div className={styles.grid}>
        {plugTypes.map((plug) => (
          <Link
            key={plug.id}
            href={`/plug/${plug.id}`}
            className={styles.card}
          >
            <img
              src={plug.thumb}
              className={styles.thumb}
              alt={plug.name}
            />
            <div className={styles.name}>{plug.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
