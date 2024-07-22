import { useEffect, useRef } from 'react';
import { useGLTF } from '@react-three/drei/native';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function Model({ model, wireframe, clickCoords, setClickCoords }) {
  const ref = useRef();
  const gltf = useGLTF(model);

  const { camera, gl, scene } = useThree();
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

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

  const handleClick = (event) => {
    const rect = gl.domElement.getBoundingClientRect();
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.current.setFromCamera(mouse.current, camera);
    const intersects = raycaster.current.intersectObjects(scene.children, true);
    console.log(clickCoords);
    if (intersects.length)
      setClickCoords([
        intersects[0].point.x,
        intersects[0].point.y,
        intersects[0].point.z,
      ]);
  };

  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      rotation={[0, 0, 0]}
      wireframe={true}
      onClick={handleClick}
    />
  );
}
