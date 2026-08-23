"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture, Float } from "@react-three/drei";
import * as THREE from "three";

function PhotoPlane({
  url,
  position,
  rotation,
  scale,
  progress,
}: {
  url: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  progress: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  let texture: THREE.Texture | null = null;
  try {
    texture = useTexture(url);
  } catch {
    // fallback
  }

  const zoomScale = useMemo(() => {
    return (base: number) => base + progress * base * 0.6;
  }, [progress]);

  useFrame(() => {
    if (!meshRef.current || !texture) return;
    const s = zoomScale(scale || 1);
    meshRef.current.scale.lerp(new THREE.Vector3(s, s, 1), 0.04);
  });

  if (!texture) return null;

  return (
    <Float speed={0.8} rotationIntensity={0.15} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position} rotation={rotation} scale={scale}>
        <planeGeometry args={[4, 2.5, 1, 1]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={0.15 + progress * 0.7}
          side={THREE.DoubleSide}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

function PhotoFrame({
  position,
  scale,
  progress,
}: {
  position: [number, number, number];
  scale?: number;
  progress: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.1 + progress * 0.2;
    groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.05;

    const s = (scale || 1) + progress * (scale || 1) * 0.5;
    groupRef.current.scale.lerp(new THREE.Vector3(s, s, s), 0.03);
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main photo frame border */}
      <mesh>
        <planeGeometry args={[4.2, 2.7]} />
        <meshStandardMaterial
          color="#a3e635"
          emissive="#a3e635"
          emissiveIntensity={0.2 + progress * 0.3}
          transparent
          opacity={0.3 + progress * 0.4}
          wireframe
        />
      </mesh>
      {/* Glow border */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[4.4, 2.9]} />
        <meshStandardMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={0.15}
          transparent
          opacity={0.1 + progress * 0.15}
          wireframe
        />
      </mesh>
    </group>
  );
}

export function Photo3DScene({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;

    // Camera zoom
    const targetZ = 12 - progress * 6;
    const targetY = progress * 1.5 - 0.5;
    const targetX = Math.sin(progress * Math.PI * 0.3) * 1.5;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.04);
    camera.lookAt(0, 0, 0);

    groupRef.current.rotation.y = progress * Math.PI * 0.1;
  });

  const photos = [
    {
      url: "https://picsum.photos/seed/dyland1/800/500",
      pos: [0, 0, 0] as [number, number, number],
      rot: [0, 0, 0] as [number, number, number],
      scale: 1,
    },
    {
      url: "https://picsum.photos/seed/dyland2/800/500",
      pos: [-3.5, 1, -2] as [number, number, number],
      rot: [0, 0.3, 0.05] as [number, number, number],
      scale: 0.7,
    },
    {
      url: "https://picsum.photos/seed/dyland3/800/500",
      pos: [3, -0.5, -1.5] as [number, number, number],
      rot: [0, -0.2, -0.03] as [number, number, number],
      scale: 0.65,
    },
    {
      url: "https://picsum.photos/seed/dyland4/800/500",
      pos: [-1.5, -1.5, -3] as [number, number, number],
      rot: [0.1, 0.15, 0] as [number, number, number],
      scale: 0.55,
    },
    {
      url: "https://picsum.photos/seed/dyland5/800/500",
      pos: [2, 2, -3.5] as [number, number, number],
      rot: [-0.05, -0.1, 0.02] as [number, number, number],
      scale: 0.5,
    },
  ];

  return (
    <group ref={groupRef}>
      {photos.map((photo, i) => (
        <group key={i}>
          <PhotoPlane
            url={photo.url}
            position={photo.pos}
            rotation={photo.rot}
            scale={photo.scale}
            progress={progress}
          />
          <PhotoFrame
            position={photo.pos}
            scale={photo.scale}
            progress={progress}
          />
        </group>
      ))}
    </group>
  );
}
