"use client";

import { FC, SetStateAction, useState } from "react";

import { SearchIcon } from "@/app/components/icons/search";
import { Input } from "@/app/components/ui/input";
import styles from "./style.module.scss";
import { useOutside } from "@/app/utils/hooks/useOutside";

interface SearchProps {
  value?: string;
}

export const Search: FC<SearchProps> = ({}) => {
  const [value, setValue] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const outsideClick = useOutside(() => setOpen(false));

  const handleClick = () => {
    setOpen(true);
  };

  const handleChangeValue = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setValue(e.target.value);
  };
  return (
    <div ref={outsideClick} onClick={handleClick}>
      <div className={`${styles.search} ${open && styles.open}`}>
        {open && (
          <Input
            value={value}
            onChange={handleChangeValue}
            placeholder={"Введите для поиска"}
          />
        )}
        <SearchIcon />
      </div>
    </div>
  );
};
