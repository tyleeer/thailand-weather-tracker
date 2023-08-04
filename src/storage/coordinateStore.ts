import { coordinateLocationRespon } from "@/interface/coordinateLocationRespon";
import { create } from "zustand";

const initLocation = {
  location: {
    data: undefined,
    loading: false,
    error: null,
  },
};

export type locationType = {
  data: coordinateLocationRespon | undefined;
  loading: boolean;
  error: null;
};

type useCoordinateStore = {
  location: locationType;
  setLocation: (value: locationType) => void;
  clearLocation: () => void;
};

export const useCoordinateStore = create<useCoordinateStore>((set) => ({
  ...initLocation,
  setLocation: (value) => set({ location: value }),
  clearLocation: () => set({ ...initLocation }),
}));
