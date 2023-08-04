import { weatherDataResponse } from "@/interface/weatherDataResponse";
import { create } from "zustand";

const initWatchlist = {
  watchlist: {
    data: [],
    loading: false,
    error: null,
  },
};

export type watchlistType = {
  data: weatherDataResponse[] | undefined;
  loading: boolean;
  error: null;
};

type useWatchlist = {
  watchlist: watchlistType;
  setWatchlist: (value: watchlistType) => void;
  clearWatchlist: () => void;
};

export const useWatchlist = create<useWatchlist>((set) => ({
  ...initWatchlist,
  setWatchlist: (value) => set({ watchlist: value }),
  clearWatchlist: () => set({ ...initWatchlist }),
}));
