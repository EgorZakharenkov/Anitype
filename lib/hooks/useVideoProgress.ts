import { useEffect, RefObject } from "react";

export function useVideoProgress(
  videoId: string | number,
  videoRef: RefObject<HTMLVideoElement | null>,
): void {
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const savedTime = localStorage.getItem(`video_${videoId}_time`);
    if (savedTime) {
      const time = parseFloat(savedTime);

      const restoreTime = () => {
        if (
          videoElement.duration &&
          videoElement.duration > 0 &&
          !isNaN(videoElement.duration) &&
          time > 0 &&
          time < videoElement.duration - 1
        ) {
          videoElement.currentTime = time;
          console.log(`🎬 Восстановлено время: ${time.toFixed(1)} сек`);
        }
      };

      // Пробуем восстановить сразу, если метаданные уже загружены
      if (videoElement.readyState >= 2) {
        // HAVE_CURRENT_DATA или выше
        restoreTime();
      } else {
        // Ждем загрузки метаданных
        const handleLoadedMetadata = () => {
          restoreTime();
        };

        // Также пробуем восстановить когда можно начинать воспроизведение
        const handleCanPlay = () => {
          restoreTime();
        };

        videoElement.addEventListener("loadedmetadata", handleLoadedMetadata, {
          once: true,
        });
        videoElement.addEventListener("canplay", handleCanPlay, { once: true });

        const timeoutId = setTimeout(() => {
          if (videoElement.readyState > 0) {
            restoreTime();
          }
        }, 2000);

        return () => {
          clearTimeout(timeoutId);
        };
      }
    }

    let lastSavedTime = 0;
    const SAVE_INTERVAL = 5000; // Сохраняем каждые 3 секунды

    const saveProgress = (force = false) => {
      const now = Date.now();
      const currentTime = videoElement.currentTime;

      // Сохраняем если:
      // 1. Принудительно (force = true)
      // 2. Прошло больше SAVE_INTERVAL мс с последнего сохранения
      // 3. Видео на паузе
      if (force || now - lastSavedTime > SAVE_INTERVAL || videoElement.paused) {
        localStorage.setItem(`video_${videoId}_time`, currentTime.toString());
        lastSavedTime = now;
      }
    };

    const handlePause = () => saveProgress(true);
    const handleSeeked = () => saveProgress(true);
    const handleEnded = () => {
      localStorage.removeItem(`video_${videoId}_time`);
    };

    const intervalId = setInterval(() => {
      if (!videoElement.paused) {
        saveProgress();
      }
    }, SAVE_INTERVAL);

    let timeUpdateTimeout: NodeJS.Timeout;
    const handleTimeUpdate = () => {
      if (videoElement.paused) return;

      clearTimeout(timeUpdateTimeout);
      timeUpdateTimeout = setTimeout(() => {
        saveProgress();
      }, 1000);
    };

    videoElement.addEventListener("pause", handlePause);
    videoElement.addEventListener("seeked", handleSeeked);
    videoElement.addEventListener("ended", handleEnded);
    videoElement.addEventListener("timeupdate", handleTimeUpdate);

    const handleBeforeUnload = () => {
      saveProgress(true);
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeUpdateTimeout);

      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (videoElement) {
        videoElement.removeEventListener("pause", handlePause);
        videoElement.removeEventListener("seeked", handleSeeked);
        videoElement.removeEventListener("ended", handleEnded);
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);

        saveProgress(true);
      }
    };
  }, [videoId, videoRef]);
}
