import React from 'react';
import "./AvatarAccessoriesComponent.css";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const AvatarAccessoriesComponent = () => {
  return (
    <>
      <Canvas
        camera={{
          position: [3,3,3]
        }}
      >
        <OrbitControls>
          <mesh>
              <boxGeometry args={[0.5, 0.5, 0.5]}/>
              <meshNormalMaterial/>
          </mesh>
        </OrbitControls>  

      </Canvas>
    </>
  );
};

export default AvatarAccessoriesComponent;
