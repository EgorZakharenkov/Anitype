import { ReactNode } from "react";
import styles from "./style.module.scss";

export const Container = ({ children }: Readonly<{ children: ReactNode }>) => {
  return <div className={styles.container}>{children}</div>;
};
