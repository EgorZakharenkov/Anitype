"use client";

import { FC, SetStateAction, useEffect, useState } from "react";
import { Ellipse } from "@/components/ui/Ellipse";
import { Input } from "@/components/ui/Input";
import { SearchIcon } from "@/components/shared/icons/search";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/shadcn/dialog";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useAnimeStore } from "@/stores/animeStore";
import { AnimeSearchItem } from "@/components/anime/AnimeSearchItem";
import styles from "./style.module.scss";
interface SearchProps {
  value?: string;
}

export const Search: FC<SearchProps> = ({}) => {
  const [value, setValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form action="">
        <DialogTrigger onClick={handleOpen}>
          <Ellipse>
            <SearchIcon />
          </Ellipse>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1200px] h-11/12 overflow-scroll">
          <DialogHeader className="sticky top-[-23px] p-4 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <DialogTitle className="text-white">Поиск</DialogTitle>
            <Input
              value={value}
              placeholder={"Название аниме..."}
              onChange={handleChangeValue}
            />
          </DialogHeader>
          <div className={styles.wrapper}>
            {searchAnime &&
              searchAnime.map(({ poster, name, id }) => (
                <DialogClose onClick={handleClose} key={id}>
                  <AnimeSearchItem
                    id={id}
                    image={poster.preview}
                    name={name.main}
                  />
                </DialogClose>
              ))}
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};
