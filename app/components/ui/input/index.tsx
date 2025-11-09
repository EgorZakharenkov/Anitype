import { ChangeEvent, FC } from "react";
import styles from "./style.module.scss";
interface InputProps {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export const Input: FC<Partial<InputProps>> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      className={styles.input}
      placeholder={placeholder}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
};
