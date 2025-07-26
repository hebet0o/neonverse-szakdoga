import React, { useEffect, useState } from 'react';
import './NftComponent.css';
import BlurText from '../text-animations/BlurText';

const NFTComponent = () => {
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchNFTs() {
      setLoading(true);
      setError('');
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'X-API-KEY': process.env.REACT_APP_OPENSEA_API_KEY // optional, for higher rate limits
          }
        };
        const response = await fetch(
          'https://api.opensea.io/api/v2/collection/boredapeyachtclub/nfts?limit=4',
          options
        );
        const data = await response.json();
        console.log(data);
        setNFTs(data.nfts || []);
      } catch (err) {
        setError('Failed to fetch NFTs: ' + (err?.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    }
    fetchNFTs();
  }, []);

  return (
    <div className="NFTMainDiv">
      <video autoPlay muted loop className="NFTBackgroundVideo" src="assets/pictures/avataraccessoriesbg.mp4" />
      <div className="NFTContent">
        <BlurText
          text="Featured NFTs"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-2xl mb-8 NFTTitle"
        />
        {loading ? (
          <div>Loading NFTs...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : nfts.length > 0 ? (
          <div className="NFTCarousel">
            {nfts.map((nft) => (
              <div className="NFTCard" key={nft.identifier}>
                <h3 className="NFTName">{nft.name || 'Unnamed NFT'}</h3>
                <img
                  src={nft.display_image_url || nft.image_url || 'https://via.placeholder.com/200'}
                  alt={nft.name}
                />
                <p className="NFTDescription">{nft.description || 'No description'}</p>
                <p className="NFTCollection">
                  <strong>Collection:</strong> {nft.collection}
                </p>
                <p className="NFTContract">
                  <strong>Contract:</strong> {nft.contract}
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
              </div>
            ))}
          </div>
        ) : (
          <div className="NFTEmpty">No NFTs available</div>
        )}
      </div>
    </div>
  );
};

export default NFTComponent;