import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function FetusModel({
  position = [2.0, -0.8, 0],
  scale = 1.3,
  heartbeat = true,
}) {

  const { scene } = useGLTF("/models/fetus.glb");

  const groupRef = useRef();

  useEffect(() => {

    scene.traverse((child) => {

      if (child.isMesh) {

        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {

          child.material = child.material.clone();

          child.material.roughness = 0.55;
          child.material.metalness = 0.02;

        }

      }

    });

  }, [scene]);


  useFrame((state) => {

    if (!groupRef.current) return;

    if (heartbeat) {

      const time = state.clock.getElapsedTime();

      const pulse =
        1 +
        Math.max(0, Math.sin(time * 8)) * 0.025;

      groupRef.current.scale.setScalar(
        scale * pulse
      );

    } else {

      groupRef.current.scale.setScalar(scale);

    }

  });


  return (

    <group
      ref={groupRef}
      position={position}
    >

      <primitive
        object={scene}
      />

    </group>

  );

}


useGLTF.preload("/models/fetus.glb");