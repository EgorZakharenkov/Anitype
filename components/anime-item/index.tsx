import { FC } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";

interface AnimeItemProps {
  rating: string;
  name: string;
  image: string;
  description?: string;
}

export const AnimeItem: FC<AnimeItemProps> = ({
  name,
  rating,
  image,
  description,
}) => {
  const link = `https://static-libria.weekstorm.one${image}`;
  const truncatedDescription = description
    ? description.split(" ").slice(0, 25).join(" ")
    : "Нет описания";

  return (
    <div className={styles.anime}>
      <span className={styles.rating}>{rating}</span>
      <span className={styles.name}>{name}</span>
      <Image
        width={300}
        height={180}
        className={styles.image}
        src={link}
        alt={"anime image"}
      />
      <h4 className={styles.description}>{truncatedDescription}...</h4>
    </div>
  );
};
