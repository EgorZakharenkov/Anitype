"use client";

import { FC, useEffect } from "react";
import styles from "./style.module.scss";
import { useAnimeStore } from "@/stores/animeStore";
import Image from "next/image";
import { imageUrl } from "@/constants";
import { Button } from "@/components/ui/button";
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
        <div className={styles.wrapperCard}>
          <div className={styles.left}>
            <Image
              src={`${imageUrl}${currentAnime.poster.preview}`}
              alt={"image anime"}
              width={302}
              height={453}
            />
          </div>
          <div className={styles.right}>
            <h2>{currentAnime.name.main}</h2>
            <div className={styles.btns}>
              <Button isActive>Смотреть</Button>
              <Button isActive>Смотреть вместе</Button>
            </div>
          </div>
        </div>
      ) : (
        <h1>Загрузка...</h1>
      )}
    </div>
  );
};
