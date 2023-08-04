import { daySummaryResponse } from "@/interface/daySummaryResponse";
import { historicalDataResponse } from "@/interface/historicalDataResponse";
import { API_KEY, OPENWEATHER_BASE_URL } from "@/utils";
import { responseHandler } from "@/utils/handleResponse";
import axios, { AxiosError, AxiosResponse } from "axios";

interface getHistoricalDataResponse {
  status: number | undefined;
  data: historicalDataResponse;
  error: AxiosResponse | AxiosError<AxiosResponse> | undefined;
}

interface getDaySummaryResponse {
  status: number | undefined;
  data: daySummaryResponse;
  error: AxiosResponse | AxiosError<AxiosResponse> | undefined;
}

export const HistoricalDataService = {
  getHistoryDaySummaryData: async (
    lat: number,
    lon: number,
    date: string
  ): Promise<getDaySummaryResponse> => {
    try {
      const response = await axios.get(
        `${OPENWEATHER_BASE_URL}/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${date}&units=metric&appid=${API_KEY}`
        // `${OPENWEATHER_BASE_URL}/data/3.0/onecall/day_summary?lat=${lat}&lon=${lon}&date=${date}&tz=${tz}&appid=${API_KEY}`

        // If the service detected timezone for your location incorrectly
        // you can specify correct timezone manually by adding tz parameter in the e.g. ±03:00 format to API call.
      );

      // date = Date specified in the API request in the `YYYY-MM-DD` format (from 1979-01-02 up to the previous day before the current date)

      return responseHandler.success(response);
    } catch (error: any) {
      return responseHandler.error(error);
    }
  },
  getHistoricalData: async (
    lat: number,
    lon: number,
    time: number
  ): Promise<getHistoricalDataResponse> => {
    try {
      const response = await axios.get(
        `${OPENWEATHER_BASE_URL}/data/3.0/onecall/timemachine?lat=${lat}&lon=${lon}&dt=${time}&units=metric&appid=${API_KEY}`
      );

      // dt = Timestamp (Unix time, UTC time zone), e.g. dt=1586468027. Data is available from January 1st, 1979.

      return responseHandler.success(response);
    } catch (error: any) {
      return responseHandler.error(error);
    }
  },
};
