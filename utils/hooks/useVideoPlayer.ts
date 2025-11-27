import { useState, useRef, useCallback } from "react";
import { PlayerState } from "@/types/video.types";

export const useVideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    playbackRate: 1,
    isFullscreen: false,
    showControls: true,
    buffered: 0,
    quality: "auto",
    isSettingsOpen: false,
  });

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;

    if (playerState.isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }, [playerState.isPlaying]);

  const setVolume = useCallback((volume: number) => {
    if (!videoRef.current) return;

    videoRef.current.volume = volume;
    setPlayerState((prev) => ({
      ...prev,
      volume,
      isMuted: volume === 0,
    }));
  }, []);

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return;

    const newMutedState = !playerState.isMuted;
    videoRef.current.muted = newMutedState;
    setPlayerState((prev) => ({
      ...prev,
      isMuted: newMutedState,
    }));
  }, [playerState.isMuted]);

  const seek = useCallback((time: number) => {
    if (!videoRef.current) return;

    videoRef.current.currentTime = time;
    setPlayerState((prev) => ({ ...prev, currentTime: time }));
  }, []);

  const setPlaybackRate = useCallback((rate: number) => {
    if (!videoRef.current) return;

    videoRef.current.playbackRate = rate;
    setPlayerState((prev) => ({ ...prev, playbackRate: rate }));
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (!playerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await playerRef.current.requestFullscreen();
        setPlayerState((prev) => ({ ...prev, isFullscreen: true }));
      } else {
        await document.exitFullscreen();
        setPlayerState((prev) => ({ ...prev, isFullscreen: false }));
      }
    } catch (error) {
      console.error("Fullscreen error:", error);
    }
  }, []);

  const formatTime = useCallback((time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;

    setPlayerState((prev) => ({
      ...prev,
      currentTime: videoRef.current!.currentTime,
      duration: videoRef.current!.duration || 0,
    }));
  }, []);

  const handleProgress = useCallback(() => {
    if (!videoRef.current) return;

    const buffered = videoRef.current.buffered;
    if (buffered.length > 0) {
      const bufferedEnd = buffered.end(buffered.length - 1);
      setPlayerState((prev) => ({ ...prev, buffered: bufferedEnd }));
    }
  }, []);

  const handlePlay = useCallback(() => {
    setPlayerState((prev) => ({ ...prev, isPlaying: true }));
  }, []);

  const handlePause = useCallback(() => {
    setPlayerState((prev) => ({ ...prev, isPlaying: false }));
  }, []);

  return {
    videoRef,
    playerRef,
    playerState,
    setPlayerState,
    togglePlay,
    setVolume,
    toggleMute,
    seek,
    setPlaybackRate,
    toggleFullscreen,
    formatTime,
    handleTimeUpdate,
    handleProgress,
    handlePlay,
    handlePause,
  };
};
