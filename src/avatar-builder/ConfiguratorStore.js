import create from "zustand";

export const useConfiguratorStore = create((set) => ({
  customization: {}, // Stores customization data (e.g., colors, selected assets)
  lockedGroups: {}, // Tracks locked groups (e.g., categories that can't be modified)
  skin: null, // Stores the skin material for the avatar

  setCustomization: (category, data) =>
    set((state) => ({
      customization: {
        ...state.customization,
        [category]: data,
      },
    })),

  lockGroup: (category) =>
    set((state) => ({
      lockedGroups: {
        ...state.lockedGroups,
        [category]: true,
      },
    })),

  unlockGroup: (category) =>
    set((state) => ({
      lockedGroups: {
        ...state.lockedGroups,
        [category]: false,
      },
    })),

  setSkin: (skinMaterial) => set({ skin: skinMaterial }),
}));
