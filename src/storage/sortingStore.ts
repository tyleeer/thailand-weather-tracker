import { create } from "zustand";

const initSorting = {
  sortName: {
    ascending: "on",
    descending: "off",
    default: "off",
  },
  sortTemp: {
    ascending: "off",
    descending: "off",
    default: "on",
  },
  sortHumi: {
    ascending: "off",
    descending: "off",
    default: "on",
  },
  sortSunr: {
    ascending: "off",
    descending: "off",
    default: "on",
  },
  sortSuns: {
    ascending: "off",
    descending: "off",
    default: "on",
  },
};

export type sortOptionsType = {
  ascending: string;
  descending: string;
  default: string;
};

type useSortingStore = {
  sortName: sortOptionsType;
  sortTemp: sortOptionsType;
  sortHumi: sortOptionsType;
  sortSunr: sortOptionsType;
  sortSuns: sortOptionsType;
  setSortName: (value: any) => void;
  setSortTemp: (value: any) => void;
  setSortHumi: (value: any) => void;
  setSortSunr: (value: any) => void;
  setSortSuns: (value: any) => void;
  clearAll: () => void;
};

export const useSortingStore = create<useSortingStore>((set) => ({
  ...initSorting,
  setSortName: (value) => set({ sortName: value }),
  setSortTemp: (value) => set({ sortTemp: value }),
  setSortHumi: (value) => set({ sortHumi: value }),
  setSortSunr: (value) => set({ sortSunr: value }),
  setSortSuns: (value) => set({ sortSuns: value }),
  clearAll: () => set({ ...initSorting }),
}));
