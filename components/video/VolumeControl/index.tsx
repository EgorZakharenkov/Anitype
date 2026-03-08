import { FC } from "react";
import styles from "@/components/video/styles.module.scss";

interface VolumeControlProps {
  isMuted: boolean;
  volume: number;
  setVolume: (volume: number) => void;
}

export const VolumeControl: FC<VolumeControlProps> = ({
  isMuted,
  volume,
  setVolume,
}) => {
  return (
    <input
      type="range"
      min="0"
      max="1"
      step="0.05"
      value={isMuted ? 0 : volume}
      onChange={(e) => setVolume(parseFloat(e.target.value))}
      className={styles.volumeSlider}
    />
  );
};
