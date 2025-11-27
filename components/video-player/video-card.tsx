"use client";

import { FC, useEffect, useState } from "react";
import { useAnimeStore } from "@/stores/animeStore";
import { VideoPlayer } from "@/components/video-player/index";
import styles from "./styles.module.scss";
import { CustomSelect } from "@/components/ui/custom-select";

interface VideoCardProps {
  id: string;
}

export const VideoCard: FC<VideoCardProps> = ({ id }) => {
  const { fetchCurrentAnime, currentAnime } = useAnimeStore();
  const [episode, setEpisode] = useState<string>(
    currentAnime?.episodes[0].hls_720 || "",
  );

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
        {currentAnime?.episodes && (
          <CustomSelect
            options={currentAnime.episodes}
            handleChange={handleChange}
          />
        )}
      </div>
    </div>
  );
};
