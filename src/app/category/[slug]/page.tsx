import { findCategoryBySlug, getCmsData } from "@/lib/cms";
import CategoryMotionWrapper from "./CategoryMotionWrapper";

interface Params {
  slug: string;
}

interface CategoryPageProps {
  params: Promise<Params>;
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const data = await getCmsData();
  const category = findCategoryBySlug(data, slug);

  if (!category || !category.isActive) {
    return (
      <div style={{ padding: 50, textAlign: "center" }}>
        ไม่พบหมวดหมู่
      </div>
    );
  }

  const visibleCategory = {
    ...category,
    patterns: category.patterns.filter((pattern) => pattern.isActive),
  };

  return <CategoryMotionWrapper category={visibleCategory} />;
}
