import styles from "@/app/styles.module.scss";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { AnimeItem } from "@/components/anime-item";
import { AnimeList } from "@/app/types/anime.types";
import { FC } from "react";

interface AnimeListProps {
  titles: AnimeList[] | null;
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
                <AnimeItem
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
