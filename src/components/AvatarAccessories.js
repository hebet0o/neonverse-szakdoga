import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Asset } from "../avatar-builder/Asset";

const AvatarAccessories = () => {
  const categories = [
    "hat",
    "glasses",
    "earring",
    "facemask",
    "hair",
    "top",
    "bottom",
    "shoes",
  ]; // Add more categories as needed

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <OrbitControls />
        {categories.map((category) => (
          <Asset key={category} categoryName={category} skeleton={null} />
        ))}
      </Canvas>
    </div>
  );
};

export default AvatarAccessories;
