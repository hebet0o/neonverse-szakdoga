import React, { useEffect, useState } from 'react';
import './VirtualAssetsComponent.css';
import BlurText from '../text-animations/BlurText';
import CardComponent from '../cards/CardComponent';

const VirtualAssetsComponent = () => {
  const [featuredAccessories, setFeaturedAccessories] = useState([]);
  const [allAccessories, setAllAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAccessories() {
      setLoading(true);
      setError('');
      try {
        // Replace with your actual API call
        setFeaturedAccessories([
          {
            id: 1,
            name: 'Neon Glasses',
            image: 'assets/pictures/neonglasses.png',
            type: 'Glasses',
            description: 'Bright neon glasses for your avatar.',
            rarity: 'Epic',
          },
          {
            id: 2,
            name: 'Cyber Hat',
            image: 'assets/pictures/cyberhat.png',
            type: 'Hat',
            description: 'A stylish cyberpunk hat.',
            rarity: 'Rare',
          },
        ]);
        setAllAccessories([
          {
            id: 3,
            name: 'Pixel Mask',
            image: 'assets/pictures/pixelmask.png',
            type: 'Mask',
            description: 'A mask with pixel art style.',
            rarity: 'Common',
          },
          {
            id: 4,
            name: 'Laser Earrings',
            image: 'assets/pictures/laserearrings.png',
            type: 'Earrings',
            description: 'Earrings that glow with laser light.',
            rarity: 'Uncommon',
          },
        ]);
      } catch (err) {
        setError('Failed to fetch accessories: ' + (err?.message || 'Unknown error'));
      } finally {
        setLoading(false);
      }
    }
    fetchAccessories();
  }, []);

  return (
    <div className="AvatarAccessoriesMainDiv">
      <section className="AccessoriesSection">
        <BlurText
          text="Featured Accessories"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-2xl mb-8 AccessoriesTitle"
        />
        {loading ? (
          <div>Loading accessories...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : featuredAccessories.length > 0 ? (
          <div className="AccessoriesGrid">
            {featuredAccessories.map((accessory) => (
              <CardComponent key={accessory.id} item={accessory} />
            ))}
          </div>
        ) : (
          <div className="AccessoriesEmpty">No featured accessories available</div>
        )}
      </section>
      <section className="AccessoriesSection">
        <BlurText
          text="All Accessories"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-2xl mb-8 AccessoriesTitle"
        />
        {loading ? (
          <div>Loading accessories...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : allAccessories.length > 0 ? (
          <div className="AccessoriesGrid">
            {allAccessories.map((accessory) => (
              <CardComponent key={accessory.id} item={accessory} />
            ))}
          </div>
        ) : (
          <div className="AccessoriesEmpty">No accessories available</div>
        )}
      </section>
    </div>
  );
};

export default VirtualAssetsComponent;