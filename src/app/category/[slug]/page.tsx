import { categories } from "@/data/characters";
import CategoryMotionWrapper from "./CategoryMotionWrapper";

interface Params {
  slug: string;
}

interface CategoryPageProps {
  params: Promise<Params>; // Note: Promise
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params; // ต้อง await
  const category = categories.find((c) => c.slug === slug) || null;

  if (!category) {
    return (
      <div style={{ padding: 50, textAlign: "center" }}>
        ไม่พบหมวดหมู่
      </div>
    );
  }

  return <CategoryMotionWrapper category={category} />;
}
