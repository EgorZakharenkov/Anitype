"use client";

import { FC, SetStateAction, useEffect, useState } from "react";
import { Ellipse } from "@/components/ui/Ellipse";
import { Input } from "@/components/ui/Input";
import { SearchIcon } from "@/components/shared/icons/search";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useAnimeStore } from "@/stores/animeStore";
import { AnimeSearchItem } from "@/components/anime/AnimeSearchItem";

interface SearchProps {
  value?: string;
}

export const Search: FC<SearchProps> = ({}) => {
  const [value, setValue] = useState<string>("");
  const searchValue = useDebounce(value, 500);
  const { fetchSearchAnime, searchAnime } = useAnimeStore();

  useEffect(() => {
    if (searchValue) {
      fetchSearchAnime(searchValue);
    }
  }, [fetchSearchAnime, searchValue]);

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
        <DialogContent className="sm:max-w-[1200px] h-11/12 overflow-scroll">
          <DialogHeader>
            <Input
              value={value}
              placeholder={"Название аниме..."}
              onChange={handleChangeValue}
            />
          </DialogHeader>
          {searchAnime &&
            searchAnime.map(({ poster, name, id }) => (
              <AnimeSearchItem
                key={id}
                image={poster.preview}
                name={name.main}
              />
            ))}
        </DialogContent>
      </form>
    </Dialog>
  );
};
