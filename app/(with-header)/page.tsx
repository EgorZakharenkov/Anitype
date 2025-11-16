"use client";

import Image from "next/image";
import background from "../../assets/bgImage.svg";
import styles from "./styles.module.scss";
import { InfoAnime } from "@/components/info-anime";
import { useEffect } from "react";
import { ListAnime } from "@/components/anime-list";
import { Container } from "@/components/container";
import { useAnimeStore } from "@/stores/animeStore";
import { useNavigationStore } from "@/stores/navigationStore";

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
      </Container>
    </div>
  );
}
