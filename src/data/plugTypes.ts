// data/plugTypes.ts

export interface PlugType {
  id: string;
  name: string;
  thumb?: string;
  modelPath: string; // <--- เพิ่ม Path สำหรับไฟล์ GLB
}

export const plugTypes: PlugType[] = [
  { 
    id: "universal", 
    name: "Universal", 
    thumb: "/plugs/universal/thumb.png",
    modelPath: "/models/plug/powerstrip_thai.glb" 
  },
  { 
    id: "thai", 
    name: "Thai", 
    thumb: "/plugs/thai/thumb.png",
    modelPath: "/models/plug/powerstrip_thai.glb" 
  },
  { id: "eu", name: "EU", thumb: "/2_0.png", modelPath: "/models/plug/powerstrip_thai.glb" },
  { id: "us", name: "US", thumb: "/2_0.png", modelPath: "/models/plug/powerstrip_thai.glb" },
  { id: "uk", name: "UK", thumb: "/2_0.png", modelPath: "/models/plug/powerstrip_thai.glb" },
];

export default plugTypes;