import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { useSpring } from '@react-spring/three';
import * as THREE from 'three';

export function AnimatedControls({
  initialCameraState,
  resetFlag,
  handleControlsChange,
}) {
  const controlsRef = useRef();
  const cameraRef = useRef();

  // Spring animation
  const [spring, api] = useSpring(() => ({
    position: initialCameraState.position,
    rotation: initialCameraState.rotation,
    config: { tension: 300, friction: 30 },
  }));

  useEffect(() => {
    if (resetFlag) {
      api.start({
        position: initialCameraState.position,
        rotation: initialCameraState.rotation,
      });
    }
  }, [resetFlag, api, initialCameraState]);

  // Use frame loop to update camera position and rotation
  useFrame(() => {
    if (controlsRef.current) {
      const { position, rotation } = spring;
      controlsRef.current.object.position.set(...position.get());
      controlsRef.current.object.rotation.set(...rotation.get());
      controlsRef.current.update();
    }
  });

  return (
    <>
      <perspectiveCamera
        ref={cameraRef}
        position={initialCameraState.position}
      />
      <OrbitControls
        ref={controlsRef}
        makeDefault
        maxDistance={400}
        onChange={handleControlsChange}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN,
        }}
      />
    </>
  );
}
