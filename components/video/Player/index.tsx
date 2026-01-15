"use client";
import { FC, useRef } from "react";
import styles from "../styles.module.scss";
import { useVideoProgress } from "@/lib/hooks/useVideoProgress";

interface VideoPlayerProps {
  src: string;
  id: string | number;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({ src, id }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useVideoProgress(id, videoRef);

  return (
    <div className={styles.videoContainer}>
      <video
        ref={videoRef}
        src={src}
        controls
        preload="metadata" // Важно для быстрой загрузки метаданных
        crossOrigin="anonymous" // Может помочь с некоторыми CORS проблемами
        playsInline // Для мобильных устройств
      />
    </div>
  );
};
