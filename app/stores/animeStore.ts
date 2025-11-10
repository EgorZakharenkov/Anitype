import { create } from "zustand";
import { AnimeList, AnimeListCatalog } from "@/app/types/anime.types";
import { baseUrl } from "@/app/constants";
import axios from "axios";

interface AnimeStoreState {
  recommended: AnimeList[] | null;
  catalog: AnimeList[] | null;
  loading: boolean;
  error: boolean;
  fetchAnimeList: () => Promise<void>;
  fetchCatalogReleases: () => Promise<void>;
}

export const useAnimeStore = create<AnimeStoreState>((set) => ({
  recommended: null,
  catalog: null,
  loading: false,
  error: false,

  fetchAnimeList: async () => {
    set({ loading: true, error: false });
    try {
      const response = await axios.get<AnimeList[]>(
        `${baseUrl}/anime/releases/recommended`,
        {
          params: {
            limit: 14,
            include: "id,name,poster,description",
          },
        },
      );

      set({ recommended: response.data, loading: false, error: false });
    } catch (error) {
      set({ loading: false, error: true });
      console.error("Error fetching anime:", error);
    }
  },
  fetchCatalogReleases: async () => {
    try {
      const response = await axios.get<AnimeListCatalog>(
        `${baseUrl}/anime/catalog/releases`,
        {
          params: {
            limit: 14,
            include: "id,name,poster,description",
          },
        },
      );
      set({ catalog: response.data.data, loading: false, error: false });
    } catch (error) {
      set({ loading: false, error: true });
      console.error("Error fetching anime:", error);
    }
  },
}));
