"use client";

import { FC } from "react";
import { useVideoPlayer } from "@/utils/hooks/useVideoPlayer";

interface VideoPlayerProps {
  src: string;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({ src }) => {
  const { playerState, setPlayerState, playerRef, videoRef } = useVideoPlayer();

  return (
    <div ref={playerRef}>
      <video ref={videoRef} src={src} controls></video>
    </div>
  );
};
