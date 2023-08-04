import { weatherDataResponse } from "@/interface/weatherDataResponse";
import { AxiosError, AxiosResponse } from "axios";
import { create } from "zustand";

const initSelection = {
  coordSelected: {
    lat: undefined,
    lon: undefined,
    name: undefined,
    local_name: undefined,
  },
  fetchDataSelected: {
    data: undefined,
    loading: false,
    error: undefined,
  },
  showDetail: "off",
};

export type coordsType = {
  lat: number | undefined;
  lon: number | undefined;
  name: string | undefined | any;
  local_name: string | undefined | any;
};

export type dataType = {
  data: weatherDataResponse | undefined;
  loading: boolean;
  error: AxiosResponse | AxiosError<AxiosResponse> | undefined;
};

type useSelectionStore = {
  fetchDataSelected: dataType;
  coordSelected: coordsType;
  showDetail: string;
  setCoordSelected: (value: coordsType) => void;
  setFetchDataSelected: (value: dataType) => void;
  setShowDetail: (value: string) => void;
  clearSelection: () => void;
};

export const useSelectionStore = create<useSelectionStore>((set) => ({
  ...initSelection,
  setCoordSelected: (value) => set({ coordSelected: value }),
  setFetchDataSelected: (value) => set({ fetchDataSelected: value }),
  setShowDetail: (value) => set({ showDetail: value }),
  clearSelection: () => set({ ...initSelection }),
}));
