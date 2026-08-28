import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

export default function MotherModel() {

  const { scene } = useGLTF("/models/mother.glb");

  useEffect(() => {

    scene.traverse((child) => {

      if (child.isMesh) {

        child.castShadow = true;
        child.receiveShadow = true;

      }

    });

  }, [scene]);


  return (
    <primitive
      object={scene}
      position={[-1, -0.4, 0]}
      scale={2.5}
    />
  );
}

useGLTF.preload("/models/mother.glb");