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
}

export const AnimeItem: FC<AnimeItemProps> = ({
  id,
  name,
  rating,
  image,
  description,
}) => {
  const { addNavItem } = useNavigationStore();
  const link = `https://static-libria.weekstorm.one${image}`;
  const truncatedDescription = description
    ? description.split(" ").slice(0, 25).join(" ")
    : "Нет описания";

  const handleCLick = () => {
    addNavItem({
      id: name,
      href: `/anime/${id}`,
      label: name,
    });
  };

  return (
    <Link onClick={handleCLick} href={`/anime/${id}`} className={styles.anime}>
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
    </Link>
  );
};
