import React, { useEffect, useState } from 'react';
import './VirtualEventsComponent.css'; // Reuse your cyberpunk style
// import './NFTComponent.css'; // Optionally create a separate CSS for NFT-specific tweaks
import './NftComponent.css';

const NFTComponent = () => {
  const [nfts, setNFTs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const opeaSeaApiKey = process.env.REACT_APP_OPENSEA_API_KEY;
  
  useEffect(() => {
    async function fetchNFTs() {
      setLoading(true);
      setError('');
      try {
        // Example: Fetch NFTs from OpenSea testnet (replace with your API of choice)
        const response = await fetch(
          'https://api.opensea.io/v2/accounts/0x0000000000000000000000000000000000000000/nfts',
          {
            headers: {
              'X-API-KEY': opeaSeaApiKey
            }
          }
        );
        const data = await response.json();
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
    <h1 className="NFTTitle">Featured NFTs</h1>
    {loading ? (
      <div>Loading NFTs...</div>
    ) : error ? (
      <div className="error-message">{error}</div>
    ) : nfts.length > 0 ? (
      <div className="NFTCarousel">
        {nfts.slice(0, 6).map((nft) => (
          <div className="NFTCard" key={nft.identifier || nft.token_id}>
            <h3 className="NFTName">{nft.name || 'Unnamed NFT'}</h3>
            <img
              src={nft.image_url || nft.image || 'https://via.placeholder.com/200'}
              alt={nft.name}
            />
            <p className="NFTDescription">{nft.collection || nft.description || 'No description'}</p>
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