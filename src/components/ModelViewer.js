import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

const ModelViewer = ({ url }) => (
  <div style={{ width: 200, height: 200 }}>
    <Canvas camera={{ position: [0, 0, 2.5] }}>
      <ambientLight />
      <Suspense fallback={null}>
        <Model url={url} />
      </Suspense>
      <OrbitControls enablePan={false} />
    </Canvas>
  </div>
);

export default ModelViewer;