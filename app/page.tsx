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
  const {
    fetchAnimeList,
    recommended,
    catalog,
    loading,
    error,
    fetchCatalogReleases,
  } = useAnimeStore();
  useEffect(() => {
    fetchAnimeList();
    fetchCatalogReleases();
  }, []);

  return (
    <div className={styles.home}>
      <Header />
      <Image className={styles.bgImage} src={background} alt={"background"} />
      <InfoAnime title={"Монолог фармацевта"} />
      <ListAnime
        titles={recommended}
        loading={loading}
        error={error}
        title={"Рекомендации"}
      />
      <ListAnime
        titles={catalog}
        loading={loading}
        error={error}
        title={"Каталог"}
      />
    </div>
  );
}
