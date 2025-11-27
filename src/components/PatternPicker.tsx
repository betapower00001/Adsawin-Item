// src/components/PatternPicker.tsx
import React from "react";

export default function PatternPicker({
  patternsForSelected,
  uploadedExamples,
  onSelect,
}: {
  patternsForSelected: { img: string }[];
  uploadedExamples: string[]; // local sample paths or public urls
  onSelect: (imgUrl: string) => void;
}) {
  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {patternsForSelected.map((p, i) => (
          <img
            key={i}
            src={p.img}
            onClick={() => onSelect(p.img)}
            style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6, cursor: "pointer", border: "2px solid #eee" }}
            alt={`pattern-${i}`}
          />
        ))}

        {uploadedExamples.map((u, i) => (
          <img
            key={`up-${i}`}
            src={u}
            onClick={() => onSelect(u)}
            style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 6, cursor: "pointer", border: "2px solid #eee" }}
            alt={`uploaded-${i}`}
          />
        ))}
      </div>

      <div style={{ marginTop: 8 }}>
        <label style={{ display: "inline-block", padding: "6px 10px", borderRadius: 8, background: "#fafafa", border: "1px solid #ddd", cursor: "pointer" }}>
          อัปโหลดลาย
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;
              const url = URL.createObjectURL(f);
              onSelect(url);
            }}
          />
        </label>
      </div>
    </div>
  );
}
