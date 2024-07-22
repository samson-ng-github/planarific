import { useGLTF } from '@react-three/drei/native';

export default function Model({ currentType }) {
  const { scene } = useGLTF('crisp.glb');
  return <primitive object={scene} rotation={[0, -Math.PI / 2, 0]} />;
}
