import { useEffect, useState } from "react";
import { weatherDataService } from "@/services";
import { coordinateLocationList } from "@/interface/coordinateLocationRespon";
import { weatherDataResponse } from "@/interface/weatherDataResponse";
import ReactLoading from "react-loading";
import "./index.css";
import { useSelectionStore } from "@/storage/selectionStore";
import { getWithExpiry, setWithExpiry, shownAlert } from "@/utils";

interface attrType {
  showDetail: (value: string) => void;
}

const RandomWeather = ({ showDetail }: attrType) => {
  const { setCoordSelected } = useSelectionStore();
  const randWeatheData: weatherDataResponse[] = [];
  type weatherDataType = {
    data: weatherDataResponse[] | undefined;
    loading: boolean;
    error: null;
  };
  const [weatherData, setWeatherData] = useState<weatherDataType>({
    data: undefined,
    loading: false,
    error: null,
  });

  const randWeatheDataAPI = async (
    lat: number,
    lon: number,
    name: string,
    lcnm: string
  ) => {
    setWeatherData({ data: undefined, loading: true, error: null });

    const response = await weatherDataService.getWeatherDataService(lat, lon);
    if (response.status === 200) {
      randWeatheData.push({
        ...response.data,
        name: name,
        local_name: lcnm,
      });
    } else if (response.status === 401) {
      shownAlert(
        "Please contact the project owner and try again next time. Sorry for any inconvenience."
      );
      setWeatherData({ data: undefined, loading: false, error: null });
      return;
    } else if (response.status === 429) {
      shownAlert(
        "Due to exceeding the requests limitation, please try to access this website tomorrow. Thanks ;D"
      );
      setWeatherData({ data: undefined, loading: false, error: null });
      return;
    } else {
      shownAlert(response.error.message);
      setWeatherData({ data: undefined, loading: false, error: null });
      return;
    }

    setWithExpiry("randWeatheData", randWeatheData, 10);
    setWeatherData({ data: randWeatheData, loading: false, error: null });
  };

  function rename(n: string | undefined) {
    return n
      ?.toLowerCase()
      .replace("city", "")
      .replace("municipality", "")
      .replace("town", "")
      .replace("-", " ")
      .trim();
  }

  function setCoords(
    lat: number,
    lon: number,
    name: string | undefined,
    lcname: string | undefined
  ) {
    setCoordSelected({
      lat: lat,
      lon: lon,
      name: name,
      local_name: lcname,
    });
  }

  function toCard() {
    const selection__container = document.getElementById(
      "selection__container"
    );
    selection__container?.scrollIntoView();
  }

  function denyMessage() {
    const message = document.getElementById("locate_coordinate_message");
    message?.classList.add("scale-0");
  }

  useEffect(() => {
    const savedTHLocationStr = localStorage.getItem("allThaiProvincesLocation");
    const randWeatheData = getWithExpiry("randWeatheData");

    if (savedTHLocationStr) {
      const savedTHLocation = JSON.parse(savedTHLocationStr);

      if (randWeatheData) {
        setWeatherData({
          data: randWeatheData,
          loading: false,
          error: null,
        });
      } else {
        let checknum = 0;
        for (let i = 0; i < 10; i++) {
          const randInx: number = Math.floor(Math.random() * 76);
          const randCoords: coordinateLocationList = savedTHLocation[randInx];

          if (randInx !== checknum) {
            checknum = randInx;

            randWeatheDataAPI(
              randCoords.lat,
              randCoords.lon,
              randCoords.name,
              randCoords.local_names.th
            );
          }
        }
      }
    }
  }, []);

  return (
    <div className="z-[1] w-full overflow-hidden">
      <div className="text-shadow--black px-2 w-full h-[15%] text-white font-semibold text-[1.7rem]">
        Current Weather in Thailand
      </div>
      <div className="scroll-parent h-[85%] min-h-[245px] w-full">
        {!weatherData.loading ? (
          <div className="scroll-element scale-95 w-full primary flex items-center">
            {weatherData.data?.map((i, index) => {
              return (
                <button
                  key={index}
                  title={`Click to see current weather of ${rename(i.name)}`}
                  onClick={() => {
                    showDetail("open"),
                      setCoords(i.lat, i.lon, i.name, i.local_name),
                      toCard(),
                      denyMessage();
                  }}
                  className="text-center text-white bg-[#EB6E4B] h-[210px] min-w-[250px] rounded-[20px] p-[10px]"
                >
                  <span className="font-semibold capitalize">
                    {rename(i.name)}
                  </span>
                  <div className="bg-white p-[5px] h-[70%] rounded-[10px] text-black">
                    <div className="flex">
                      <img
                        src={`https://openweathermap.org/img/wn/${i.current.weather[0].icon}@2x.png`}
                        alt={`weather_${i.current.weather[0].main}`}
                      />
                      <div className="w-full flex flex-col justify-center items-center">
                        <div className="text-[0.5rem] text-[rgb(0,0,0,0.6)]">
                          H: {i.daily[0].temp.max}°C
                        </div>
                        <div className="text-[2rem] font-semibold">
                          {i.current.temp.toFixed(0)}°C
                        </div>
                        <div className="text-[0.5rem] text-[rgb(0,0,0,0.6)]">
                          L: {i.daily[0].temp.min}°C
                        </div>
                      </div>
                    </div>
                    <div className="text-center text-[0.9rem] capitalize">
                      <span>{i.current.weather[0].description}</span>
                    </div>
                  </div>
                  <div className="h-[10%]"></div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center">
            <ReactLoading
              type={"spin"}
              color={"#EA6E4B"}
              height={"85px"}
              width={"85px"}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default RandomWeather;
