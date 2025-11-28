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

interface VideoCardProps {
  id: string;
}

export const VideoCard: FC<VideoCardProps> = ({ id }) => {
  const { fetchCurrentAnime, currentAnime } = useAnimeStore();
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState<number>(0);
  const [selectedQuality, setSelectedQuality] = useState<string>("720p");

  const videoUrl = useMemo(() => {
    const episode = currentAnime?.episodes[selectedEpisodeIndex];
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
  }, [currentAnime, selectedEpisodeIndex, selectedQuality]);

  const currentEpisode = currentAnime?.episodes[selectedEpisodeIndex];

  useEffect(() => {
    fetchCurrentAnime(id);
  }, [id, fetchCurrentAnime]);

  const handleEpisodeChange = (value: string) => {
    const episodeIndex = parseInt(value);
    setSelectedEpisodeIndex(episodeIndex);
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
            value={selectedEpisodeIndex.toString()}
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
