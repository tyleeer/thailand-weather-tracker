import axios, { AxiosError, AxiosResponse } from "axios";
import { API_KEY, OPENWEATHER_BASE_URL } from "@/utils";
import { weatherDataResponse } from "@/interface/weatherDataResponse";
import { responseHandler } from "@/utils/handleResponse";

interface getWeatherDataServiceResponse {
  status: number | undefined;
  data: weatherDataResponse | any;
  error: AxiosResponse | AxiosError<AxiosResponse> | undefined | any;
}

export const weatherDataService = {
  getWeatherDataService: async (
    lat: number,
    lon: number
  ): Promise<getWeatherDataServiceResponse> => {
    try {
      const response = await axios.get(
        `${OPENWEATHER_BASE_URL}/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      return responseHandler.success(response);
    } catch (error: any) {
      return responseHandler.error(error);
    }
  },
};
