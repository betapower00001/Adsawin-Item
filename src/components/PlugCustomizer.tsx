// src/components/PlugCustomizer.tsx
"use client";

import React, { useState } from "react";
import plugTypes from "../data/plugTypes";
import patterns from "../data/patterns";
import Plug3D from "./Plug3D";
import ColorPicker from "./ColorPicker";
import PlugSelector from "./PlugSelector";
import PatternPicker from "./PatternPicker";
import LayoutPreview from "./LayoutPreview";

interface Props {
  plugId: string; // <<< เปลี่ยนตรงนี้
}

interface CustomizationState {
  topColor: string;
  bottomColor: string;
  switchColor: string;
  patternUrl: string;
  view: "front" | "angle";
}

export default function PlugCustomizer({ plugId }: Props) {
  // ใช้ plugId แทน initialPlugId
  const [selectedPlugId, setSelectedPlugId] = useState<string>(plugId);
  const plug = plugTypes.find((p) => p.id === selectedPlugId)!;

  const initialPattern =
    patterns[selectedPlugId]?.[0]?.img || "";

  const [customization, setCustomization] =
    useState<CustomizationState>({
      topColor: "#ffffff",
      bottomColor: "#eaeaea",
      switchColor: "#00bfff",
      patternUrl: initialPattern,
      view: "angle",
    });

  return (
    <div
      style={{
        display: "flex",
        maxWidth: 1400,
        margin: "auto",
        gap: 30,
        padding: 20,
      }}
    >
      {/* Left: 3D Preview */}
      <div style={{ flex: 2, padding: 20 }}>
        <div
          style={{
            width: "100%",
            height: 520,
            background: "#f2f6fb",
            borderRadius: 12,
            padding: 8,
          }}
        >
          <Plug3D
            modelPath={plug.modelPath}
            patternImg={customization.patternUrl}
            colors={{
              top: customization.topColor,
              bottom: customization.bottomColor,
              switch: customization.switchColor,
            }}
            view={customization.view}
          />
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 12,
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ padding: "8px 12px" }}>
              อัพโหลด LOGO
            </button>
            <button style={{ padding: "8px 12px" }}>
              ได้แบบที่เลือกแล้ว
            </button>
            <button style={{ padding: "8px 12px" }}>
              เรนเดอร์รูป
            </button>
          </div>

          <div>
            <button style={{ padding: "8px 12px" }}>
              ดาวน์โหลดภาพ
            </button>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div
        style={{
          flex: 1,
          padding: 20,
          borderLeft: "1px solid #e1e5ea",
        }}
      >
        <h3>เลือกโมเดล (รุ่น)</h3>
        <PlugSelector
          items={plugTypes}
          selected={selectedPlugId}
          onSelect={(id) => {
            setSelectedPlugId(id);
            const p = patterns[id]?.[0]?.img;
            if (p)
              setCustomization((s) => ({
                ...s,
                patternUrl: p,
              }));
          }}
        />

        <h3 style={{ marginTop: 18 }}>ลวดลาย (Pattern)</h3>
        <PatternPicker
          patternsForSelected={patterns[selectedPlugId] || []}
          uploadedExamples={[
            "/mnt/data/42a50485-da3a-4e68-b62a-d92aa18f63cc.png",
          ]}
          onSelect={(img) =>
            setCustomization((s) => ({
              ...s,
              patternUrl: img,
            }))
          }
        />

        <h3 style={{ marginTop: 18 }}>สีฝาบน</h3>
        <ColorPicker
          label="ฝาบน"
          initialColor={customization.topColor}
          onColorChange={(c) =>
            setCustomization((s) => ({
              ...s,
              topColor: c,
            }))
          }
        />

        <h3>สีฝาล่าง</h3>
        <ColorPicker
          label="ฝาล่าง"
          initialColor={customization.bottomColor}
          onColorChange={(c) =>
            setCustomization((s) => ({
              ...s,
              bottomColor: c,
            }))
          }
        />

        <h3>สีสวิตช์</h3>
        <ColorPicker
          label="สวิตช์"
          initialColor={customization.switchColor}
          onColorChange={(c) =>
            setCustomization((s) => ({
              ...s,
              switchColor: c,
            }))
          }
        />

        <h3 style={{ marginTop: 18 }}>มุมมอง / ดาวน์โหลด</h3>
        <LayoutPreview
          view={customization.view}
          onSetView={(v) =>
            setCustomization((s) => ({ ...s, view: v }))
          }
          onDownload={() => {
            alert("Implement download capture");
          }}
        />
      </div>
    </div>
  );
}
