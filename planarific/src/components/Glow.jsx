export function Glow({ clickCoords }) {
  return (
    <group>
      <mesh position={clickCoords}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>
  );
}
