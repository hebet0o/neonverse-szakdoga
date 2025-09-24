import React from 'react';
import ModelViewer from '../components/ModelViewer';

const AssetCard = ({ asset, onCollect, isCollected }) => (
  <div className="AssetCard">
    <h3>{asset.name}</h3>
    <ModelViewer modelName={asset.name} />
    <button onClick={() => onCollect(asset.id)} disabled={isCollected}>
      {isCollected ? 'Collected' : 'Collect'}
    </button>
  </div>
);

export default AssetCard;