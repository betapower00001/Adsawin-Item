// components/PlugCustomizer.tsx
"use client";

import { useState } from 'react';
import { notFound } from "next/navigation";
import plugTypes from "@/data/plugTypes";
import patterns from "@/data/patterns";

// Components ที่ Import เข้ามา
import Plug3D from "./Plug3D"; 
import ColorPicker from "./ColorPicker"; 
// (สมมติว่าคุณสร้าง PatternSelector.tsx แล้ว)

// State หลักสำหรับสีและลาย (ชื่อคีย์เป็น Color)
interface CustomizationState {
  topColor: string;
  bottomColor: string;
  switchColor: string;
  patternUrl: string;
  // layers: any[];
}

interface PlugCustomizerProps {
  plugId: string; // ID ของปลั๊กที่เลือก
}

export default function PlugCustomizer({ plugId }: PlugCustomizerProps) {
  const plug = plugTypes.find((p) => p.id === plugId);
  if (!plug) return notFound();
  
  const initialPatternUrl = patterns[plugId]?.[0]?.img || '';
  
  const [customization, setCustomization] = useState<CustomizationState>({
    topColor: '#ffffff',
    bottomColor: '#eeeeee',
    switchColor: '#00bfff',
    patternUrl: initialPatternUrl,
  });

  const handleDownload = () => {
      alert("ฟังก์ชันดาวน์โหลดภาพ 3D ถูกเรียกใช้แล้ว! (ต้องใช้โค้ด Three.js ในการจับภาพ)");
  };

  return (
    <div style={{ display: 'flex', maxWidth: '1400px', margin: 'auto', gap: '30px' }}>
      
      {/* -------------------- ส่วนซ้าย: 3D Preview และ Action Bar -------------------- */}
      <div style={{ flex: '2', padding: '20px' }}>
        <div style={{ width: '100%', height: '500px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
          
          <Plug3D 
            modelPath={plug.modelPath} 
            patternImg={customization.patternUrl}
            // *** การแก้ไขโค้ดอยู่ตรงนี้: จัดโครงสร้าง Object ให้ตรงกับ Plug3DProps ***
            colors={{
              top: customization.topColor,
              bottom: customization.bottomColor,
              switch: customization.switchColor,
            }}
          />
        </div>

        {/* Action Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
          <button style={{ padding: '10px' }}>อัพโหลด LOGO</button>
          <button style={{ padding: '10px' }}>ใส่ข้อความ</button>
          <button style={{ padding: '10px' }}>เปลี่ยนมุมมอง</button>
          <button style={{ padding: '10px', backgroundColor: '#333', color: 'white' }} onClick={handleDownload}>
             ดาวน์โหลดภาพ
          </button>
        </div>
      </div>
      
      {/* -------------------- ส่วนขวา: Control Panel -------------------- */}
      <div style={{ flex: '1', padding: '20px', borderLeft: '1px solid #ccc' }}>
        <h2>แผงควบคุมการออกแบบ</h2>
        
        {/* 1. เลือกสีฝาปลั๊ก (บน-ล่าง) */}
        <h3>เลือกสีฝาปลั๊ก</h3>
        <ColorPicker 
            label="ฝาบน" 
            initialColor={customization.topColor} 
            onColorChange={(c) => setCustomization(prev => ({...prev, topColor: c}))} 
        />
        <ColorPicker 
            label="ฝาล่าง" 
            initialColor={customization.bottomColor} 
            onColorChange={(c) => setCustomization(prev => ({...prev, bottomColor: c}))} 
        />

        {/* 2. เลือกสีสวิตช์ On-Off */}
        <h3>เลือกสีสวิตช์</h3>
        <ColorPicker 
            label="สวิตช์" 
            initialColor={customization.switchColor} 
            onColorChange={(c) => setCustomization(prev => ({...prev, switchColor: c}))} 
        />
        
        {/* 3. ปุ่ม Generate Keyshot */}
        <div style={{ marginTop: '40px' }}>
             <button style={{ padding: '10px 20px', backgroundColor: 'teal', color: 'white' }}>
                 เจนภาพ Keyshot
             </button>
        </div>
      </div>
    </div>
  );
}