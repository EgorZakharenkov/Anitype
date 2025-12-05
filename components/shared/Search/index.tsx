"use client";

import { FC, SetStateAction, useState } from "react";
import { useOutside } from "@/lib/hooks/useOutside";
import { Ellipse } from "@/components/ui/Ellipse";
import { Input } from "@/components/ui/Input";
import { SearchIcon } from "@/components/shared/icons/search";

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
