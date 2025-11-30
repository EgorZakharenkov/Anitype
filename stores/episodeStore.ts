import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface EpisodeStoreState {
  currentEpisodeIndex: number;
  changeCurrentEpisode: (currentEpisodeIndex: number) => void;
}

export const useEpisodeStore = create<EpisodeStoreState>()(
  persist(
    (set) => ({
      currentEpisodeIndex: 0,
      changeCurrentEpisode: (episode: number) => {
        set({ currentEpisodeIndex: episode });
      },
    }),
    {
      name: "episode-store",
    },
  ),
);
