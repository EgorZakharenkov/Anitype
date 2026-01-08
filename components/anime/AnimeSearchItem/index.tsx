import { FC } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
interface AnimeSearchItemProps {
  image: string;
  name: string;
}

export const AnimeSearchItem: FC<AnimeSearchItemProps> = ({ image, name }) => {
  return (
    <div className={styles.searchItem}>
      <Image
        src={`https://static-libria.weekstorm.one${image}`}
        alt={name}
        width={50}
        height={50}
      />
      <h2>{name}</h2>
    </div>
  );
};
