"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

export function Text3DScene({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;
    const targetZ = progress < 0.6 ? -8 + progress * 8 : -8 + 0.6 * 8;
    const targetY = progress < 0.6 ? 0 : (progress - 0.6) * 5;
    const targetRotY = Math.sin(t * 0.3) * 0.1;

    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      0.04
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.04
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotY,
      0.05
    );

    const textOpacity = progress > 0.5 ? Math.min(1, (progress - 0.5) / 0.2) : 0;
    groupRef.current.visible = progress > 0.45;

    if (hovered) {
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, 1.15, 0.08)
      );
    } else {
      groupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.08)
      );
    }
  });

  const textOpacity = progress > 0.5 ? Math.min(1, (progress - 0.5) / 0.2) : 0;

  return (
    <group ref={groupRef} position={[0, 0, -8]}>
      <Text
        fontSize={2.5}
        maxWidth={12}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        DYLAND
        <meshStandardMaterial
          color="#a3e635"
          emissive="#a3e635"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.85}
          transparent
          opacity={textOpacity}
        />
      </Text>
      <Text
        fontSize={0.5}
        position={[0, -1.8, 0]}
        anchorX="center"
        anchorY="middle"
      >
        Prizki Ramadhan
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.2}
          transparent
          opacity={textOpacity * 0.5}
        />
      </Text>
    </group>
  );
}
