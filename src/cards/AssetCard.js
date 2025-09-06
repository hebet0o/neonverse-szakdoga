import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import './AssetCard.css';

function AssetViewer({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
}

const AssetCard = ({ asset, onCollect, isCollected }) => (
  <div className="AssetCard">
    <div className="AssetViewerContainer">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.8} />
        <OrbitControls />
        <AssetViewer url={asset.url} />
      </Canvas>
    </div>
    <div className="AssetInfoCard">
      <h3 className="AssetName">{asset.name}</h3>
      <p className="AssetPrice">
        Price: {asset.price ? asset.price : asset.isPurchased ? 'Owned' : 'Free'}
      </p>
      <button
        className="AssetCollectButton"
        onClick={() => onCollect(asset.id)}
        disabled={isCollected || asset.isPurchased}
      >
        {isCollected || asset.isPurchased ? 'Collected' : 'Collect'}
      </button>
    </div>
  </div>
);

export default AssetCard;