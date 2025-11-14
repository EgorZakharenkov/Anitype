"use client";

import { FC, useEffect } from "react";
import styles from "./style.module.scss";
import { useAnimeStore } from "@/stores/animeStore";
import { useNavigationStore } from "@/stores/navigationStore";
interface AnimeCard {
  id: string;
}

export const AnimeCard: FC<AnimeCard> = ({ id }) => {
  const { fetchCurrentAnime, currentAnime } = useAnimeStore();

  const { addNavItem } = useNavigationStore();

  useEffect(() => {
    fetchCurrentAnime(id);
    addNavItem({
      id,
      label: currentAnime!.name.main,
      href: currentAnime!.name.main,
    });
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
