export function Glow({ clickCoords }) {
  return (
    <group>
      <mesh position={clickCoords}>
        <sphereGeometry args={[0.5]} />
        <meshStandardMaterial wireframe />
      </mesh>
    </group>
  );
}
