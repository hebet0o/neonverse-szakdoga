import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

const ModelViewer = ({ modelName }) => {
  let fileName = '';
  const match = modelName.match(/^(.+?)\s?(\d+)$/);
  if (match) {
    const base = match[1].replace(/\s/g, '');
    const num = match[2].padStart(3, '0');
    fileName = `${base}.${num}.glb`;
  } else {
    fileName = `${modelName.replace(/\s/g, '')}.glb`;
  }
  const url = `/assets/models/avatar-builder/${fileName}`;

  return (
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
};

export default ModelViewer;