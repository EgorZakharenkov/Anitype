import { FC, Ref } from "react";
import styles from "@/components/video/styles.module.scss";

interface ProgressBarProps {
  progressBarRef: Ref<HTMLDivElement | null>;
  handleProgressBarClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  currentTime: number;
  duration: number;
  buffered: number;
}

export const ProgressBar: FC<ProgressBarProps> = ({
  progressBarRef,
  handleProgressBarClick,
  currentTime,
  duration,
  buffered,
}) => {
  return (
    <div
      ref={progressBarRef}
      className={styles.progressBar}
      onClick={handleProgressBarClick}
    >
      <div
        className={styles.progress}
        style={{
          width: `${(currentTime / duration) * 100 || 0}%`,
        }}
      />
      <div
        className={styles.buffer}
        style={{
          width: `${(buffered / duration) * 100 || 0}%`,
        }}
      />
    </div>
  );
};
