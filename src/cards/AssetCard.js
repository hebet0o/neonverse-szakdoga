import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './AssetCard.css';

function AssetViewer({ url }) {
  const { scene } = useGLTF(url);
  console.log(scene);
  return <primitive object={scene} scale={1.5} />;
}

const AssetCard = ({ asset, onCollect, isCollected }) => (
  <div className="AssetCard">
    <div className="AssetViewerContainer">
      <Suspense fallback={<div>Loading 3D model...</div>}>
        {asset.url && asset.url.endsWith('.glb') ? (
          <AssetViewer url={asset.url} />
        ) : (
          <div style={{ color: '#ff00cc', padding: '20px' }}>No 3D preview available.</div>
        )}
      </Suspense>
      <AssetViewer url={asset.url} />
    </div>
    <div className="AssetInfoCard">
      <h3 className="AssetName">{asset.name}</h3>
      <button
        className="AssetCollectButton"
        onClick={() => onCollect(asset.id)}
        disabled={isCollected}
      >
        {isCollected ? 'Collected' : 'Collect'}
      </button>
    </div>
  </div>
);

export default AssetCard;