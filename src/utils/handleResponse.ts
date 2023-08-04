import { AxiosResponse, AxiosError } from "axios";

export interface errorReponseType {
  status: number | undefined;
  error: AxiosResponse | AxiosError<AxiosResponse> | undefined;
}

export const responseHandler = {
  success: (response: AxiosResponse) => {
    return {
      status: response.status,
      data: response.data,
    };
  },
  error: (response: AxiosError<AxiosResponse>): errorReponseType => {
    if (response.message === "Network Error") {
      return {
        status: 900,
        error: response,
      };
    }

    return {
      status: response.response?.status,
      error: response.response?.data,
    };
  },
};
