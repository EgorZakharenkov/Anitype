import { create } from "zustand";

interface PlayerState {
  isPlaying: boolean;
  volume: number;
  fullscreen: boolean;

  setPlaying: (value: boolean) => void;
  setVolume: (value: number) => void;
  setFullscreen: (value: boolean) => void;
  togglePlay: (value: boolean) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  volume: 1,
  fullscreen: false,

  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setPlaying: (value) => set({ isPlaying: value }),
  setVolume: (value) => set({ volume: value }),
  setFullscreen: (value) => set({ fullscreen: value }),
}));
