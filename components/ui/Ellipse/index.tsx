import { FC, ReactNode } from "react";
import styles from "./style.module.scss";
interface EllipseProps {
  children?: ReactNode;
  isOpen?: boolean;
}

export const Ellipse: FC<EllipseProps> = ({ children, isOpen }) => {
  return (
    <div className={`${styles.ellipse} ${isOpen && styles.open}`}>
      {children}
    </div>
  );
};
