"use client";

import { useRef, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

interface InteractiveProps {
  position: [number, number, number];
  scale?: number;
}

function InteractiveMesh({
  children,
  position,
  scale = 1,
}: {
  children: React.ReactNode;
} & InteractiveProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef(0);
  const originalScale = useRef(scale);

  const handleClick = useCallback(() => {
    pulseRef.current = 1;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    if (pulseRef.current > 0) {
      pulseRef.current *= 0.92;
      const pulse = 1 + pulseRef.current * 0.6;
      meshRef.current.scale.setScalar(originalScale.current * pulse);
      meshRef.current.rotation.x += 0.05;
      meshRef.current.rotation.y += 0.03;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onClick={handleClick}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      {children}
    </mesh>
  );
}

function GlowingTorus({ position, scale = 1 }: InteractiveProps) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.3;
      ref.current.rotation.z = state.clock.elapsedTime * 0.15;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <InteractiveMesh position={position} scale={scale}>
        <torusGeometry args={[1, 0.35, 32, 64]} />
        <MeshDistortMaterial
          color="#a3e635"
          emissive="#a3e635"
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.8}
          wireframe
          distort={0.3}
          speed={2}
        />
      </InteractiveMesh>
    </Float>
  );
}

function GlowingIco({ position, scale = 1 }: InteractiveProps) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.4;
      ref.current.rotation.x = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={2}>
      <InteractiveMesh position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshWobbleMaterial
          color="#22c55e"
          emissive="#22c55e"
          emissiveIntensity={0.15}
          roughness={0.3}
          metalness={0.6}
          factor={0.3}
          speed={1.5}
        />
      </InteractiveMesh>
    </Float>
  );
}

function GlowingOcta({ position, scale = 1 }: InteractiveProps) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.25;
      ref.current.rotation.z = -state.clock.elapsedTime * 0.1;
    }
  });
  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
      <InteractiveMesh position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#a3e635"
          emissive="#a3e635"
          emissiveIntensity={0.2}
          roughness={0.15}
          metalness={0.9}
          transparent
          opacity={0.85}
        />
      </InteractiveMesh>
    </Float>
  );
}

function WireSphere({ position, scale = 1 }: InteractiveProps) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.15;
      ref.current.rotation.y = state.clock.elapsedTime * 0.35;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.4} floatIntensity={1}>
      <InteractiveMesh position={position} scale={scale}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#4ade80"
          wireframe
          transparent
          opacity={0.3}
        />
      </InteractiveMesh>
    </Float>
  );
}

export function FloatingObjects({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetScale = 0.3 + progress * 1.2;
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.05
    );
    groupRef.current.rotation.y = progress * Math.PI * 0.5;
  });

  return (
    <group ref={groupRef}>
      <GlowingTorus position={[0, 0.5, 0]} scale={1.4} />
      <GlowingIco position={[-3, -1, -2]} scale={1.1} />
      <GlowingOcta position={[3.5, 1.5, -1.5]} scale={0.9} />
      <WireSphere position={[-1.5, 2.5, -3]} scale={1.6} />
      <WireSphere position={[2, -2.5, -4]} scale={1.2} />
      <GlowingIco position={[0, -2, -5]} scale={1.8} />
    </group>
  );
}
