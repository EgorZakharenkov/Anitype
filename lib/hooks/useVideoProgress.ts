import { useEffect, RefObject } from "react";

export function useVideoProgress(
  videoId: string | number,
  videoRef: RefObject<HTMLVideoElement | null>,
): void {
  useEffect(() => {
    if (!videoRef.current) return;

    // Загружаем сохраненное время
    const savedTime = localStorage.getItem(`video_${videoId}_time`);
    if (savedTime) {
      const time = parseFloat(savedTime);
      // Проверяем, что видео готово к воспроизведению
      const setTime = () => {
        if (videoRef.current && time > 0) {
          // Проверяем, что время меньше длительности видео
          if (videoRef.current.duration && time < videoRef.current.duration) {
            videoRef.current.currentTime = time;
          }
        }
      };

      if (videoRef.current.readyState >= 1) {
        setTime();
      } else {
        videoRef.current.addEventListener("loadedmetadata", setTime, {
          once: true,
        });
      }
    }

    // Сохраняем каждые 5 секунд
    const interval = setInterval(() => {
      if (videoRef.current && !videoRef.current.paused) {
        localStorage.setItem(
          `video_${videoId}_time`,
          videoRef.current.currentTime.toString(),
        );
      }
    }, 5000);

    return () => {
      clearInterval(interval);

      // Сохраняем при размонтировании
      if (videoRef.current) {
        localStorage.setItem(
          `video_${videoId}_time`,
          videoRef.current.currentTime.toString(),
        );
      }
    };
  }, [videoId, videoRef]);
}
