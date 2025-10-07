import React, { useEffect, useState } from 'react';
import pb from '../pocketbase';
import './VirtualAssetsComponent.css';
import BlurText from '../text-animations/BlurText';
import AssetCard from '../cards/AssetCard';

const FEATURED_COUNT = 3;
const ALL_ASSETS_COUNT = 6;

const VirtualAssetsComponent = () => {
  const [featuredAssets, setFeaturedAssets] = useState([]);
  const [allAssets, setAllAssets] = useState([]);
  const [userAssets, setUserAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchAssetsAndUser() {
      setLoading(true);
      setError('');
      try {
        const assetsList = await pb.collection('CustomizationAssets').getFullList({}, { signal: abortController.signal });

        const shuffled = [...assetsList].sort(() => 0.5 - Math.random());

        const assetsWithUrls = shuffled.map(asset => ({
          ...asset,
          url: '/assets/models/avatar-builder/' + asset.url
        }));
        setFeaturedAssets(assetsWithUrls.slice(0, FEATURED_COUNT));
        setAllAssets(assetsWithUrls.slice(FEATURED_COUNT, FEATURED_COUNT + ALL_ASSETS_COUNT));
        const user = pb.authStore.model;
        let userAssetsJson = [];
        if (user && user.assets) {
          if (typeof user.assets === 'string') {
            try {
              const parsed = JSON.parse(user.assets);
              userAssetsJson = Array.isArray(parsed) ? parsed : [parsed];
            } catch {
              userAssetsJson = [user.assets];
            }
          } else if (Array.isArray(user.assets)) {
            userAssetsJson = user.assets;
          }
        }
        setUserAssets(userAssetsJson);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Failed to fetch assets: ' + (err?.message || 'Unknown error'));
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAssetsAndUser();

    return () => {
      abortController.abort();
    };
  }, []);

  const handleCollect = async (assetId) => {
    try {
      const user = pb.authStore.model;
      if (!user) return;
      let currentAssets = [];
      if (user.assets) {
        if (typeof user.assets === 'string') {
          try {
            const parsed = JSON.parse(user.assets);
            currentAssets = Array.isArray(parsed) ? parsed : [parsed];
          } catch {
            currentAssets = [user.assets];
          }
        } else if (Array.isArray(user.assets)) {
          currentAssets = user.assets;
        }
      }
      if (!currentAssets.includes(assetId)) {
        const updatedAssets = [...currentAssets, assetId];
        await pb.collection('users').update(user.id, {
          assets: JSON.stringify(updatedAssets)
        });
        setUserAssets(updatedAssets);
      }
    } catch (err) {
      setError('Failed to collect asset: ' + (err?.message || 'Unknown error'));
    }
  };

  return (
    <div className="VirtualAssetsMainDiv" style={{ position: 'relative', overflow: 'hidden' }}>
      <div
        className="AvatarAssetsBackground"
        style={{
          width: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(120deg, #00ff99 0%, #8f00ff 100%)',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          overflow: 'hidden'
        }}
      >
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0.18,
            pointerEvents: 'none'
          }}
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="400" cy="300" r="250" fill="#fff" fillOpacity="0.1"/>
          <circle cx="650" cy="100" r="100" fill="#00ff99" fillOpacity="0.2"/>
          <circle cx="150" cy="500" r="120" fill="#8f00ff" fillOpacity="0.2"/>
        </svg>
      </div>
      <section className="AssetsSection AssetsFeaturedSection" style={{ position: 'relative', zIndex: 1 }}>
        <div className="AssetsContent">
          <BlurText
            text="Featured Assets"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-2xl mb-8 AssetsTitle"
          />
          {loading ? (
            <div>Loading assets...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : featuredAssets.length > 0 ? (
            <div className="AssetsGrid">
              {featuredAssets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  onCollect={handleCollect}
                  isCollected={userAssets.includes(asset.id)}
                />
              ))}
            </div>
          ) : (
            <div className="AssetsEmpty">No featured assets available</div>
          )}
        </div>
      </section>
      <section className="AssetsSection AssetsAllSection" style={{ position: 'relative', zIndex: 1 }}>
        <div className="AssetsContent">
          <BlurText
            text="All Assets"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-2xl mb-8 AssetsTitle"
          />
          {loading ? (
            <div>Loading assets...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : allAssets.length > 0 ? (
            <div className="AssetsGrid">
              {allAssets.map((asset) => (
                <AssetCard
                  key={asset.id}
                  asset={asset}
                  onCollect={handleCollect}
                  isCollected={userAssets.includes(asset.id)}
                />
              ))}
            </div>
          ) : (
            <div className="AssetsEmpty">No assets available</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default VirtualAssetsComponent;