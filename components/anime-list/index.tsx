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
            titles.map((anime) => (
              <CarouselItem className="lg:basis-1/6" key={anime.id}>
                <AnimeItem
                  key={anime.id}
                  name={anime.name.main}
                  rating={"5,90"}
                  image={anime.poster.preview}
                  description={anime.description}
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
