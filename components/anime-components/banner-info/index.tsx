import { FC } from "react";
import { Button } from "@/components/ui/button";
import styles from "./style.module.scss";

interface BannerInfoProps {
  title: string;
}

export const BannerInfo: FC<BannerInfoProps> = ({ title }) => {
  return (
    <div className={styles.bannerInfo}>
      <h2>{title}</h2>
      <div className={styles.wrapper}>
        <Button isActive={true}>Доступно в 4К </Button>
        <Button type={"secondary"}>Подробнее</Button>
      </div>
    </div>
  );
};
