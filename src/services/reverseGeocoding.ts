import { reverseGrocodingResponse } from "@/interface/reverseGrocodingResponse";
import { API_KEY, OPENWEATHER_BASE_URL, limit } from "@/utils";
import { responseHandler } from "@/utils/handleResponse";
import axios, { AxiosError, AxiosResponse } from "axios";

interface getReverseGrocodingResponse {
  status: number | undefined;
  data: reverseGrocodingResponse;
  error: AxiosResponse | AxiosError<AxiosResponse> | undefined;
}

export const reverseGeocodingService = {
  getCityName: async (
    lat: number,
    lon: number
  ): Promise<getReverseGrocodingResponse> => {
    try {
      const response = await axios.get(
        `${OPENWEATHER_BASE_URL}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${API_KEY}`
      );

      return responseHandler.success(response);
    } catch (error: any) {
      return responseHandler.error(error);
    }
  },
};
