import { RefObject, useEffect, useRef } from "react";

interface UseVideoProgressOptions {
  enabled?: boolean;
  interval?: number;
  onProgress?: (time: number) => void;
}

export const useVideoProgress = (
  id: string | number,
  videoRef: RefObject<HTMLVideoElement | null>,
  options: UseVideoProgressOptions = {},
) => {
  const { enabled = true, interval = 15, onProgress } = options;

  const lastSavedTimeRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (!videoRef.current || !enabled) return;

    const video = videoRef.current;
    const storageKey = `video-progress-${id}`;

    // Сохранение прогресса
    const saveProgress = () => {
      const currentTime = video.currentTime;

      if (
        currentTime > 0 &&
        Math.abs(currentTime - lastSavedTimeRef.current) > 1
      ) {
        localStorage.setItem(storageKey, currentTime.toString());
        lastSavedTimeRef.current = currentTime;
        onProgress?.(currentTime);
        console.log(`Saved progress for ${id}:`, currentTime);
      }
    };

    // Сохраняем на паузе
    const handlePause = () => {
      saveProgress();
    };

    // Сохраняем при размонтировании
    const handleBeforeUnload = () => {
      saveProgress();
    };

    // Интервальное сохранение
    intervalRef.current = setInterval(saveProgress, interval * 1000);

    // Добавляем обработчики событий
    video.addEventListener("pause", handlePause);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      saveProgress();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      video.removeEventListener("pause", handlePause);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [id, videoRef, enabled, interval, onProgress]);
};
