import ModelViewer from '../components/ModelViewer';

const AssetCard = ({ asset, onCollect, isCollected }) => (
  <div className="AssetCard">
    <h3>{asset.name}</h3>
    {asset.url && <ModelViewer url={asset.url} />}
    <button className='auth-btn' onClick={() => onCollect(asset.id)} disabled={isCollected}>
      {isCollected ? 'Collected' : 'Collect'}
    </button>
  </div>
);

export default AssetCard;