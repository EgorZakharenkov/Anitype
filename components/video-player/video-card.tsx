"use client";

import { FC, useEffect, useState } from "react";
import { useAnimeStore } from "@/stores/animeStore";
import { VideoPlayer } from "@/components/video-player/index";
import styles from "./styles.module.scss";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VideoCardProps {
  id: string;
}

export const VideoCard: FC<VideoCardProps> = ({ id }) => {
  const { fetchCurrentAnime, currentAnime } = useAnimeStore();
  const [episode, setEpisode] = useState<string>();

  useEffect(() => {
    fetchCurrentAnime(id);
  }, []);

  const handleChange = (value: string) => {
    setEpisode(value);
  };
  return (
    <div className={styles.videoCard}>
      {episode && <VideoPlayer src={episode} />}
      <div className={styles.settings}>
        <Select onValueChange={handleChange}>
          <SelectTrigger className="w-[200px] text-white">
            <SelectValue placeholder="Выберите серию" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {currentAnime &&
                currentAnime.episodes.map((episode, index) => (
                  <SelectItem key={episode.id} value={episode.hls_720}>
                    {episode.name ? episode.name : index + 1 + " Серия"}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
