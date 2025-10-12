import PatternCarousel from './PatternCarousel';
import { categories } from '@/data/characters';
import styles from './PatternPage.module.css';

interface Params {
  slug: string;
  pattern: string;
}

export default function PatternPage({ params }: { params: Params }) {
  const { slug, pattern } = params;
  const category = categories.find(c => c.slug === slug) || null;
  const patternData = category?.patterns.find(p => p.id === pattern) || null;

  if (!category || !patternData) {
    return (
      <div className={styles.notFound}>
        <h1>ไม่พบลายนี้</h1>
        <p>ลองตรวจสอบ URL หรือลองเลือกลายใหม่อีกครั้ง</p>
      </div>
    );
  }

  return (
    <div className={styles.patternPage}>
      <h1 className={styles.title}>
        {patternData.name} <span>({category.name})</span>
      </h1>
      <PatternCarousel products={patternData.products} />
    </div>
  );
}
