export interface AnimeList {
  id: number;
  name: {
    main: string;
    english: string;
  };
  poster: {
    preview: string;
    thumbnail: string;
    optimized: {
      preview: string;
      thumbnail: string;
    };
  };
  description: string;
  year: string;
  genres: {
    name: string;
  }[];
  episodes_total: string;
}

export interface AnimeListCatalog {
  data: AnimeList[];
}
