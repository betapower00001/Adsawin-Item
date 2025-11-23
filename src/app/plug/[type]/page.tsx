// app/plug/[type]/page.tsx
import { notFound } from "next/navigation";
import plugTypes from "@/data/plugTypes";
import PlugCustomizer from "@/components/PlugCustomizer";

interface PageProps {
  params: { type: string };
}

// ✅ Next.js 13.4+ ต้องเป็น async function
export default async function PlugMainCustomizerPage({ params }: PageProps) {
  // ใช้ destructure + await ตาม App Router ใหม่
  const { type } = await params;

  // ตรวจสอบค่า type
  if (!type) return notFound();

  // ตรวจสอบ plug
  const plug = plugTypes.find(p => p.id === type);
  if (!plug) return notFound();

  // ส่งค่าไป Client Component
  return <PlugCustomizer plugId={type} />;
}
