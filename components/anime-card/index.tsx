"use client";

import { FC, useEffect, useState } from "react";
import styles from "./style.module.scss";
import { useAnimeStore } from "@/stores/animeStore";
import Image from "next/image";
import { imageUrl } from "@/constants";
import { Button } from "@/components/ui/button";
import { AnimeInfoCard } from "@/components/anime-info-card";
import { prepareAnimeData } from "@/utils/helpers/prepareAnimeData";
import { VideoPlayer } from "@/components/video-player";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface AnimeCard {
  id: string;
}

export const AnimeCard: FC<AnimeCard> = ({ id }) => {
  const { fetchCurrentAnime, currentAnime } = useAnimeStore();
  const [episode, setEpisode] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchCurrentAnime(id);
  }, []);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleSelectedValue = (value: string) => {
    setEpisode(value);
    console.log("Выбранная серия:", value);
  };

  return (
    <div>
      <div className={`${styles.card} ${open && styles.open}`}>
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
                  <Link href={`video/${currentAnime.id}`}>
                    <Button handleClick={handleClickOpen} isActive>
                      Смотреть
                    </Button>
                  </Link>
                </div>
                <div className={styles.info}>
                  <h3>О сериале</h3>
                  <AnimeInfoCard data={prepareAnimeData(currentAnime)} />
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
