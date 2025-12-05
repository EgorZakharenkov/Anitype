import { FC } from "react";
import styles from "./style.module.scss";
import { AnimeItem } from "@/types/anime.types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/shadcn/carousel";
import { AnimeListItem } from "@/components/anime/AnimeItem";

interface AnimeListProps {
  titles: AnimeItem[] | null;
  loading?: boolean;
  error: boolean;
  title: string;
}

export const ListAnime: FC<AnimeListProps> = ({ error, titles, title }) => {
  return (
    <div className={styles.animeList}>
      <h3>{title}</h3>
      {error && "Плохо"}
      <Carousel>
        <CarouselContent>
          {titles ? (
            titles.map(({ id, name, poster, description }) => (
              <CarouselItem className="lg:basis-1/6" key={id}>
                <AnimeListItem
                  id={id}
                  key={id}
                  name={name.main}
                  rating={"5,90"}
                  image={poster.preview}
                  description={description}
                />
              </CarouselItem>
            ))
          ) : (
            <h1>Загрузка</h1>
          )}
        </CarouselContent>
      </Carousel>
    </div>
  );
};
