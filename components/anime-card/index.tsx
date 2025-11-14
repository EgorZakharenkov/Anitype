"use client";

import { FC, useEffect } from "react";
import styles from "./style.module.scss";
import { useAnimeStore } from "@/stores/animeStore";
interface AnimeCard {
  id: string;
}

export const AnimeCard: FC<AnimeCard> = ({ id }) => {
  const { fetchCurrentAnime, currentAnime } = useAnimeStore();

  useEffect(() => {
    fetchCurrentAnime(id);
  }, []);
  return (
    <div className={styles.card}>
      {currentAnime ? (
        <div>
          <h1>{currentAnime.name.main}</h1>
        </div>
      ) : (
        <h1>Загрузка...</h1>
      )}
    </div>
  );
};
