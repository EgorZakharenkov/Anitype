import { FC } from "react";
import styles from "./style.module.scss";
import { formatValue } from "@/utils/helpers/formatValue";
interface AboutAnimeCardProps {
  data: {
    key: string;
    value: string | number | string[];
  }[];
}

export const AboutAnimeCard: FC<AboutAnimeCardProps> = ({ data }) => {
  return (
    <div className={styles.list}>
      {data.map(({ key, value }) => (
        <div key={key} className={styles.item}>
          <p className={styles.name}>{key}</p>
          <h4 className={styles.value}>{formatValue(value)}</h4>
        </div>
      ))}
    </div>
  );
};
