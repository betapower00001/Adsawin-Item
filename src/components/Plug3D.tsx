"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MAT_NAMES = {
  DECAL: "USER_DESIGN_DECAL",
  TOP: "TOP_COVER_MAT",
  BOTTOM: "BOTTOM_COVER_MAT",
  SWITCH: "SWITCH_MAT",
};

interface Plug3DProps {
  modelPath: string;
  patternImg: string;
  colors: { top: string; bottom: string; switch: string };
  logoImg?: string | null;
  view?: "front" | "angle";
}

export default function Plug3D({
  modelPath,
  patternImg,
  colors,
  logoImg,
  view = "angle",
}: Plug3DProps) {
  // ✅ แปลง path เป็น URL browser-friendly
  const gltf = useGLTF(new URL(modelPath, import.meta.url).href);

  // โหลด pattern
  const patternTexture = useLoader(
    THREE.TextureLoader,
    patternImg || "/images/empty.png"
  ) as THREE.Texture;
  if (patternTexture) patternTexture.flipY = false;

  // โหลด logo
  const logoTexture = logoImg
    ? useLoader(THREE.TextureLoader, logoImg)
    : null;

  const topCoverRef = useRef<THREE.Mesh | null>(null);
  const logoRef = useRef<THREE.Mesh | null>(null);
  const [dragging, setDragging] = useState(false);

  // Apply colors & pattern + save topCover ref
  useEffect(() => {
    gltf.scene.traverse((child: THREE.Object3D) => {
      if (!(child instanceof THREE.Mesh)) return;
      const mesh = child;
      const material = mesh.material as THREE.MeshStandardMaterial;
      if (!material) return;

      if (material.name === MAT_NAMES.DECAL) material.map = patternTexture;
      else if (material.name === MAT_NAMES.TOP) topCoverRef.current = mesh;
      else if (material.name === MAT_NAMES.BOTTOM) material.color.set(colors.bottom);
      else if (material.name === MAT_NAMES.SWITCH) material.color.set(colors.switch);

      if (material.name === MAT_NAMES.TOP) material.color.set(colors.top);

      material.needsUpdate = true;
    });
  }, [gltf.scene, patternTexture, colors]);

  // Add logo as child of top cover
  useEffect(() => {
    if (!logoTexture || !topCoverRef.current) return;

    const topCover = topCoverRef.current;
    const existing = topCover.getObjectByName("LOGO_CHILD");
    if (existing) topCover.remove(existing);

    const logoMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(0.25, 0.25),
      new THREE.MeshStandardMaterial({ map: logoTexture, transparent: true })
    );
    logoMesh.name = "LOGO_CHILD";
    logoMesh.position.set(0, 0.01, 0);
    logoMesh.rotation.set(-Math.PI / 2, 0, 0);
    logoRef.current = logoMesh;

    topCover.add(logoMesh);
  }, [logoTexture]);

  // Drag logo
  useFrame(({ mouse, camera }) => {
    if (!dragging || !topCoverRef.current || !logoRef.current) return;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(topCoverRef.current);
    if (intersects.length > 0) {
      const localPoint = topCoverRef.current.worldToLocal(intersects[0].point);
      logoRef.current.position.set(localPoint.x, 0.01, localPoint.z);
    }
  });

  const handlePointerDown = (e: any) => { e.stopPropagation(); setDragging(true); };
  const handlePointerUp = () => setDragging(false);

  const camPos: [number, number, number] =
    view === "front" ? [0, 0, 3.5] : [2.2, 1.2, 4];

  return (
    <Canvas camera={{ position: camPos, fov: 50 }} style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[5,5,5]} intensity={1} />
      <React.Suspense fallback={
        <mesh>
          <boxGeometry args={[1,0.2,3]} />
          <meshStandardMaterial color="lightgray" />
        </mesh>
      }>
        <primitive object={gltf.scene} />
      </React.Suspense>
      <OrbitControls enableZoom />
    </Canvas>
  );
}
