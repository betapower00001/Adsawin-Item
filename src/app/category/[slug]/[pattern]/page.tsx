import PatternGallery from "./PatternGallery";
import { findCategoryBySlug, getCmsData } from "@/lib/cms";

export const dynamic = "force-dynamic";

type GalleryProduct = {
  id?: string;
  img: string;
  name: string;
};

function toGalleryProducts(
  pattern: {
    rowId?: string;
    name: string;
    img: string;
    products: Array<{
      id?: string;
      name?: string;
      img?: string;
      isActive?: boolean;
      sortOrder?: number;
    }>;
  },
): GalleryProduct[] {
  const products = [...(pattern.products ?? [])]
    .sort((a, b) => Number(a.sortOrder ?? 0) - Number(b.sortOrder ?? 0))
    .filter((product) => product.isActive !== false && Boolean(product.img?.trim()))
    .map((product, index) => ({
      id: product.id || `${pattern.rowId ?? "pattern"}-product-${index}`,
      name: product.name?.trim() || `${pattern.name} ${index + 1}`,
      img: product.img?.trim() ?? "",
    }));

  if (products.length > 0) {
    return products;
  }

  // ถ้ายังไม่ได้เพิ่มรูปสินค้า ให้ใช้รูปหน้าปก Pattern เป็น fallback
  if (pattern.img?.trim()) {
    return [
      {
        id: pattern.rowId,
        name: pattern.name,
        img: pattern.img.trim(),
      },
    ];
  }

  return [];
}

export default async function PatternPage({
  params,
}: {
  params: Promise<{ slug: string; pattern: string }>;
}) {
  const resolvedParams = await params;
  const data = await getCmsData();
  const category = findCategoryBySlug(data, resolvedParams.slug);
  const pattern = category?.patterns.find(
    (item) => item.id === resolvedParams.pattern && item.isActive,
  );

  if (!category || !category.isActive || !pattern) {
    return (
      <div
        style={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          color: "#666",
        }}
      >
        ไม่พบลายนี้
      </div>
    );
  }

  const detailText = pattern.detailProducts ?? pattern.detail ?? "";
  const products = toGalleryProducts(pattern);

  return (
    <PatternGallery
      products={products}
      name={pattern.name}
      detail={detailText}
    />
  );
}
