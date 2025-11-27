export interface AnimeItem {
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
  episodes: Episode[];
}

export interface Episode {
  id: number;
  name: string;
  opening: {
    stop: number | null;
    start: number | null;
  };
  preview: {
    src: string;
    preview: string;
    thumbnail: string;
  };
  hls_480: string | null;
  hls_720: string | null;
  hls_1080: string | null;
  duration: number;
}
