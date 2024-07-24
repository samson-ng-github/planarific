export function Glow({ clickCoords }) {
  if (!clickCoords) return null;
  return (
    <group>
      <mesh position={clickCoords}>
        <sphereGeometry args={[0.5, 30, 30]} />
        <meshStandardMaterial wireframe color="#111155" />
      </mesh>
    </group>
  );
}
