import { FC, ReactNode } from "react";
import styles from "./style.module.scss";
interface EllipseProps {
  children?: ReactNode;
}

export const Ellipse: FC<EllipseProps> = ({ children }) => {
  return <div className={styles.ellipse}>{children}</div>;
};
