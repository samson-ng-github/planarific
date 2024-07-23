export function Glow({ clickCoords }) {
  return (
    <group>
      <mesh position={clickCoords}>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial wireframe color="#111155" />
      </mesh>
    </group>
  );
}
