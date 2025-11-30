"use client";

import { FC, useEffect, useState, useMemo } from "react";
import { useAnimeStore } from "@/stores/animeStore";
import { VideoPlayer } from "@/components/video-player/index";
import styles from "./styles.module.scss";
import { CustomSelect } from "@/components/ui/custom-select";
import {
  episodeToSelectOptions,
  qualitiesToSelectOptions,
} from "@/utils/helpers/selectHelprer";
import { useEpisodeStore } from "@/stores/episodeStore";

interface VideoCardProps {
  id: string;
}

export const VideoCard: FC<VideoCardProps> = ({ id }) => {
  const { fetchCurrentAnime, currentAnime } = useAnimeStore();
  const { currentEpisodeIndex, changeCurrentEpisode } = useEpisodeStore();
  const [selectedQuality, setSelectedQuality] = useState<string>("720p");

  const videoUrl = useMemo(() => {
    const episode = currentAnime?.episodes[currentEpisodeIndex];
    if (!episode) return "";

    switch (selectedQuality) {
      case "480p":
        return episode.hls_480 || "";
      case "720p":
        return episode.hls_720 || "";
      case "1080p":
        return episode.hls_1080 || "";
      default:
        return episode.hls_720 || "";
    }
  }, [currentAnime, currentEpisodeIndex, selectedQuality]);

  const currentEpisode = currentAnime?.episodes[currentEpisodeIndex];

  useEffect(() => {
    fetchCurrentAnime(id);
  }, [id, fetchCurrentAnime]);

  const handleEpisodeChange = (value: string) => {
    const episodeIndex = parseInt(value);
    changeCurrentEpisode(episodeIndex);
  };

  const handleQualityChange = (value: string) => {
    setSelectedQuality(value);
  };

  return (
    <div className={styles.videoCard}>
      {videoUrl && <VideoPlayer src={videoUrl} />}
      <div className={styles.settings}>
        {currentAnime && (
          <CustomSelect
            options={episodeToSelectOptions(currentAnime.episodes)}
            value={currentEpisodeIndex.toString()}
            onValueChange={handleEpisodeChange}
            placeholder="Выберите серию"
          />
        )}
        {currentEpisode && (
          <CustomSelect
            options={qualitiesToSelectOptions(currentEpisode)}
            value={selectedQuality}
            onValueChange={handleQualityChange}
            placeholder="Качество"
          />
        )}
      </div>
    </div>
  );
};
