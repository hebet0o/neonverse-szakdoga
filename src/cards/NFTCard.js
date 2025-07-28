import React from 'react';
import './NFTCard.css';
import SpotlightCard from '../text-animations/SpotLightCard';

const NFTCard = ({ nft }) => (
  <SpotlightCard className="NFTCard" spotlightColor="rgba(0,255,231,0.18)">
    <h3 className="NFTName">{nft.name || 'Unnamed NFT'}</h3>
    <img
      src={nft.display_image_url || nft.image_url || 'https://via.placeholder.com/200'}
      alt={nft.name}
    />
    <p className="NFTDescription">{nft.description || 'No description'}</p>
    <p className="NFTCollection">
      <strong>Collection:</strong> {nft.collection}
    </p>
    <p className="NFTTokenStandard">
      <strong>Token Standard:</strong> {nft.token_standard}
    </p>
    <a
      className="NFTLink"
      href={nft.opensea_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      View on OpenSea
    </a>
    <button className="NFTBuyButton" disabled>
      Buy NFT (Demo)
    </button>
  </SpotlightCard>
);

export default NFTCard;