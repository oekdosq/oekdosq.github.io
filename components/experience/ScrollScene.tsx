"use client";

import { useRef, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Photo3DScene } from "./Photo3DScene";
import { ParticleField } from "./ParticleField";

export function ScrollScene({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = scrollProgress * Math.PI * 0.05;
    }
  });

  return (
    <>
      <color attach="background" args={["#050505"]} />
      <fog attach="fog" args={["#050505", 8, 35]} />

      <ambientLight intensity={0.2} />
      <pointLight position={[8, 8, 8]} intensity={1.8} color="#a3e635" />
      <pointLight position={[-8, -4, 6]} intensity={0.6} color="#22c55e" />
      <spotLight
        position={[0, 12, 0]}
        angle={0.6}
        penumbra={1}
        intensity={2.5}
        color="#a3e635"
        castShadow
      />

      <group ref={groupRef}>
        <Photo3DScene progress={scrollProgress} />
      </group>
      <ParticleField count={500} />
    </>
  );
}
