import { coordinateLocationRespon } from "@/interface/coordinateLocationRespon";
import { reverseCoordsLocationList } from "@/interface/reverseCoordsLocationResponse";
import { API_KEY, OPENWEATHER_BASE_URL, limit } from "@/utils";
import { responseHandler } from "@/utils/handleResponse";
import axios, { AxiosError, AxiosResponse } from "axios";

interface getCoordinateLocationRespon {
  status: number | undefined;
  data: coordinateLocationRespon;
  error?: AxiosResponse | AxiosError<AxiosResponse> | undefined;
}

interface getReverseCoordsLocationRespon {
  status: number | undefined;
  data: reverseCoordsLocationList[];
  error: AxiosResponse | AxiosError<AxiosResponse> | undefined;
}

export const coordinateLocationService = {
  getCoordinateLocation: async (
    city_name: string
  ): Promise<getCoordinateLocationRespon> => {
    try {
      const response = await axios.get(
        `${OPENWEATHER_BASE_URL}/geo/1.0/direct?q=${city_name}&limit=${limit}&appid=${API_KEY}`
      );

      return responseHandler.success(response);
    } catch (error: any) {
      return responseHandler.error(error);
    }
  },
  getReverseCoordsLocation: async (
    lat: number,
    lon: number
  ): Promise<getReverseCoordsLocationRespon> => {
    try {
      const response = await axios.get(
        `${OPENWEATHER_BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
      );

      return responseHandler.success(response);
    } catch (error: any) {
      return responseHandler.error(error);
    }
  },
};
