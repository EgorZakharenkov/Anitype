import { Episode } from "@/types/anime.types";
import { SelectOption } from "@/components/ui/custom-select";

export const episodeToSelectOptions = (episodes: Episode[]): SelectOption[] => {
  return episodes.map((episode, index) => ({
    value: index.toString(),
    label: episode.name || `${index + 1} Серия`,
  }));
};

export const qualitiesToSelectOptions = (episode: Episode): SelectOption[] => {
  const qualities = [];
  if (episode.hls_480) qualities.push({ value: "480p", label: "480p" });
  if (episode.hls_720) qualities.push({ value: "720p", label: "720p" });
  if (episode.hls_1080) qualities.push({ value: "1080p", label: "1080p" });
  return qualities;
};
