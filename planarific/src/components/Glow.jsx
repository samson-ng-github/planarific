export function Glow({ clickCoords }) {
  return (
    <group>
      <spotLight
        color={[0, 0.5, 1]}
        intensity={2}
        angle={0.1}
        penumbra={0.5}
        position={clickCoords}
        castShadow
      />
      <mesh position={clickCoords}>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial
          color="yellow"
          emissive="yellow"
          emissiveIntensity={150}
        />
      </mesh>
    </group>
  );
}
