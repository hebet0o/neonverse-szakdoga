import React, { useEffect, useState } from 'react';
import pb from '../pocketbase';
import './VirtualAssetsComponent.css';
import BlurText from '../text-animations/BlurText';
import AssetCard from '../cards/AssetCard';

const FEATURED_COUNT = 4;
const ALL_ASSETS_COUNT = 8;

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
          url: asset.url
            ? `${pb.baseUrl}/api/files/CustomizationAssets/${asset.id}/${asset.url}`
            : null
        }));

        setFeaturedAssets(assetsWithUrls.slice(0, FEATURED_COUNT));
        setAllAssets(assetsWithUrls.slice(FEATURED_COUNT, FEATURED_COUNT + ALL_ASSETS_COUNT));

        const user = pb.authStore.model;
        if (user && user.assets) {
          const userAssetsJson = user.assets ? JSON.parse(user.assets) : [];
          setUserAssets(userAssetsJson);
        } else {
          setUserAssets([]);
        }
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
        try {
          currentAssets = JSON.parse(user.assets);
          if (!Array.isArray(currentAssets)) currentAssets = [];
        } catch {
          currentAssets = [];
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
    <div className="VirtualAssetsMainDiv">
      <section className="AssetsSection AssetsFeaturedSection">
        <video autoPlay muted loop className="AssetsBackgroundVideo" src="assets/pictures/avataraccessoriesbg.mp4" />
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
      <section className="AssetsSection AssetsAllSection">
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