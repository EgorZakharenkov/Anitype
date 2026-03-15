"use client";

import { FC, useEffect, useState, useMemo } from "react";
import { useAnimeStore } from "@/stores/animeStore";
import styles from "../styles.module.scss";

import { useEpisodeStore } from "@/stores/episodeStore";
import { VideoPlayer } from "@/components/video/Player";
import { CustomSelect } from "@/components/ui/CustomSelect";
import {
  episodeToSelectOptions,
  qualitiesToSelectOptions,
} from "@/lib/helpers/selectHelprer";

interface VideoCardProps {
  id: string;
}

export const VideoCard: FC<VideoCardProps> = ({ id }) => {
  const { fetchCurrentAnime, currentAnime } = useAnimeStore();
  const { getEpisodeIndex, changeCurrentEpisode } = useEpisodeStore();
  const [selectedQuality, setSelectedQuality] = useState<string>("720p");
  const [currentAnimeEpisodeIndex, setCurrentAnimeEpisodeIndex] =
    useState<number>(getEpisodeIndex(id));

  const videoUrl = useMemo(() => {
    const episode = currentAnime?.episodes[currentAnimeEpisodeIndex];
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
  }, [currentAnime, currentAnimeEpisodeIndex, selectedQuality]);

  const currentEpisode = currentAnime?.episodes[currentAnimeEpisodeIndex];

  useEffect(() => {
    fetchCurrentAnime(id);
  }, [id]);

  const handleEpisodeChange = (value: string) => {
    const episodeIndex = parseInt(value);
    changeCurrentEpisode({ id: id, episodeIndex });
    setCurrentAnimeEpisodeIndex(episodeIndex);
  };

  const handleQualityChange = (value: string) => {
    setSelectedQuality(value);
  };

  return (
    <div className={styles.videoCard}>
      {videoUrl && (
        <VideoPlayer opening={currentEpisode?.opening} id={id} src={videoUrl} />
      )}
      <div className={styles.settings}>
        {currentAnime && (
          <CustomSelect
            options={episodeToSelectOptions(currentAnime.episodes)}
            value={currentAnimeEpisodeIndex.toString()}
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
