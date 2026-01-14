import { FC } from "react";
import styles from "./styles.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useNavigationStore } from "@/stores/navigationStore";

interface AnimeSearchItemProps {
  image: string;
  name: string;
  id: number;
}

export const AnimeSearchItem: FC<AnimeSearchItemProps> = ({
  image,
  name,
  id,
}) => {
  const { addNavItem, clearNavItems } = useNavigationStore();

  const handleCLick = () => {
    clearNavItems();
    addNavItem({
      href: `/anime/${id}`,
      label: name,
    });
  };
  return (
    <Link
      onClick={handleCLick}
      href={`/anime/${id}`}
      className={styles.searchItem}
    >
      <Image
        src={`https://static-libria.weekstorm.one${image}`}
        alt={name}
        width={50}
        height={50}
      />
      <h2>{name}</h2>
    </Link>
  );
};
