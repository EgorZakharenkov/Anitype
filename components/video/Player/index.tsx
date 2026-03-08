"use client";
import {
  FC,
  useEffect,
  useRef,
  MouseEvent,
  useState,
  useCallback,
} from "react";
import styles from "../styles.module.scss";
import { useVideoPlayer } from "@/lib/hooks/useVideoPlayer";
import { useVideoProgress } from "@/lib/hooks/useVideoProgress";
import {
  Maximize,
  Minimize2,
  Pause,
  Play,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react";
import { ProgressBar } from "@/components/video/ProgressBar";
import { Button } from "@/components/ui/Button";
import { VolumeControl } from "@/components/video/VolumeControl";

interface VideoPlayerProps {
  src: string;
  id: string | number;
}

export const VideoPlayer: FC<VideoPlayerProps> = ({ src, id }) => {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout>(null);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isMouseMoving, setIsMouseMoving] = useState(false);
  const mouseMoveTimeoutRef = useRef<NodeJS.Timeout>(null);

  const {
    videoRef,
    playerRef,
    playerState,
    togglePlay,
    setVolume,
    toggleMute,
    seek,
    toggleFullscreen,
    formatTime,
    handleTimeUpdate,
    handleProgress,
    handlePlay,
    handlePause,
  } = useVideoPlayer();

  const getIconsVolume = useCallback(() => {
    if (playerState.isMuted) return <VolumeX />;
    if (playerState.volume > 0.5) return <Volume2 />;
    return <Volume1 />;
  }, [playerState.isMuted, playerState.volume]);

  // Функция для показа контролов
  const showControls = useCallback(() => {
    setIsControlsVisible(true);
    setIsMouseMoving(true);

    // Сбрасываем таймер мыши
    if (mouseMoveTimeoutRef.current) {
      clearTimeout(mouseMoveTimeoutRef.current);
    }

    // Устанавливаем новый таймер для сброса состояния движения мыши
    mouseMoveTimeoutRef.current = setTimeout(() => {
      setIsMouseMoving(false);
    }, 1000);

    // Сбрасываем таймер скрытия
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    // Если видео играет и мышь не двигается, скрываем контролы через 3 секунды
    if (playerState.isPlaying) {
      hideTimeoutRef.current = setTimeout(() => {
        if (!isMouseMoving) {
          setIsControlsVisible(false);
        }
      }, 3000);
    }
  }, [playerState.isPlaying, isMouseMoving]);

  // Обработчик движения мыши
  const handleMouseMove = useCallback(() => {
    showControls();
  }, [showControls]);

  // Обработчик ухода мыши с контейнера
  const handleMouseLeave = useCallback(() => {
    if (playerState.isPlaying) {
      setIsControlsVisible(false);
    }
  }, [playerState.isPlaying]);

  // Эффект для авто-скрытия в полноэкранном режиме
  useEffect(() => {
    if (playerState.isFullscreen && playerState.isPlaying) {
      const timeout = setTimeout(() => {
        if (!isMouseMoving) {
          setIsControlsVisible(false);
        }
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [playerState.isFullscreen, playerState.isPlaying, isMouseMoving]);

  // Эффект для очистки таймеров
  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      if (mouseMoveTimeoutRef.current) {
        clearTimeout(mouseMoveTimeoutRef.current);
      }
    };
  }, []);

  // Сначала восстанавливаем время
  useEffect(() => {
    const savedTime = localStorage.getItem(`video-progress-${id}`);
    if (savedTime && videoRef.current) {
      const time = parseFloat(savedTime);
      if (!isNaN(time) && time > 0) {
        console.log(`Restoring video time for ${id}:`, time);
        videoRef.current.currentTime = time;
        seek(time);
      }
    }
  }, [id, seek, videoRef]);

  useVideoProgress(id, videoRef, {
    interval: 15,
  });

  // Обработчик перемотки при клике на прогресс-бар
  const handleProgressBarClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current || !videoRef.current || !playerState.duration)
      return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * playerState.duration;

    seek(newTime);
  };

  // Обработчик клика по видео
  const handleVideoClick = useCallback(() => {
    togglePlay();
    showControls(); // Показываем контролы после клика
  }, [togglePlay, showControls]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!videoRef.current) return;

      switch (e.key) {
        case " ":
        case "k":
          e.preventDefault();
          togglePlay();
          break;
        case "m":
          e.preventDefault();
          toggleMute();
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "ArrowRight":
          e.preventDefault();
          seek(Math.min(playerState.currentTime + 10, playerState.duration));
          break;
        case "ArrowLeft":
          e.preventDefault();
          seek(Math.max(playerState.currentTime - 10, 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setVolume(Math.min(playerState.volume + 0.1, 1));
          break;
        case "ArrowDown":
          e.preventDefault();
          setVolume(Math.max(playerState.volume - 0.1, 0));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    playerState.currentTime,
    playerState.duration,
    playerState.volume,
    togglePlay,
    toggleMute,
    toggleFullscreen,
    seek,
    setVolume,
    showControls,
  ]);

  return (
    <div
      ref={playerRef}
      className={styles.videoContainer}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={src}
        preload="metadata"
        crossOrigin="anonymous"
        playsInline
        onClick={handleVideoClick}
        onTimeUpdate={handleTimeUpdate}
        onProgress={handleProgress}
        onPlay={handlePlay}
        onPause={handlePause}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* Кастомные контролы */}
      <div
        className={`${styles.controls} ${
          isControlsVisible ? styles.visible : styles.hidden
        }`}
      >
        <ProgressBar
          progressBarRef={progressBarRef}
          handleProgressBarClick={handleProgressBarClick}
          currentTime={playerState.currentTime}
          duration={playerState.duration}
          buffered={playerState.buffered}
        />
        <div className={styles.controlsBottom}>
          <div className={styles.leftControls}>
            <Button handleClick={togglePlay}>
              {playerState.isPlaying ? <Pause /> : <Play />}
            </Button>

            <div className={styles.volumeControl}>
              <Button handleClick={toggleMute}>{getIconsVolume()}</Button>
              <VolumeControl
                volume={playerState.volume}
                setVolume={setVolume}
                isMuted={playerState.isMuted}
              />
            </div>

            <span className={styles.time}>
              {formatTime(playerState.currentTime)} /{" "}
              {formatTime(playerState.duration)}
            </span>
          </div>

          <div className={styles.rightControls}>
            <Button handleClick={toggleFullscreen}>
              {playerState.isFullscreen ? <Minimize2 /> : <Maximize />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
