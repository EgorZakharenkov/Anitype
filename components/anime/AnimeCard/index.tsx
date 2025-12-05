"use client";

import { FC, useEffect } from "react";
import styles from "./style.module.scss";
import { useAnimeStore } from "@/stores/animeStore";
import Image from "next/image";
import { imageUrl } from "@/constants";

import Link from "next/link";
import { useNavigationStore } from "@/stores/navigationStore";
import { AboutAnimeCard } from "@/components/anime/AboutAnimeCard";
import { prepareAnimeData } from "@/lib/helpers/prepareAnimeData";
import { Button } from "@/components/ui/Button";

interface AnimeCard {
  id: string;
}

export const AnimeCard: FC<AnimeCard> = ({ id }) => {
  const { fetchCurrentAnime, currentAnime } = useAnimeStore();
  const { addNavItem } = useNavigationStore();
  useEffect(() => {
    fetchCurrentAnime(id);
  }, []);

  const handleCLick = (id: string, name: string) => () => {
    addNavItem({
      href: `/video/${id}`,
      label: name,
    });
  };

  return (
    <div>
      <div className={styles.card}>
        {currentAnime ? (
          <>
            <Image
              width={500}
              height={700}
              className={styles.bgImage}
              src={`${imageUrl}${currentAnime.poster.preview}`}
              alt={"bgImage"}
            />
            <div className={styles.wrapperCard}>
              <div className={styles.left}>
                <Image
                  src={`${imageUrl}${currentAnime.poster.preview}`}
                  alt={"image anime"}
                  width={302}
                  height={453}
                  className={styles.image}
                />
              </div>
              <div className={styles.right}>
                <h2>{currentAnime.name.main}</h2>
                <p className={styles.description}>{currentAnime.description}</p>
                <div className={styles.btns}>
                  <Link href={`/video/${currentAnime.id}`}>
                    <Button
                      handleClick={handleCLick(id, currentAnime.name.main)}
                      isActive
                    >
                      Смотреть
                    </Button>
                  </Link>
                </div>
                <div className={styles.about}>
                  <h3>О сериале</h3>
                  <AboutAnimeCard data={prepareAnimeData(currentAnime)} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <h1>Загрузка...</h1>
        )}
      </div>
    </div>
  );
};
