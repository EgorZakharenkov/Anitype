import { FC } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

interface AnimeItemProps {
  rating: string;
  name: string;
  image: string;
}

export const AnimeItem: FC<AnimeItemProps> = ({ name, rating, image }) => {
  const link = `https://static-libria.weekstorm.one${image}`;

  return (
    <div className={styles.anime}>
      <span className={styles.rating}>{rating}</span>
      <span className={styles.name}>{name}</span>
      <Image
        width={300}
        height={145}
        className={styles.image}
        src={link}
        alt={"anime image"}
      />
    </div>
  );
};
