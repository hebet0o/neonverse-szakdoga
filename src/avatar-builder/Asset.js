import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useState } from "react";
import { useConfiguratorStore } from "../store";

export const Asset = ({ categoryName, skeleton }) => {
  const [url, setUrl] = useState(null);
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const { scene } = useGLTF(url || "", true, (loader) => {
    loader.manager.onLoad = () => setSceneLoaded(true);
  });

  const customization = useConfiguratorStore((state) => state.customization);
  const lockedGroups = useConfiguratorStore((state) => state.lockedGroups);

  const assetColor = customization[categoryName]?.color;
  const skin = useConfiguratorStore((state) => state.skin);

  // Fetch the URL for the asset from the backend
  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await fetch(`http://localhost:5000/models/${categoryName}`);
        const models = await response.json();

        if (response.ok && models.length > 0) {
          setUrl(models[0].file_url); // Use the first model for the category
        } else {
          console.error(`No models found for category: ${categoryName}`);
        }
      } catch (error) {
        console.error("Error fetching model:", error);
      }
    };

    fetchAsset();
  }, [categoryName]);

  useEffect(() => {
    if (scene && sceneLoaded) {
      scene.traverse((child) => {
        if (child.isMesh) {
          if (child.material?.name.includes("Color_")) {
            child.material.color.set(assetColor);
          }
        }
      });
    }
  }, [assetColor, scene, sceneLoaded]);

  const attachedItems = useMemo(() => {
    const items = [];
    if (scene && sceneLoaded) {
      scene.traverse((child) => {
        if (child.isMesh) {
          items.push({
            geometry: child.geometry,
            material: child.material.name.includes("Skin_")
              ? skin
              : child.material,
            morphTargetDictionary: child.morphTargetDictionary,
            morphTargetInfluences: child.morphTargetInfluences,
          });
        }
      });
    }
    return items;
  }, [scene, sceneLoaded, skin]);

  if (lockedGroups[categoryName]) {
    return null;
  }

  return attachedItems.map((item, index) => (
    <skinnedMesh
      key={index}
      geometry={item.geometry}
      material={item.material}
      skeleton={skeleton}
      morphTargetDictionary={item.morphTargetDictionary}
      morphTargetInfluences={item.morphTargetInfluences}
      castShadow
      receiveShadow
    />
  ));
};
