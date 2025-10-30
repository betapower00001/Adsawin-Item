"use client";

import React from "react";
import PatternGallery from "./PatternGallery";
import { categories } from "@/data/characters";

export default function PatternPage({
  params: paramsPromise,
}: {
  params: Promise<{ slug: string; pattern: string }>;
}) {
  // 🔹 ใช้ React.use() unwrap params
  const params = React.use(paramsPromise);

  // 🔹 หา category และ pattern ที่ตรงกับพารามิเตอร์
  const category = categories.find((c) => c.slug === params.slug);
  const pattern = category?.patterns.find((p) => p.id === params.pattern);

  // 🔹 ถ้าไม่พบ
  if (!category || !pattern)
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

  // ✅ ใช้ detailProducts ถ้ามี, ถ้าไม่มีให้ fallback ไปใช้ detail เดิม
  const detailText = pattern.detailProducts ?? pattern.detail ?? "";

  return (
    <PatternGallery
      products={pattern.products}
      name={pattern.name}
      detail={detailText}
    />
  );
}
