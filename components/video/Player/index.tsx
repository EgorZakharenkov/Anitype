"use client";
import { FC } from "react";
import styles from "../styles.module.scss";
import { useVideoPlayer } from "@/lib/hooks/useVideoPlayer";
interface VideoPlayerProps {
  src: string;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({ src }) => {
  const { playerState, setPlayerState, playerRef, videoRef } = useVideoPlayer();

  return (
    <div className={styles.videoContainer} ref={playerRef}>
      <video ref={videoRef} src={src} controls></video>
    </div>
  );
};
