"use client";

import { use, useRef, useState, useEffect } from "react";
import patterns from "@/data/patterns";
import plugTypes from "@/data/plugTypes";
import styles from "./preview.module.css";

interface PlugType {
  id: string;
  name: string;
  baseImg: string;
}

interface PatternType {
  id: string;
  name: string;
  img: string;
}

interface PreviewPageProps {
  params: Promise<{
    type: string;
    pattern: string;
  }>;
}

export default function PreviewPage({ params }: PreviewPageProps) {

  // ⭐ Unwrap dynamic route params แบบใหม่ Next.js 15.5+
  const { type, pattern } = use(params);

  const plug: PlugType | undefined = plugTypes.find((p) => p.id === type);
  const pat: PatternType | undefined =
    (patterns[type] || []).find((p) => p.id === pattern);

  // ------------------------- (โค้ดที่เหลือของคุณ) -------------------------
  const [logo, setLogo] = useState<string | null>(null);
  const [logoPos, setLogoPos] = useState({ x: 100, y: 100 });
  const [dragLogo, setDragLogo] = useState(false);

  const [text, setText] = useState("");
  const [textPos, setTextPos] = useState({ x: 150, y: 250 });
  const [dragText, setDragText] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setLogo(url);
  };

  const logoDown = () => setDragLogo(true);
  const logoUp = () => setDragLogo(false);
  const textDown = () => setDragText(true);
  const textUp = () => setDragText(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const box = previewRef.current?.getBoundingClientRect();
    if (!box) return;

    if (dragLogo) {
      setLogoPos({
        x: e.clientX - box.left - 60,
        y: e.clientY - box.top - 60,
      });
    }

    if (dragText) {
      setTextPos({
        x: e.clientX - box.left - 40,
        y: e.clientY - box.top - 10,
      });
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setDragLogo(false);
      setDragText(false);
    };

    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  const downloadImage = async () => {
    if (!plug || !pat) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const base = new Image();
    const overlay = new Image();
    const logoImg = new Image();

    base.crossOrigin = "anonymous";
    overlay.crossOrigin = "anonymous";
    logoImg.crossOrigin = "anonymous";

    base.src = plug.baseImg;
    overlay.src = pat.img;
    if (logo) logoImg.src = logo;

    await new Promise<void>((res) => (base.onload = () => res()));
    await new Promise<void>((res) => (overlay.onload = () => res()));
    if (logo) await new Promise<void>((res) => (logoImg.onload = () => res()));

    canvas.width = base.width;
    canvas.height = base.height;

    ctx.drawImage(base, 0, 0);
    ctx.drawImage(overlay, 0, 0);

    if (logo) {
      ctx.drawImage(logoImg, logoPos.x, logoPos.y, 120, 120);
    }

    if (text.trim() !== "") {
      ctx.font = "48px sans-serif";
      ctx.fillStyle = "#000";
      ctx.fillText(text, textPos.x, textPos.y);
    }

    const link = document.createElement("a");
    link.download = "plug-preview.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>
          {plug?.name} / {pat?.name}
        </h2>

        <div
          className={styles.previewBox}
          ref={previewRef}
          onMouseMove={handleMouseMove}
          onMouseUp={() => {
            logoUp();
            textUp();
          }}
        >
          <img src={plug?.baseImg} className={styles.base} alt="base" />
          <img src={pat?.img} className={styles.pattern} alt="pattern" />

          {logo && (
            <img
              src={logo}
              className={styles.logo}
              onMouseDown={logoDown}
              style={{ left: logoPos.x, top: logoPos.y }}
              alt="logo"
            />
          )}

          {text.trim() !== "" && (
            <div
              className={styles.textLayer}
              onMouseDown={textDown}
              style={{ left: textPos.x, top: textPos.y }}
            >
              {text}
            </div>
          )}
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        <div style={{ marginTop: "20px" }}>
          <input type="file" accept="image/*" onChange={handleUpload} />
          <input
            className={styles.textInput}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="พิมพ์ข้อความที่นี่"
          />
          <button className={styles.downloadBtn} onClick={downloadImage}>
            ดาวน์โหลดรูปภาพ
          </button>
        </div>
      </div>
    </div>
  );
}
