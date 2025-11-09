import { FC } from "react";
import { Button } from "@/app/components/ui/button";
import styles from "./style.module.scss";

interface InfoAnimeProps {
  title: string;
}

export const InfoAnime: FC<InfoAnimeProps> = ({ title }) => {
  return (
    <div className={styles.infoAnime}>
      <h2>{title}</h2>
      <div className={styles.wrapper}>
        <Button isActive={true}>Доступно в 4К </Button>
        <Button type={"secondary"}>Подробнее</Button>
      </div>
    </div>
  );
};
