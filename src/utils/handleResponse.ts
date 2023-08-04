import { AxiosResponse, AxiosError } from "axios";
import { weatherDataResponse } from "@/interface/weatherDataResponse";

export interface errorReponseType {
  status: number | undefined;
  data: weatherDataResponse | undefined | any;
  error: AxiosResponse | AxiosError<AxiosResponse> | undefined;
}

export const responseHandler = {
  success: (response: AxiosResponse) => {
    return {
      status: response.status,
      data: response.data,
      error: undefined,
    };
  },
  error: (response: AxiosError<AxiosResponse>): errorReponseType => {
    if (response.message === "Network Error") {
      return {
        status: 900,
        data: undefined,
        error: response,
      };
    }

    return {
      status: response.response?.status,
      data: undefined,
      error: response.response?.data,
    };
  },
};
