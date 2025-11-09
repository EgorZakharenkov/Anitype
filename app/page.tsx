import { Header } from "@/app/components/header";
import Image from "next/image";
import background from "./assets/bgImage.svg";
import styles from "./styles.module.scss";
import { Button } from "@/app/components/ui/button";

export default function Home() {
  return (
    <div className={styles.home}>
      <Header />
      <Image className={styles.bgImage} src={background} alt={"background"} />
      <div className={styles.infoAnime}>
        <h2>Монолог фармацевта</h2>
        <div className={styles.wrapper}>
          <Button isActive={true}>Доступно в 4К </Button>
          <Button type={"secondary"}>Подробнее</Button>
        </div>
      </div>
    </div>
  );
}
