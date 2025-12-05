"use client";

import Image from "next/image";
import background from "../../assets/bgImage.svg";
import styles from "./styles.module.scss";

import { useEffect } from "react";

import { useAnimeStore } from "@/stores/animeStore";
import { useNavigationStore } from "@/stores/navigationStore";
import { Container } from "@/components/layout/Container";
import { BannerInfo } from "@/components/anime/BannerInfo";
import { ListAnime } from "@/components/anime/AnimeList";

export default function Home() {
  const {
    fetchAnimeList,
    recommended,
    catalog,
    loading,
    error,
    fetchCatalogReleases,
  } = useAnimeStore();
  const { clearNavItems } = useNavigationStore();
  useEffect(() => {
    fetchAnimeList();
    fetchCatalogReleases();
    clearNavItems();
  }, []);

  return (
    <div className={styles.home}>
      <Image className={styles.bgImage} src={background} alt={"background"} />
      <Container>
        <BannerInfo title={"Монолог фармацевта"} />
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
      </Container>
    </div>
  );
}
