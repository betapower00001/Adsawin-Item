// src/components/LayoutPreview.tsx
import React from "react";

export default function LayoutPreview({
  view,
  onSetView,
  onDownload,
}: {
  view: "front" | "angle";
  onSetView: (v: "front" | "angle") => void;
  onDownload: () => void;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => onSetView("front")} style={{ padding: 8, background: view === "front" ? "#0b76d1" : "#fff", color: view === "front" ? "#fff" : "#000" }}>
          หน้า
        </button>
        <button onClick={() => onSetView("angle")} style={{ padding: 8, background: view === "angle" ? "#0b76d1" : "#fff", color: view === "angle" ? "#fff" : "#000" }}>
          มุมเอียง
        </button>
      </div>

      <div>
        <button onClick={onDownload} style={{ padding: "8px 12px" }}>ดาวน์โหลดภาพ</button>
      </div>
    </div>
  );
}
