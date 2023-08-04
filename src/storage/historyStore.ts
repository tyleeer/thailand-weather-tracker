import {
  coordinateLocationList,
  coordinateLocationRespon,
} from "@/interface/coordinateLocationRespon";
import { historicalDataResponse } from "@/interface/historicalDataResponse";
import { reverseGrocodingList } from "@/interface/reverseGrocodingResponse";
import { create } from "zustand";

const initData = {
  fetchGPSData: { data: undefined, loading: false, error: null },
  fetchSelectedLocation: { data: undefined, loading: false, error: null },
  fetchLocationData: { data: [], loading: false, error: null },
  fetchHistoricalData: { data: undefined, loading: false, error: null },
};

type GPSDataType = {
  data: reverseGrocodingList | undefined;
  loading: boolean;
  error: null;
};

type locationType = {
  data: coordinateLocationRespon | undefined;
  loading: boolean;
  error: null;
};

type selectedLocationType = {
  data: coordinateLocationList | undefined;
  loading: boolean;
  error: null;
};

export type dataType = {
  data: historicalDataResponse | undefined;
  loading: boolean;
  error: null;
};

type useDataStore = {
  fetchGPSData: GPSDataType;
  fetchSelectedLocation: selectedLocationType;
  fetchLocationData: locationType;
  fetchHistoricalData: dataType;
  setFetchGPSData: (value: GPSDataType) => void;
  setFetchSelectedLocation: (value: selectedLocationType) => void;
  setFetchLocationData: (value: locationType) => void;
  setFetchHistoricalData: (value: dataType) => void;
  clearHistoricalData: () => void;
};

export const useHistoricalDataStore = create<useDataStore>((set) => ({
  ...initData,
  setFetchGPSData: (value) => set({ fetchGPSData: value }),
  setFetchSelectedLocation: (value) => set({ fetchSelectedLocation: value }),
  setFetchLocationData: (value) => set({ fetchLocationData: value }),
  setFetchHistoricalData: (value) => set({ fetchHistoricalData: value }),
  clearHistoricalData: () => set({ ...initData }),
}));
