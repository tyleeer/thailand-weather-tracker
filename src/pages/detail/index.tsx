import { weatherDataService } from "@/services";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useWeatherDataStore } from "@/storage/weatherDataStore";
import ReactLoading from "react-loading";
import "./index.css";
import { Banner } from "@/components/banner";
import sunsetpic from "@/img/sunset_arrow.png";
import sunsetpic2 from "@/img/sunset_arrow2.png";
import sunrisepic from "@/img/sunrise_arrow.png";
import sunrisepic2 from "@/img/sunrise_arrow2.png";
import { HourlyForcast } from "@/components/hourlyForcast";
import { DailyForcast } from "@/components/dailyForcast";
import { Contact } from "@/components/contact";
import { Background } from "@/components/background";
import { Alert } from "@/components/alert";
import { shownAlert } from "@/utils";

const Detail = () => {
  const { name, lat, lon } = useParams();
  const lat_coordinate = parseFloat(lat ? lat : "0");
  const lon_coordinate = parseFloat(lon ? lon : "0");
  const { setFetchWeatherData, fetchWeatherData } = useWeatherDataStore();
  const detail = document.getElementById("detail__page") as HTMLDivElement;
  const banner = document.getElementById("banner__component");
  let preScrollTop = 0;

  function setBannerByScroll() {
    const currentScrollTop = detail.scrollTop;
    if (detail.scrollTop > banner.offsetHeight) {
      if (currentScrollTop > preScrollTop) {
        banner?.classList.add("-translate-y-[100%]");
      }
      if (currentScrollTop < preScrollTop) {
        banner?.classList.remove("-translate-y-[100%]");
      }
    }
    preScrollTop = currentScrollTop;
  }

  function setOpacBanner() {
    if (detail.scrollTop > 0) {
      banner?.classList.add("bg-[rgb(0,0,0,0.4)]");
    } else banner?.classList.remove("bg-[rgb(0,0,0,0.4)]");
  }

  const callAPI = async (targetLat: number, targetLon: number) => {
    setFetchWeatherData({
      data: undefined,
      loading: true,
      error: null,
    });

    const response = await weatherDataService.getWeatherDataService(
      targetLat,
      targetLon
    );

    if (response.status === 200) {
      setFetchWeatherData({
        data: response.data,
        loading: false,
        error: null,
      });
    } else if (response.status === 401) {
      shownAlert(
        "Please contact the project owner and try again next time. Sorry for any inconvenience."
      );
      setFetchWeatherData({
        data: undefined,
        loading: false,
        error: null,
      });
      return;
    } else if (response.status === 429) {
      shownAlert(
        "Due to exceeding the requests limitation, please try to access this website tomorrow. Thanks ;D"
      );
      setFetchWeatherData({
        data: undefined,
        loading: false,
        error: null,
      });
      return;
    } else {
      shownAlert(response.error.message);
      setFetchWeatherData({
        data: undefined,
        loading: false,
        error: null,
      });
    }
  };

  useEffect(() => {
    callAPI(lat_coordinate, lon_coordinate);
  }, [lat, lon]);

  return (
    <div
      id="detail__page"
      onScroll={() => {
        setOpacBanner(), setBannerByScroll();
      }}
      className=" scroll--dec text-black relative w-[100dvw] h-[100dvh] overflow-y-auto"
    >
      <div
        id="alert__container"
        className="w-[100dvw] z-20 fixed -top-[20%] transition-all duration-500 ease-out"
      >
        <Alert />
      </div>
      <div className="-z-10 w-[100dvw] flex h-[100dvh] fixed top-0">
        <Background />
      </div>
      <div className="h-[15dvh] sticky top-0 z-10 md:h-[18dvh]">
        <Banner trackPage={""} />
      </div>
      {!fetchWeatherData.loading ? (
        <div className="relative w-full min-h-[85vh] py-[2dvw] px-[3dvw] md:px-[5dvw] lg:px-[10dvw]  flex overflow-hidden">
          <div
            id="current__container"
            className="w-full md:hidden flex flex-col gap-8 capitalize"
          >
            <div className="flex flex-col w-full items-center text-shadow--white">
              {name && name.length > 12 ? (
                <span className="text-[2.7rem]">{name}</span>
              ) : (
                <span className="text-[3rem]">{name}</span>
              )}
              <span className="font-semibold text-[4rem] flex">
                <span>
                  {fetchWeatherData.data &&
                    fetchWeatherData.data.current.temp.toFixed(0)}
                </span>
                <span>°</span>
              </span>
              <span className="normal-case text-[1.2rem] flex gap-1">
                <span>
                  H:{" "}
                  {fetchWeatherData.data &&
                    fetchWeatherData.data.daily[0].temp.max.toFixed(0)}
                  °
                </span>
                <span>
                  L:{" "}
                  {fetchWeatherData.data &&
                    fetchWeatherData.data.daily[0].temp.min.toFixed(0)}
                  °
                </span>
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative scroll--dec min-w-[350px] bg-[rgb(255,255,255,0.8)] col-span-2 rounded-[10px] max-h-[220px] py-2 overflow-x-auto overflow-y-hidden">
                {fetchWeatherData.data && (
                  <HourlyForcast
                    hourly={fetchWeatherData.data.hourly}
                    daily={fetchWeatherData.data.daily}
                  />
                )}
              </div>
              <div className="relative min-w-[350px] bg-[rgb(255,255,255,0.8)] col-span-2 rounded-[10px] p-2">
                {fetchWeatherData.data && (
                  <DailyForcast daily={fetchWeatherData.data.daily} />
                )}
              </div>
              <div className="min-h-[170px] bg-[rgb(255,255,255,0.8)] relative w-full h-full aspect-square rounded-[10px] px-5 py-3">
                {fetchWeatherData.data &&
                  (fetchWeatherData.data.current.dt >
                  fetchWeatherData.data.current.sunrise ? (
                    <div className="w-full h-full flex flex-col justify-between aspect-square">
                      <span className="w-full sticky top-0 font-semibold uppercase">
                        sunset
                      </span>
                      <span className="text-[8dvw] -translate-y-9 font-semibold">
                        {fetchWeatherData.data &&
                          new Date(
                            fetchWeatherData.data.current.sunset * 1000
                          ).toLocaleTimeString()}
                      </span>
                      <img
                        src={sunsetpic}
                        className="aspect-square w-full absolute left-0 -bottom-5 scale-[45%]"
                      />
                      <span className="capitalize text-[3.5dvw]">
                        sunrise:{" "}
                        {fetchWeatherData.data &&
                          new Date(
                            fetchWeatherData.data.current.sunrise * 1000
                          ).toLocaleTimeString()}
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col justify-between aspect-square">
                      <span className="w-full sticky top-0 font-semibold uppercase">
                        sunrise
                      </span>
                      <span className="text-[8dvw] -translate-y-9 font-semibold">
                        {fetchWeatherData.data &&
                          new Date(
                            fetchWeatherData.data.current.sunrise * 1000
                          ).toLocaleTimeString()}
                      </span>
                      <img
                        src={sunrisepic}
                        className="aspect-square w-full absolute left-0 -bottom-5 scale-[55%]"
                      />
                      <span className="capitalize text-[3.5dvw]">
                        sunset:{" "}
                        {fetchWeatherData.data &&
                          new Date(
                            fetchWeatherData.data.current.sunset * 1000
                          ).toLocaleTimeString()}
                      </span>
                    </div>
                  ))}
              </div>
              <div className="min-h-[170px] relative bg-[rgb(255,255,255,0.8)] flex flex-col justify-between aspect-square rounded-[10px] px-5 py-3">
                <span className="w-full sticky top-0 font-semibold uppercase">
                  feels like
                </span>
                <span className="text-[13dvw] font-semibold">
                  {fetchWeatherData.data &&
                    fetchWeatherData.data.current.feels_like.toFixed(0)}
                  °
                </span>
                <span className="normal-case w-full text-[2.9dvw]">
                  Humidity effects human perception to feel warmer
                </span>
              </div>
              <div className="min-h-[170px] relative bg-[rgb(255,255,255,0.8)] flex flex-col justify-between aspect-square rounded-[10px] px-5 py-3">
                <span className="w-full sticky top-0 font-semibold uppercase">
                  humidity
                </span>
                <span className="text-[13dvw] font-semibold">
                  {fetchWeatherData.data &&
                    fetchWeatherData.data.current.humidity}
                  %
                </span>
                <span className="normal-case w-full text-[3.5dvw]">
                  The dew point is{" "}
                  {fetchWeatherData.data &&
                    fetchWeatherData.data.current.dew_point.toFixed(0)}
                  ° right now
                </span>
              </div>
              <div className="min-h-[170px] relative bg-[rgb(255,255,255,0.8)] flex flex-col justify-between aspect-square rounded-[10px] px-5 py-3">
                <span className="w-full sticky top-0 font-semibold uppercase">
                  cloudiness
                </span>
                <span className="text-[13dvw] font-semibold">
                  {fetchWeatherData.data &&
                    fetchWeatherData.data.current.clouds}
                  %
                </span>
                <span className="normal-case w-full text-[2.9dvw]">
                  If the sky is 100% covered by clouds, it is a totally cloudy
                  day
                </span>
              </div>
              <div className="min-h-[170px] relative bg-[rgb(255,255,255,0.8)] flex flex-col justify-between aspect-square rounded-[10px] px-5 py-3">
                <span className="w-full sticky top-0 font-semibold uppercase">
                  pressure
                </span>
                <span className="text-[11dvw] font-semibold">
                  {fetchWeatherData.data &&
                    fetchWeatherData.data.current.pressure}
                  <span className="text-[2rem]">hPa</span>
                </span>
                <span className="normal-case w-full text-[3.4dvw]">
                  Atmospheric pressure on the sea level
                </span>
              </div>
              <div className="min-h-[170px] relative bg-[rgb(255,255,255,0.8)] flex flex-col justify-between aspect-square rounded-[10px] px-5 py-3">
                <span className="w-full sticky top-0 font-semibold uppercase">
                  visibility
                </span>
                <span className="text-[11dvw] font-semibold">
                  {fetchWeatherData.data &&
                    fetchWeatherData.data.current.visibility / 1000}
                  <span className="text-[2rem]">km</span>
                </span>
                <span className="normal-case w-full text-[3dvw]">
                  Average visibility (the maximum value is 10km)
                </span>
              </div>
              <div className="min-h-[170px] relative bg-[rgb(255,255,255,0.8)] flex flex-col justify-between aspect-square rounded-[10px] px-5 py-3">
                <span className="w-full sticky top-0 font-semibold uppercase">
                  uv index
                </span>
                <span className="text-[11dvw] font-semibold">
                  {fetchWeatherData.data && fetchWeatherData.data.current.uvi}
                </span>
                <span className="normal-case w-full text-[4dvw] -translate-y-2">
                  {fetchWeatherData.data &&
                  fetchWeatherData.data.current.uvi > 2
                    ? fetchWeatherData.data &&
                      fetchWeatherData.data.current.uvi > 5
                      ? fetchWeatherData.data &&
                        fetchWeatherData.data.current.uvi > 7
                        ? fetchWeatherData.data &&
                          fetchWeatherData.data.current.uvi > 10
                          ? "Extreme High"
                          : "Very High"
                        : "High"
                      : "Moderate"
                    : "Low"}
                </span>
                <span className="normal-case w-full text-[3dvw]">
                  {fetchWeatherData.data &&
                  fetchWeatherData.data.current.uvi > 2
                    ? fetchWeatherData.data &&
                      fetchWeatherData.data.current.uvi > 7
                      ? "Avoid being outside during midday hours"
                      : "Slip on a shirt, slop on sunscreen and slap on hat"
                    : "You can safely enjoy being outside"}
                </span>
              </div>
              <div className="min-h-[170px] relative bg-[rgb(255,255,255,0.8)] flex flex-col justify-between aspect-square rounded-[10px] px-5 py-3">
                <span className="w-full sticky top-0 font-semibold uppercase">
                  wind
                </span>
                <span className="text-[11dvw] font-semibold">
                  {fetchWeatherData.data &&
                    fetchWeatherData.data.current.wind_speed}
                  <span className="text-[1.5rem] lowercase">m/s</span>
                </span>
                <span className="normal-case w-full text-[3dvw]">
                  Wind Speed, metre/sec
                </span>
              </div>
              <div className="w-full col-span-2 text-center">
                <a
                  href={`https://openweathermap.org/weathermap?basemap=map&cities=false&layer=temperature&lat=${lat_coordinate}&lon=${lon_coordinate}&zoom=10`}
                  target="_blank"
                  className="underline normal-case visited:text-blue-700"
                >
                  {`open weather maps of ${name?.toLowerCase()}`}
                </a>
              </div>
            </div>
          </div>
          <div
            id="current__container"
            className="hidden w-full md:grid grid-cols-4 lg:grid-cols-6 lg:grid-rows-8 gap-4 capitalize"
          >
            <div className="relative flex flex-col w-full h-[70%] self-end justify-self-start col-span-2 lg:col-span-2 lg:row-span-2 bg-[rgb(255,255,255,0.8)] rounded-[10px] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-1 lg:py-4">
                {name && name?.length >= 8 ? (
                  <span className="text-[1.8rem] font-semibold">{name}</span>
                ) : (
                  <span className="text-[3rem] font-semibold">{name}</span>
                )}
                <span className="text-[3rem] font-semibold"></span>
                <div className="relative flex flex-col text-[1.1rem]">
                  <span>
                    {fetchWeatherData.data &&
                      new Date(fetchWeatherData.data.current.dt * 1000)
                        .toDateString()
                        .replace(" ", ", ")}
                  </span>
                  <span>
                    {fetchWeatherData.data &&
                      new Date(
                        fetchWeatherData.data.current.dt * 1000
                      ).toLocaleTimeString("en-TH")}
                  </span>
                </div>
              </div>
              <div className="absolute right-5 bottom-6">
                <span className="font-semibold text-[4rem] flex justify-end">
                  <span>
                    {fetchWeatherData.data &&
                      fetchWeatherData.data.current.temp.toFixed(0)}
                  </span>
                  <span>°</span>
                </span>
                <span className="normal-case text-[1.2rem] flex gap-1 justify-end">
                  <span>
                    H:{" "}
                    {fetchWeatherData.data &&
                      fetchWeatherData.data.daily[0].temp.max.toFixed(0)}
                    °
                  </span>
                  <span>
                    L:{" "}
                    {fetchWeatherData.data &&
                      fetchWeatherData.data.daily[0].temp.min.toFixed(0)}
                    °
                  </span>
                </span>
              </div>
              <div className="absolute left-3 -bottom-3 flex flex-col items-center">
                <img
                  title={fetchWeatherData.data?.current.weather[0].description}
                  src={`https://openweathermap.org/img/wn/${fetchWeatherData.data?.current.weather[0].icon}@2x.png`}
                  className="aspect-square w-[10em]"
                />
                <span className="-translate-y-9">
                  {fetchWeatherData.data?.current.weather[0].description}
                </span>
              </div>
            </div>
            <div className="relative col-span-2 lg:col-span-4 lg:row-span-2 min-h-[310px] bg-[rgb(255,255,255,0.8)] rounded-[10px] py-2 w-full scroll--dec snap-x snap-mandatory overflow-x-auto">
              {fetchWeatherData.data && (
                <HourlyForcast
                  hourly={fetchWeatherData.data.hourly}
                  daily={fetchWeatherData.data.daily}
                />
              )}
            </div>
            <div className="relative col-span-4 lg:col-span-4 lg:row-span-6 h-full bg-[rgb(255,255,255,0.8)] rounded-[10px] p-2">
              {fetchWeatherData.data && (
                <DailyForcast daily={fetchWeatherData.data.daily} />
              )}
            </div>
            <div className="lg:col-span-2 col-span-4 grid grid-cols-4 lg:grid-cols-2 lg:row-span-4 gap-5 mt-5 lg:mt-0">
              <div className="relative bg-[rgb(255,255,255,0.8)] flex flex-col w-full h-full aspect-square rounded-[10px] px-2 py-2">
                {fetchWeatherData.data &&
                  (fetchWeatherData.data.current.dt <
                  fetchWeatherData.data.current.sunrise ? (
                    <>
                      <span className="w-full sticky top-0 font-semibold uppercase">
                        sunset
                      </span>
                      <span className="text-[1.5rem] font-semibold">
                        {fetchWeatherData.data &&
                          new Date(
                            fetchWeatherData.data.current.sunset * 1000
                          ).toLocaleTimeString()}
                      </span>
                      <img
                        src={sunsetpic2}
                        className="aspect-square w-full absolute left-0 -bottom-4 scale-[50%]"
                      />
                      <span className="absolute bottom-2 capitalize text-[0.9rem]">
                        sunrise:{" "}
                        {fetchWeatherData.data &&
                          new Date(
                            fetchWeatherData.data.current.sunrise * 1000
                          ).toLocaleTimeString()}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="w-full sticky top-0 font-semibold uppercase">
                        sunrise
                      </span>
                      <span className="text-[1.5rem] font-semibold">
                        {fetchWeatherData.data &&
                          new Date(
                            fetchWeatherData.data.current.sunrise * 1000
                          ).toLocaleTimeString()}
                      </span>
                      <img
                        src={sunrisepic2}
                        className="aspect-square w-full absolute left-0 -bottom-4 scale-[50%]"
                      />
                      <span className="absolute bottom-2 capitalize text-[0.9rem]">
                        sunset:{" "}
                        {fetchWeatherData.data &&
                          new Date(
                            fetchWeatherData.data.current.sunset * 1000
                          ).toLocaleTimeString()}
                      </span>
                    </>
                  ))}
              </div>
              <div className="relative bg-[rgb(255,255,255,0.8)] flex flex-col w-full h-full justify-between aspect-square rounded-[10px] px-2 py-2">
                <span className="w-full sticky top-0 font-semibold uppercase">
                  feels like
                </span>
                <span className="text-[2.5rem] font-semibold">
                  {fetchWeatherData.data &&
                    fetchWeatherData.data.current.feels_like.toFixed(0)}
                  °
                </span>
                <span className="normal-case w-full text-[0.8rem]">
                  Humidity effects human perception to feel warmer
                </span>
              </div>
              <div className="relative bg-[rgb(255,255,255,0.8)] flex flex-col w-full h-full justify-between aspect-square rounded-[10px] px-2 py-2">
                <span className="w-full sticky top-0 font-semibold uppercase">
                  humidity
                </span>
                <span className="text-[3rem] font-semibold">
                  {fetchWeatherData.data &&
                    fetchWeatherData.data.current.humidity}
                  %
                </span>
                <span className="normal-case w-full text-[0.9rem]">
                  The dew point is{" "}
                  {fetchWeatherData.data &&
                    fetchWeatherData.data.current.dew_point.toFixed(0)}
                  ° right now
                </span>
              </div>
              <div className="relative bg-[rgb(255,255,255,0.8)] flex flex-col w-full h-full justify-between aspect-square rounded-[10px] px-2 py-2">
                <span className="w-full sticky top-0 font-semibold uppercase">
                  cloudiness
                </span>
                <span className="text-[3rem] font-semibold">
                  {fetchWeatherData.data &&
                    fetchWeatherData.data.current.clouds}
                  %
                </span>
                <span className="normal-case w-full text-[0.7rem]">
                  If the sky is 100% covered by clouds, it is a totally cloudy
                  day
                </span>
              </div>
              <div className="relative bg-[rgb(255,255,255,0.8)] flex flex-col w-full h-full justify-between aspect-square rounded-[10px] px-2 py-2">
                <span className="w-full sticky top-0 font-semibold uppercase">
                  pressure
                </span>
                <span className="text-[2.5rem] font-semibold">
                  {fetchWeatherData.data &&
                    fetchWeatherData.data.current.pressure}
                  <span className="text-[2rem]">hPa</span>
                </span>
                <span className="normal-case w-full text-[1rem]">
                  Atmospheric pressure on the sea level
                </span>
              </div>
              <div className="relative bg-[rgb(255,255,255,0.8)] flex flex-col w-full h-full justify-between aspect-square rounded-[10px] px-2 py-2">
                <span className="w-full sticky top-0 font-semibold uppercase">
                  visibility
                </span>
                <span className="text-[2.5rem] font-semibold">
                  {fetchWeatherData.data &&
                    fetchWeatherData.data.current.visibility / 1000}
                  <span className="text-[2rem]">km</span>
                </span>
                <span className="normal-case w-full text-[0.9rem]">
                  Average visibility (the maximum value is 10km)
                </span>
              </div>
              <div className="relative bg-[rgb(255,255,255,0.8)] flex flex-col w-full h-full justify-between aspect-square rounded-[10px] px-2 py-2">
                <span className="w-full sticky top-0 font-semibold uppercase">
                  uv index
                </span>
                <span className="text-[2.5rem] font-semibold">
                  {fetchWeatherData.data && fetchWeatherData.data.current.uvi}
                </span>
                <span className="normal-case w-full text-[1rem] -translate-y-2">
                  {fetchWeatherData.data &&
                  fetchWeatherData.data.current.uvi > 2
                    ? fetchWeatherData.data &&
                      fetchWeatherData.data.current.uvi > 5
                      ? fetchWeatherData.data &&
                        fetchWeatherData.data.current.uvi > 7
                        ? fetchWeatherData.data &&
                          fetchWeatherData.data.current.uvi > 10
                          ? "Extreme High"
                          : "Very High"
                        : "High"
                      : "Moderate"
                    : "Low"}
                </span>
                <span className="normal-case w-full text-[1rem]">
                  {fetchWeatherData.data &&
                  fetchWeatherData.data.current.uvi > 2
                    ? fetchWeatherData.data &&
                      fetchWeatherData.data.current.uvi > 7
                      ? "Avoid being outside during midday hours"
                      : "Slip on a shirt, slop on sunscreen and slap on hat"
                    : "You can safely enjoy being outside"}
                </span>
              </div>
              <div className="relative bg-[rgb(255,255,255,0.8)] flex flex-col w-full h-full justify-between aspect-square rounded-[10px] px-2 py-2">
                <span className="w-full sticky top-0 font-semibold uppercase">
                  wind
                </span>
                <span className="text-[2.5rem] font-semibold">
                  {fetchWeatherData.data &&
                    fetchWeatherData.data.current.wind_speed}
                  <span className="text-[1.5rem] lowercase">m/s</span>
                </span>
                <span className="normal-case w-full text-[1rem]">
                  Wind Speed, metre/sec
                </span>
              </div>
            </div>
            <div className="w-full text-center col-span-4 lg:col-span-6">
              <a
                href={`https://openweathermap.org/weathermap?basemap=map&cities=false&layer=temperature&lat=${lat_coordinate}&lon=${lon_coordinate}&zoom=10`}
                target="_blank"
                className="underline normal-case visited:text-blue-700"
              >
                {`open weather maps of ${name?.toLowerCase()}`}
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[100vh] flex justify-center pt-[15vh]">
          <ReactLoading
            type={"spin"}
            color={"#EA6E4B"}
            height={"70px"}
            width={"70px"}
          />
        </div>
      )}
      <div className="h-[7%] bg-[rgb(0,0,0,0.2)]">
        <Contact />
      </div>
    </div>
  );
};

export default Detail;
