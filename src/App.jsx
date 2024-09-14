import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import EarthTexture from "./textures/earth.jpg"; // Add textures for Earth
import SunTexture from "./textures/sun.webp"; // Add textures for Sun
import SpaceBackground from "./textures/space.png"; // Space background texture

// Sun component with texture
const Sun = () => {
  const sunTexture = useLoader(THREE.TextureLoader, SunTexture);
  return (
    <mesh>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial map={sunTexture} emissive="yellow" emissiveIntensity={1} />
    </mesh>
  );
};

// Earth component with texture and orbit animation
const Earth = () => {
  const earthRef = useRef();
  const earthTexture = useLoader(THREE.TextureLoader, EarthTexture);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    earthRef.current.position.x = 10 * Math.cos(t * 0.5);
    earthRef.current.position.z = 10 * Math.sin(t * 0.5);
  });

  return (
    <mesh ref={earthRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={earthTexture} />
    </mesh>
  );
};

// Space background component
const Space = () => {
  const spaceTexture = useLoader(THREE.TextureLoader, SpaceBackground);
  return (
    <mesh>
      <sphereGeometry args={[100, 64, 64]} />
      <meshBasicMaterial map={spaceTexture} side={THREE.BackSide} />
    </mesh>
  );
};

const App = () => {
  return (
    <Canvas>
      <OrbitControls enableZoom={true} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <Space />
      <Sun />
      <Earth />
    </Canvas>
  );
};

export default App;
