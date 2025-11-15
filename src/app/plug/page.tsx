import Link from "next/link";
import styles from "./plug.module.css";
import plugTypes from "@/data/plugTypes";


export default function PlugTypePage() {
return (
<div className={styles.container}>
<h1 className={styles.title}>เลือกชนิดปลั๊กไฟ</h1>
<div className={styles.grid}>
{plugTypes.map((type) => (
<Link key={type.id} href={`/plug/${type.id}`} className={styles.card}>
<img src={type.img} alt={type.name} />
<p>{type.name}</p>
</Link>
))}
</div>
</div>
);
}