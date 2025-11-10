import { FC, ReactNode } from "react";
import styles from "./style.module.scss";

interface ButtonProps {
  handleClick?: () => void;
  children?: ReactNode;
  isActive?: boolean;
  type?: "primary" | "secondary";
}

export const Button: FC<ButtonProps> = ({
  children,
  handleClick,
  isActive,
  type = "primary",
}) => {
  return (
    <button
      onClick={handleClick}
      className={`${styles.btn} ${type === "secondary" && styles.secondary} ${isActive && styles.active}`}
    >
      {children}
    </button>
  );
};
