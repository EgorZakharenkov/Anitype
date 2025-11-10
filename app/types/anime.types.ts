export interface AnimeList {
  id: number;
  year: number;
  name: {
    main: string;
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
}

export interface AnimeListCatalog {
  data: AnimeList[];
}
