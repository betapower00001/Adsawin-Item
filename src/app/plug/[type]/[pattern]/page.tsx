"use client";

import { notFound } from "next/navigation";
import { useState } from "react";

import plugTypes from "@/data/plugTypes";
import patterns from "@/data/patterns";

import styles from "./preview.module.css";

interface PageProps {
  params: {
    type: string;
    pattern: string;
  };
}

export default function PlugPreviewPage({ params }: PageProps) {
  const { type, pattern } = params;

  // ตรวจปลั๊ก
  const plug = plugTypes.find((p) => p.id === type);
  if (!plug) return notFound();

  // ตรวจลายที่เลือก
  const patternList = patterns[type] || [];
  const pat = patternList.find((p) => p.id === pattern);
  if (!pat) return notFound();

  // ใช้ภาพ preview ของลาย — ซึ่งเป็น "ปลั๊ก + ลาย"
  const previewImg = pat.preview;

  // ใช้ด้านบนในการดาวน์โหลด
  const downloadImage = () => {
    const a = document.createElement("a");
    a.href = previewImg;
    a.download = `${type}-${pattern}.png`;
    a.click();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {plug.name} / {pat.name}
      </h1>

      <div className={styles.previewBox}>
        <img src={previewImg} className={styles.preview} alt="preview" />
      </div>

      <button className={styles.downloadBtn} onClick={downloadImage}>
        ดาวน์โหลดรูปภาพ
      </button>
    </div>
  );
}
