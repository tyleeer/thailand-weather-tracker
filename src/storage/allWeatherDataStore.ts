import { weatherDataResponse } from "@/interface/weatherDataResponse";
import { coordinateLocationRespon } from "@/interface/coordinateLocationRespon";
import { create } from "zustand";

const initAllData = {
  allLocation: {
    data: undefined,
    loading: false,
    error: null,
  },
  fetchAllLocation: {
    data: undefined,
    loading: false,
    error: null,
  },
  allWeatherData: {
    data: undefined,
    loading: false,
    error: null,
  },
  fetchAllWeatherData: {
    data: undefined,
    loading: false,
    error: null,
  },
};

type locationType = {
  data: coordinateLocationRespon | undefined;
  loading: boolean;
  error: null;
};

export type allWeatherDataType = {
  data: weatherDataResponse[] | undefined;
  loading: boolean;
  error: null;
};

export type useAllWeatherDataStoreType = {
  allLocation: locationType;
  fetchAllLocation: locationType;
  allWeatherData: allWeatherDataType;
  fetchAllWeatherData: allWeatherDataType;
  setAllLocation: (value: locationType) => void;
  setFetchAllLocation: (value: locationType) => void;
  setAllWeatherData: (value: allWeatherDataType) => void;
  setFetchAllWeatherData: (value: allWeatherDataType) => void;
  clearLocation: () => void;
  clearAllWeatherData: () => void;
};

export const useAllWeatherDataStore = create<useAllWeatherDataStoreType>(
  (set) => ({
    ...initAllData,
    setAllLocation: (value) => set({ allLocation: value }),
    setFetchAllLocation: (value) => set({ fetchAllLocation: value }),
    setAllWeatherData: (value) => set({ allWeatherData: value }),
    setFetchAllWeatherData: (value) => set({ fetchAllWeatherData: value }),
    clearLocation: () =>
      set({
        allLocation: initAllData.allLocation,
        fetchAllLocation: initAllData.fetchAllLocation,
      }),
    clearAllWeatherData: () =>
      set({
        allWeatherData: initAllData.allWeatherData,
        fetchAllWeatherData: initAllData.fetchAllWeatherData,
      }),
  })
);
