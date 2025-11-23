"use client";

import { FC, useEffect } from "react";
import { useAnimeStore } from "@/stores/animeStore";
import { VideoPlayer } from "@/components/video-player/index";
import styles from "./styles.module.scss";

interface VideoCardProps {
  id: string;
}

export const VideoCard: FC<VideoCardProps> = ({ id }) => {
  const { fetchCurrentAnime, currentAnime } = useAnimeStore();

  useEffect(() => {
    fetchCurrentAnime(id);
  }, []);
  return (
    <div className={styles.videoCard}>
      <VideoPlayer src={currentAnime?.episodes[0].hls_720} />
      <div className={styles.settings}></div>
    </div>
  );
};
