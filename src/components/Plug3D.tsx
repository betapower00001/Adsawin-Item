"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import React from "react";

const MAT_NAMES = {
  DECAL: "USER_DESIGN_DECAL",
  TOP: "TOP_COVER_MAT",
  BOTTOM: "BOTTOM_COVER_MAT",
  SWITCH: "SWITCH_MAT",
};

interface Plug3DProps {
  modelPath: string;
  patternImg: string;
  colors: {
    top: string;
    bottom: string;
    switch: string;
  };
  view?: "front" | "angle";
}

function PlugMesh({ modelPath, patternImg, colors }: Plug3DProps) {
  const gltf = useGLTF(modelPath);

  const patternTexture = useLoader(
    THREE.TextureLoader,
    patternImg || "/images/empty.png"
  ) as THREE.Texture;

  if (patternTexture) patternTexture.flipY = false;

  React.useEffect(() => {
    gltf.scene.traverse((child: THREE.Object3D) => {
      if (child instanceof THREE.Mesh) {
        const mesh = child;
        const material = mesh.material as THREE.MeshStandardMaterial;
        if (!material) return;

        if (material.name === MAT_NAMES.DECAL) {
          material.map = patternTexture;
        } else if (material.name === MAT_NAMES.TOP) {
          material.color.set(colors.top);
        } else if (material.name === MAT_NAMES.BOTTOM) {
          material.color.set(colors.bottom);
        } else if (material.name === MAT_NAMES.SWITCH) {
          material.color.set(colors.switch);
        }

        material.needsUpdate = true;
      }
    });
  }, [gltf.scene, patternTexture, colors.top, colors.bottom, colors.switch]);

  return <primitive object={gltf.scene} />;
}

export default function Plug3D({
  modelPath,
  patternImg,
  colors,
  view = "angle",
}: Plug3DProps) {

  const camPos: [number, number, number] =
    view === "front" ? [0, 0, 3.5] : [2.2, 1.2, 4];

  return (
    <Canvas
      camera={{ position: camPos, fov: 50 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <React.Suspense
        fallback={
          <mesh>
            <boxGeometry args={[1, 0.2, 3]} />
            <meshStandardMaterial color="lightgray" />
          </mesh>
        }
      >
        <PlugMesh
          modelPath={modelPath}
          patternImg={patternImg}
          colors={colors}
          view={view}
        />
      </React.Suspense>
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
}
