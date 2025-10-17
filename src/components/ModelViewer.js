import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model({ url, onCentered }) {
  const gltf = useGLTF(url);
  const groupRef = useRef();

  const { camera, gl } = useThree();
  const controlsRef = useRef();

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const box = new THREE.Box3().setFromObject(group);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const radius = box.getBoundingSphere(new THREE.Sphere()).radius || maxDim * 0.5;

    group.position.x += (group.position.x - center.x);
    group.position.y += (group.position.y - center.y);
    group.position.z += (group.position.z - center.z);

    const offset = radius * 2.5;
    camera.position.set(0, radius * 0.6, offset);
    camera.near = Math.max(0.1, radius / 100);
    camera.far = Math.max(1000, radius * 10);
    camera.updateProjectionMatrix();

    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }

    if (onCentered) onCentered({ center, size, radius });

  }, [gltf, camera, gl, url]);

  return (
    <group ref={groupRef}>
      <primitive object={gltf.scene} />
      <OrbitControls ref={controlsRef} enablePan={false} />
    </group>
  );
}

const ModelViewer = ({ url, width = 240, height = 240 }) => {
  if (!url) return null;

  return (
    <div style={{ width, height }}>
      <Canvas camera={{ position: [0, 0.6, 2.5], fov: 45 }}>
        <ambientLight intensity={0.9} />
        <directionalLight intensity={0.6} position={[5, 10, 5]} />
        <Suspense fallback={null}>
          <Model url={url} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ModelViewer;