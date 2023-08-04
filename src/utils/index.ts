import { weatherDataResponse } from "@/interface/weatherDataResponse";
import { weatherDataService } from "@/services";

export const OPENWEATHER_BASE_URL = "https://api.openweathermap.org";
export const API_KEY = "8eef37bd7a3925ed16021d90622bfe73";
export const limit = 5;
type itemType = {
  value: weatherDataResponse[];
  expiry: number;
};

export function setWithExpiry(
  key: string,
  value: weatherDataResponse[],
  ttl: number
) {
  const now = new Date();
  const ttlmillisec = ttl * 60 * 1000;

  // `item` is an object which contains the original value
  // as well as the time when it's supposed to expire

  const item: itemType = {
    value: value,
    expiry: now.getTime() + ttlmillisec,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

export function setWatchlistWithExpiry(
  key: string,
  value: weatherDataResponse[]
) {
  const weatherSavedStr = localStorage.getItem("allThaiProvincesWeather");

  if (weatherSavedStr) {
    const weatherSaved: itemType = JSON.parse(weatherSavedStr);
    const exp = weatherSaved.expiry;

    const item: itemType = {
      value: value,
      expiry: exp,
    };

    localStorage.setItem(key, JSON.stringify(item));
  }

  return null;
}

export function setWithSameExpiry(key: string, value: weatherDataResponse[]) {
  const keySaved = localStorage.getItem(key);

  if (keySaved) {
    const dataSaved: itemType = JSON.parse(keySaved);

    const item: itemType = {
      value: value,
      expiry: dataSaved.expiry,
    };

    localStorage.setItem(key, JSON.stringify(item));
  }
}

export function getWithExpiry(key: string) {
  const itemStr = localStorage.getItem(key);

  // if the item doesn't exist, return null

  if (itemStr) {
    const item: itemType = JSON.parse(itemStr);
    const now: number = new Date().getTime();

    // compare the expiry time of the item with the current time

    // disabled ****************************************************************
    if (now > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null

      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  }
  return null;
}

export async function getWatchlistWithExpiry(key: string) {
  const itemStr = localStorage.getItem(key);

  if (itemStr) {
    const item: itemType = JSON.parse(itemStr);
    const now = new Date().getTime();

    if (now > item.expiry) {
      const newWeatherData: weatherDataResponse[] = [];

      for (const watchlistItems of item.value) {
        const lat = watchlistItems.lat;
        const lon = watchlistItems.lon;
        const name = watchlistItems.name;

        const dataRespon = await weatherDataService.getWeatherDataService(
          lat,
          lon
        );

        if (dataRespon.status === 200) {
          newWeatherData.push({ ...dataRespon.data, name: name });
        } else if (dataRespon.status === 429) {
          shownAlert(
            "Due to exceeding the requests limitation, please try to access this website tomorrow. Thanks ;D"
          );
          return;
        } else {
          shownAlert(dataRespon.error.message);
          return;
        }
      }
      return newWeatherData;
    }
    return item.value;
  }
}

export function reName(name: string | undefined) {
  if (name) {
    const newName = name
      .toLowerCase()
      .replace("city", "")
      .replace("municipality", "")
      .replace("town", "")
      .replace("-", " ")
      .trim();
    return newName;
  }

  return "undefined";
}

export function clearAlert() {
  const alert = document.getElementById("alert__container");
  alert?.classList.remove("top-[5%]");
  alert?.classList.add("-top-[20%]");
}

export function shownAlert(message: string) {
  const alert = document.getElementById("alert__container");
  const alertMessage = document.getElementById(
    "alert__message"
  ) as HTMLSpanElement;
  alertMessage.innerText = message;
  alert?.classList.remove("-top-[20%]");
  alert?.classList.add("top-[5%]");
}
