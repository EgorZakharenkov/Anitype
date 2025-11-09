import { FC } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

interface AnimeItemProps {
  rating: string;
  name: string;
  image: string;
}

export const AnimeItem: FC<AnimeItemProps> = ({ name, rating, image }) => {
  return (
    <div className={styles.anime}>
      <span className={styles.rating}>{rating}</span>
      <span className={styles.name}>{name}</span>
      <Image className={styles.image} src={image} alt={"anime image"} />
    </div>
  );
};
