import { weatherDataResponse } from "@/interface/weatherDataResponse";
import { create } from "zustand";

const initData = {
  fetchWeatherData: { data: undefined, loading: false, error: null },
};

export type dataType = {
  data: weatherDataResponse | undefined;
  loading: boolean;
  error: null;
};

type weatherDataStore = {
  fetchWeatherData: dataType;
  setFetchWeatherData: (value: dataType) => void;
  clearWeatherData: () => void;
};

export const useWeatherDataStore = create<weatherDataStore>((set) => ({
  ...initData,
  setFetchWeatherData: (value) => set({ fetchWeatherData: value }),
  clearWeatherData: () => set({ ...initData }),
}));
