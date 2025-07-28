import React, { useEffect, useState } from 'react';
import './NftComponent.css';
import BlurText from '../text-animations/BlurText';
import NFTCard from '../cards/NFTCard';

const NFTComponent = () => {
  const [featuredNFTs, setFeaturedNFTs] = useState([]);
  const [randomNFTs, setRandomNFTs] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingRandom, setLoadingRandom] = useState(true);
  const [errorFeatured, setErrorFeatured] = useState('');
  const [errorRandom, setErrorRandom] = useState('');

  useEffect(() => {
    async function fetchFeaturedNFTs() {
      setLoadingFeatured(true);
      setErrorFeatured('');
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'X-API-KEY': process.env.REACT_APP_OPENSEA_API_KEY
          }
        };
        const response = await fetch(
          'https://api.opensea.io/api/v2/collection/boredapeyachtclub/nfts?limit=4',
          options
        );
        const data = await response.json();
        setFeaturedNFTs(data.nfts || []);
      } catch (err) {
        setErrorFeatured('Failed to fetch NFTs: ' + (err?.message || 'Unknown error'));
      } finally {
        setLoadingFeatured(false);
      }
    }
    async function fetchRandomNFTs() {
      setLoadingRandom(true);
      setErrorRandom('');
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'X-API-KEY': process.env.REACT_APP_OPENSEA_API_KEY
          }
        };
        const response = await fetch(
          'https://api.opensea.io/api/v2/collection/cryptopunks/nfts?limit=4',
          options
        );
        const data = await response.json();
        setRandomNFTs(data.nfts || []);
      } catch (err) {
        setErrorRandom('Failed to fetch NFTs: ' + (err?.message || 'Unknown error'));
      } finally {
        setLoadingRandom(false);
      }
    }
    fetchFeaturedNFTs();
    fetchRandomNFTs();
  }, []);

  return (
    <div className="NFTMainDiv">
      {/* Featured NFTs Section */}
      <section className="NFTSection NFTFeaturedSection">
        <video autoPlay muted loop className="NFTBackgroundVideo" src="assets/pictures/avataraccessoriesbg.mp4" />
        <div className="NFTContent">
          <BlurText
            text="Featured NFTs"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-2xl mb-8 NFTTitle"
          />
          {loadingFeatured ? (
            <div>Loading NFTs...</div>
          ) : errorFeatured ? (
            <div className="error-message">{errorFeatured}</div>
          ) : featuredNFTs.length > 0 ? (
            <div className="NFTCarousel">
              {featuredNFTs.map((nft) => (
                <NFTCard key={nft.identifier} nft={nft} />
              ))}
            </div>
          ) : (
            <div className="NFTEmpty">No NFTs available</div>
          )}
        </div>
      </section>
      {/* Random Collection Section */}
      <section className="NFTSection NFTRandomSection">
        <div className="NFTContent">
          <BlurText
            text="CRYPTOPUNKS"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-2xl mb-8 NFTTitle"
          />
          {loadingRandom ? (
            <div>Loading NFTs...</div>
          ) : errorRandom ? (
            <div className="error-message">{errorRandom}</div>
          ) : randomNFTs.length > 0 ? (
            <div className="NFTCarousel">
              {randomNFTs.map((nft) => (
                <NFTCard key={nft.identifier} nft={nft} />
              ))}
            </div>
          ) : (
            <div className="NFTEmpty">No NFTs available</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NFTComponent;