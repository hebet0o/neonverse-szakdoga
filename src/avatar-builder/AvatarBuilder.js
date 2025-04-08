import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Asset } from "./Asset";
import { useConfiguratorStore } from "./ConfiguratorStore";

const AvatarBuilder = () => {
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

  const lockGroup = useConfiguratorStore((state) => state.lockGroup);
  const unlockGroup = useConfiguratorStore((state) => state.unlockGroup);

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
      <div style={{ position: "absolute", top: 10, left: 10 }}>
        <button onClick={() => lockGroup("hat")}>Lock Hat</button>
        <button onClick={() => unlockGroup("hat")}>Unlock Hat</button>
      </div>
    </div>
  );
};

export default AvatarBuilder;
