import { Link } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { BiWater, BiSolidSun, BiWind } from "react-icons/bi";
import { GoTriangleRight } from "react-icons/go";
import { useEffect } from "react";
import { weatherDataService } from "@/services";
import { useSelectionStore } from "@/storage/selectionStore";
import ReactLoading from "react-loading";
import { weatherPics } from "@/utils/imgs";
import { reName, shownAlert } from "@/utils";
import "./index.css";

interface attrType {
  showDetail: (value: string) => void;
}

export const PreviewDetail = ({ showDetail }: attrType) => {
  const {
    coordSelected,
    fetchDataSelected,
    setFetchDataSelected,
    clearSelection,
  } = useSelectionStore();

  const lat = coordSelected.lat;
  const lon = coordSelected.lon;
  const name = coordSelected.name;
  const lcname = coordSelected.local_name;

  const callAPI = async (targetLat: number, targetLon: number) => {
    setFetchDataSelected({
      data: undefined,
      loading: true,
      error: undefined,
    });

    const response = await weatherDataService.getWeatherDataService(
      targetLat,
      targetLon
    );
    if (response.status === 200) {
      showDetail("open");
      setFetchDataSelected({
        data: { ...response.data, name: name, local_name: lcname },
        loading: false,
        error: undefined,
      });
    } else if (response.status === 401) {
      shownAlert(
        "Please contact the project owner and try again next time. Sorry for any inconvenience."
      );
      setFetchDataSelected({
        data: undefined,
        loading: false,
        error: response.error,
      });
      return;
    } else if (response.status === 429) {
      shownAlert(
        "Due to exceeding the requests limitation, please try to access this website tomorrow. Thanks ;D"
      );
      setFetchDataSelected({
        data: undefined,
        loading: false,
        error: response.error,
      });
      return;
    } else {
      shownAlert(`${response.error?.message} CODE: ${response.error?.code}`);
      setFetchDataSelected({
        data: undefined,
        loading: false,
        error: response.error,
      });
      return;
    }
  };

  useEffect(() => {
    if (lat && lon) {
      callAPI(lat, lon);
    }
  }, [lat, lon]);

  return (
    <div
      id="selection__container"
      className="w-full max-h-[580px] z-10 absolute top-[30%] flex justify-center items-start"
    >
      {fetchDataSelected.loading ? (
        <div className="m-auto">
          <ReactLoading
            type={"spin"}
            color={"#EA6E4B"}
            height={"70px"}
            width={"70px"}
          />
        </div>
      ) : (
        weatherPics.map((i, index) => {
          const icon = fetchDataSelected.data?.current.weather[0].icon;
          if (i.name === icon) {
            const fontColor = icon.includes("d")
              ? "text-[#334155]"
              : icon.includes("n")
              ? "text-white"
              : "text-[#334155]";

            return (
              <div
                key={index}
                className={`relative shadow-xl shadow-[rgba(0,0,0,0.3)] mt-[4%] sm:mt-[4%] md:mt-[1%] w-[80%] max-w-[400px] flex flex-col items-center ${i.color} ${fontColor} rounded-[5%] p-5`}
              >
                <div className="w-full">
                  <span className="capitalize font-semibold text-[2rem]">
                    {reName(coordSelected.name)}
                  </span>
                </div>
                <img className="w-[200px] h-[200px]" src={i.pic} />
                <div className="flex -translate-y-10">
                  <span className="text-[4rem] font-semibold">
                    {fetchDataSelected.data?.current.temp.toFixed(0)}
                  </span>
                  <span className="text-[1.5rem]">°C</span>
                </div>
                <span className="capitalize font-semibold text-[1.2rem] -translate-y-12">
                  {fetchDataSelected.data?.current.weather[0].description}
                </span>
                <div className="w-full flex justify-between -translate-y-5">
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-[3.5rem]">
                      <BiWater />
                    </span>
                    <div className="flex flex-col items-center w-full">
                      <span className="font-semibold text-[1.5rem]">
                        {fetchDataSelected.data?.current.humidity}%
                      </span>
                      <span>Humidity</span>
                    </div>
                  </div>
                  {icon.includes("d") ? (
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-[3.5rem]">
                        <BiSolidSun />
                      </span>
                      <div className="flex flex-col items-center w-full">
                        <span className="font-semibold text-[1.5rem]">
                          {fetchDataSelected.data?.current.uvi}
                        </span>
                        <span>UV Index</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-[3.5rem]">
                        <BiWind />
                      </span>
                      <div className="flex flex-col items-center w-full">
                        <span className="font-semibold text-[1.5rem]">
                          {fetchDataSelected.data?.current.wind_speed.toFixed(
                            0
                          )}{" "}
                          km/h
                        </span>
                        <span>Wind speed</span>
                      </div>
                    </div>
                  )}
                </div>
                <span className="flex items-center w-full justify-end uppercase text-[1rem] font-semibold">
                  <Link
                    to={`/thailand-weather-tracker/weather/${reName(
                      fetchDataSelected.data?.name
                    )}/${fetchDataSelected.data?.lat}/${
                      fetchDataSelected.data?.lon
                    }`}
                    onClick={() => {
                      showDetail("close"), clearSelection();
                    }}
                    className="active:scale-90 animated-bounce hover:animate-none hover:scale-110 hover:text transition-all flex"
                  >
                    view more
                    <span className="text-[1.5rem]">
                      <GoTriangleRight />
                    </span>
                  </Link>
                </span>
                <Link
                  to={"/thailand-weather-tracker/"}
                  className="absolute top-3 right-3"
                  onClick={() => {
                    showDetail("close"), clearSelection();
                  }}
                >
                  <ImCross className="text-red-600" />
                </Link>
              </div>
            );
          }
        })
      )}
    </div>
  );
};
