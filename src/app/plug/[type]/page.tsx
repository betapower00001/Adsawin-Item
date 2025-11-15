import Link from "next/link";
import patterns from "@/data/patterns";
import plugTypes from "@/data/plugTypes";
import styles from "./type.module.css";

interface Props {
  params: Promise<{ type: string }>;
}

export default async function PatternSelectPage({ params }: Props) {
  const { type } = await params;

  const plug = plugTypes.find((p) => p.id === type);
  const availablePatterns = patterns[type] || [];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>เลือกลายสำหรับ: {plug?.name}</h1>

      <div className={styles.grid}>
        {availablePatterns.map((pt) => (
          <Link
            key={pt.id}
            href={`/plug/${type}/${pt.id}`}
            className={styles.card}
          >
            <img src={pt.img} alt={pt.name} />
            <p>{pt.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
