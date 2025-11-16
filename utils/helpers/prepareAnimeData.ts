import { AnimeList } from "@/types/anime.types";

export const prepareAnimeData = (animeData: AnimeList) => {
  return [
    {
      key: "Оригинальное название",
      value: animeData.name?.english || "Не указано",
    },
    {
      key: "Год выпуска",
      value: animeData.year || "Не указан",
    },
    {
      key: "Жанры",
      value: animeData.genres?.map((genre) => genre.name) || [],
    },
    {
      key: "Количество эпизодов",
      value: animeData.episodes_total || 0,
    },
  ];
};
