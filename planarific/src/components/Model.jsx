import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei/native';

export function Model({ model, wireframe }) {
  const ref = useRef();
  const gltf = useGLTF(model);

  useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.material.wireframe = wireframe;
        }
      });
    }
  }, [model, wireframe]);


  if (!gltf.scene) {
    return null;
  }

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      rotation={[0, 0, 0]}
      wireframe={true}
    />
  );
}
