import { Header } from "@/app/components/header";
import Image from "next/image";
import background from "./assets/bgImage.svg";
import styles from "./styles.module.scss";
import { InfoAnime } from "@/app/components/info-anime";
import { AnimeItem } from "@/app/components/anime-item";
import url from "./assets/onepunch.svg";
export default function Home() {
  return (
    <div className={styles.home}>
      <Header />
      <Image className={styles.bgImage} src={background} alt={"background"} />
      <InfoAnime title={"Монолог фармацевта"} />
      <div className={styles.animeList}>
        <h3></h3>
        <div className={styles.list}>
          <AnimeItem name={"Ванпанчмен 3"} rating={"5"} image={url} />
        </div>
      </div>
    </div>
  );
}
