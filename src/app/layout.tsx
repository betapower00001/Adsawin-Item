import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import "./globals.css";

const anuphan = Anuphan({
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-anuphan",
  display: "swap", // ✅ ทำให้แสดงฟอนต์ทันทีแม้ยังโหลดไม่ครบ
});

export const metadata: Metadata = {
  title: "Adsawin",
  description: "เลือกปลั๊กที่ใช่ ลายที่ชอบ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={anuphan.className}>{children}</body>
    </html>
  );
}
