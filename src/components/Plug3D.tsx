// components/Plug3D.tsx
"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import React, { Suspense, useMemo } from "react";

// *** Material Names ต้องตรงกับที่ตั้งใน Blender! ***
const MAT_NAMES = {
    DECAL: "USER_DESIGN_DECAL",
    TOP: "TOP_COVER_MAT",
    BOTTOM: "BOTTOM_COVER_MAT",
    SWITCH: "SWITCH_MAT",
};

interface Plug3DProps {
  modelPath: string;
  patternImg: string;
  colors: { // <-- โครงสร้างนี้ถูกรักษาไว้
    top: string;
    bottom: string;
    switch: string;
  };
}

function PlugMesh({ modelPath, patternImg, colors }: Plug3DProps) {
    const gltf = useGLTF(modelPath);
    
    const patternTexture = useLoader(THREE.TextureLoader, patternImg);
    patternTexture.flipY = false;

    useMemo(() => {
        gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                const material = child.material as THREE.MeshStandardMaterial;

                if (material.name === MAT_NAMES.DECAL) {
                    material.map = patternTexture;
                    material.needsUpdate = true;
                } 
                else if (material.name === MAT_NAMES.TOP) {
                    material.color.set(colors.top); // ใช้ colors.top
                    material.needsUpdate = true;
                }
                else if (material.name === MAT_NAMES.BOTTOM) {
                    material.color.set(colors.bottom); // ใช้ colors.bottom
                    material.needsUpdate = true;
                }
                else if (material.name === MAT_NAMES.SWITCH) {
                    material.color.set(colors.switch); // ใช้ colors.switch
                    material.needsUpdate = true;
                }
            }
        });
    }, [gltf.scene, patternTexture, colors]); 

    return <primitive object={gltf.scene} />;
}

export default function Plug3D(props: Plug3DProps) {
    return (
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 60 }}
          style={{ width: '100%', height: '100%' }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 10]} intensity={1.0} />
          
          <Suspense fallback={<group><mesh><boxGeometry args={[1, 0.2, 3]}/></mesh></group>}> 
            <PlugMesh {...props} />
          </Suspense>
          
          <OrbitControls enableZoom={true} />
        </Canvas>
    );
}