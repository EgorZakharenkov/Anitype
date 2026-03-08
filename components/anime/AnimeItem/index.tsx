import { FC } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useNavigationStore } from "@/stores/navigationStore";

interface AnimeItemProps {
  id: number;
  rating: string;
  name: string;
  image: string;
  description?: string;
  episodes: string;
}

export const AnimeListItem: FC<AnimeItemProps> = ({
  id,
  name,
  rating,
  image,
  description,
  episodes,
}) => {
  const { addNavItem } = useNavigationStore();
  const link = `https://static-libria.weekstorm.one${image}`;
  const truncatedDescription = description
    ? description.split(" ").slice(0, 25).join(" ")
    : "Нет описания";

  const episodesInfo = episodes ? `${episodes} эпизодов` : "";
  const handleCLick = () => {
    addNavItem({
      href: `/anime/${id}`,
      label: name,
    });
  };
  return (
    <Link onClick={handleCLick} href={`/anime/${id}`} className={styles.anime}>
      <div className={styles.wrapper}>
        <span className={styles.rating}>{rating}</span>
        <Image
          width={300}
          height={180}
          className={styles.image}
          src={link}
          alt={"anime image"}
        />
        <h4 className={styles.description}>{truncatedDescription}...</h4>
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{name}</span>
        <p className={styles.episodes}>{episodesInfo}</p>
      </div>
    </Link>
  );
};
