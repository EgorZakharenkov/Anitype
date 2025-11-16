export interface VideoSource {
  src: string;
  type: string;
  quality: string;
}

export interface VideoPlayerProps {
  sources: VideoSource[];
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onTimeUpdate?: (currentTime: number) => void;
}

export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
  isFullscreen: boolean;
  showControls: boolean;
  buffered: number;
  quality: string;
  isSettingsOpen: boolean;
}
