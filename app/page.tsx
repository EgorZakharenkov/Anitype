"use client";

import { Header } from "@/components/header";

import Image from "next/image";
import background from "./assets/bgImage.svg";
import styles from "./styles.module.scss";
import { InfoAnime } from "@/components/info-anime";
import { useEffect } from "react";
import { useAnimeStore } from "@/app/stores/animeStore";
import { ListAnime } from "@/components/anime-list";

export default function Home() {
  const { fetchAnimeList, titles, loading, error } = useAnimeStore();
  useEffect(() => {
    fetchAnimeList();
  }, []);

  return (
    <div className={styles.home}>
      <Header />
      <Image className={styles.bgImage} src={background} alt={"background"} />
      <InfoAnime title={"Монолог фармацевта"} />
      <ListAnime
        titles={titles}
        loading={loading}
        error={error}
        title={"Сейчас смотрят"}
      />
    </div>
  );
}
