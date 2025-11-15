"use client";

import { FC, SetStateAction, useState } from "react";

import { SearchIcon } from "@/components/icons/search";
import { Input } from "@/components/ui/input";
import { useOutside } from "@/utils/hooks/useOutside";
import { Ellipse } from "@/components/ui/ellipse";

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
      <Ellipse isOpen={open}>
        {open && (
          <Input
            value={value}
            onChange={handleChangeValue}
            placeholder={"Введите для поиска"}
          />
        )}
        <SearchIcon />
      </Ellipse>
    </div>
  );
};
