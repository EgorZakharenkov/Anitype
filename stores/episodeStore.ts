import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CurrentEpisode = {
  id: string;
  episodeIndex: number;
};

export interface EpisodeStoreState {
  episodesIndex: CurrentEpisode[];
  changeCurrentEpisode: (currentEpisode: CurrentEpisode) => void;
  getEpisodeIndex: (id: string) => number;
  clearEpisodes: () => void;
}

export const useEpisodeStore = create<EpisodeStoreState>()(
  persist(
    (set, get) => ({
      episodesIndex: [],

      changeCurrentEpisode: (episode: CurrentEpisode) => {
        set((state) => {
          const existingIndex = state.episodesIndex.findIndex(
            (item) => item.id === episode.id,
          );

          if (existingIndex !== -1) {
            const updatedEpisodes = [...state.episodesIndex];
            updatedEpisodes[existingIndex] = episode;
            return { episodesIndex: updatedEpisodes };
          } else {
            return { episodesIndex: [...state.episodesIndex, episode] };
          }
        });
      },

      getEpisodeIndex: (id: string) => {
        const state = get();
        const found = state.episodesIndex.find((item) => item.id === id);
        return found?.episodeIndex || 0;
      },

      clearEpisodes: () => {
        set({ episodesIndex: [] });
      },
    }),
    {
      name: "episode-store",
    },
  ),
);
