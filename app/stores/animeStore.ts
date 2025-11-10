import { create } from "zustand";
import { AnimeList } from "@/app/types/anime.types";
import { baseUrl } from "@/app/constants";
import axios from "axios";

interface AnimeStoreState {
  titles: AnimeList | null;
  loading: boolean;
  error: boolean;
  fetchAnimeList: () => Promise<void>;
}

export const useAnimeStore = create<AnimeStoreState>((set) => ({
  titles: null,
  loading: false,
  error: false,

  fetchAnimeList: async () => {
    set({ loading: true, error: false });
    try {
      const response = await axios.get<AnimeList>(
        `${baseUrl}/anime/catalog/releases`,
        {
          params: {
            limit: 25,
            include: "id,name,poster",
          },
        },
      );

      set({ titles: response.data, loading: false, error: false });
    } catch (error) {
      set({ loading: false, error: true });
      console.error("Error fetching anime:", error);
    }
  },
}));
