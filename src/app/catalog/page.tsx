"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CatalogPage() {
  const pdfUrl = "/ADSAWIN-MENU-2025.pdf"; // ✅ PDF ของคุณใน public/files/

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f9fafb, #ffffff)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      {/* 🔹 หัวข้อ */}
      <h1
        style={{
          fontSize: "28px",
          marginBottom: "16px",
          color: "#111827",
          textAlign: "center",
        }}
      >
        แคตตาล็อกสินค้า (PDF)
      </h1>

      {/* 🔹 ปุ่มกลับ & ดาวน์โหลด */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <Link
          href="/"
          style={{
            background: "#6b7280",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          ← กลับหน้าหลัก
        </Link>

        <a
          href={pdfUrl}
          download
          style={{
            background: "#10b981",
            color: "white",
            padding: "8px 16px",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          ⬇️ ดาวน์โหลดไฟล์
        </a>
      </div>

      {/* 🔹 แสดง PDF แบบฝังเต็มหน้า */}
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          flex: 1,
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        }}
      >
        <iframe
          src={pdfUrl}
          width="100%"
          height="100%"
          style={{ minHeight: "85vh", border: "none" }}
        />
      </div>
    </motion.div>
  );
}
