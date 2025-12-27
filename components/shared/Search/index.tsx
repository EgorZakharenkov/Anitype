"use client";

import { FC, SetStateAction, useState } from "react";
import { Ellipse } from "@/components/ui/Ellipse";
import { Input } from "@/components/ui/Input";
import { SearchIcon } from "@/components/shared/icons/search";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";

interface SearchProps {
  value?: string;
}

export const Search: FC<SearchProps> = ({}) => {
  const [value, setValue] = useState<string>("");

  const handleChangeValue = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setValue(e.target.value);
  };
  return (
    <Dialog>
      <form action="">
        <DialogTrigger>
          <Ellipse>
            <SearchIcon />
          </Ellipse>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1200px] h-11/12">
          <DialogHeader>
            <Input
              value={value}
              placeholder={"Название аниме..."}
              onChange={handleChangeValue}
            />
          </DialogHeader>
        </DialogContent>
      </form>
    </Dialog>
  );
};
