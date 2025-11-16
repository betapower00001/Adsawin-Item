import Link from "next/link";
import { notFound } from "next/navigation";

import plugTypes from "@/data/plugTypes";
import patterns from "@/data/patterns";

import styles from "./type.module.css";

interface PageProps {
  params: {
    type: string;
  };
}

export default function PlugPatternSelectPage({ params }: PageProps) {
  const { type } = params;

  // ตรวจว่ามีปลั๊กชนิดนี้จริงหรือไม่
  const plug = plugTypes.find((p) => p.id === type);
  if (!plug) return notFound();

  // ดึงลายทั้งหมดของปลั๊กชนิดนี้
  const availablePatterns = patterns[type] || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>เลือกลายสำหรับ {plug.name}</h1>

      <div className={styles.grid}>
        {availablePatterns.map((item) => (
          <Link
            key={item.id}
            href={`/plug/${type}/${item.id}`}
            className={styles.card}
          >
            <img
              src={item.preview}
              alt={item.name}
              className={styles.thumb}
            />
            <div className={styles.name}>{item.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
