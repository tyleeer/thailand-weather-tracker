import {
  HistoricalDataService,
  coordinateLocationService,
  reverseGeocodingService,
} from "@/services";
import { useState, useEffect } from "react";
import { FaSearchLocation } from "react-icons/fa";
import { useHistoricalDataStore } from "@/storage/historyStore";
import ReactLoading from "react-loading";
import { coordinateLocationList } from "@/interface/coordinateLocationRespon";
import error404 from "@/img/404.png";
import "./index.css";
import { Banner } from "@/components/banner";
import { Contact } from "@/components/contact";
import { Background } from "@/components/background";
import { Alert } from "@/components/alert";
import { shownAlert } from "@/utils";

const History = () => {
  const {
    fetchGPSData,
    fetchHistoricalData,
    fetchLocationData,
    fetchSelectedLocation,
    setFetchGPSData,
    setFetchHistoricalData,
    setFetchLocationData,
    setFetchSelectedLocation,
    clearHistoricalData,
  } = useHistoricalDataStore();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const accessInput = document.getElementById(
    "accessInput"
  ) as HTMLInputElement;
  const [keyword, setKeyword] = useState("");
  const [GPSCoords, setGPSCoords] = useState({ lat: 0, lon: 0 });
  const [savedCoords, setSavedCoords] = useState<coordinateLocationList[]>([]);
  const [globalSearch, setGlobalSearch] = useState("off");
  const toggler = document.getElementById("toggle_switch") as HTMLInputElement;
  const [errorGPS, setErrorGPS] = useState<{
    code: number | undefined;
    message: string;
  }>();
  const history = document.getElementById("history__page") as HTMLDivElement;
  const banner = document.getElementById("banner__component");
  let preScrollTop = 0;

  function setBannerByScroll() {
    const currentScrollTop = history.scrollTop;
    if (history.scrollTop > 0) {
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
    if (history.scrollTop > 0) {
      banner?.classList.add("bg-[rgb(0,0,0,0.2)]");
    } else banner?.classList.remove("bg-[rgb(0,0,0,0.2)]");
  }

  const callReverseGeocodingAPI = async (lat: number, lon: number) => {
    setFetchGPSData({ data: undefined, loading: true, error: null });

    const response = await reverseGeocodingService.getCityName(lat, lon);

    if (response.status === 200) {
      setFetchGPSData({ data: response.data[0], loading: false, error: null });
    } else if (response.status === 401) {
      shownAlert(
        "Please contact the project owner and try again next time. Sorry for any inconvenience."
      );
      setFetchGPSData({ data: undefined, loading: false, error: null });
      return;
    } else {
      shownAlert("Error. 404");
      setFetchGPSData({ data: undefined, loading: false, error: null });
    }
  };

  const callCoordsAPI = async (key: string) => {
    if (key.length > 0) {
      setFetchLocationData({ data: [], loading: true, error: null });

      const response = await coordinateLocationService.getCoordinateLocation(
        key
      );

      if (response.status === 200) {
        setFetchLocationData({
          data: response.data,
          loading: false,
          error: null,
        });
      } else if (response.status === 401) {
        shownAlert(
          "Please contact the project owner and try again next time. Sorry for any inconvenience."
        );
        setFetchLocationData({ data: [], loading: false, error: null });
        return;
      } else {
        shownAlert("Error. 404");
        setFetchLocationData({ data: [], loading: false, error: null });
      }
    } else if (key.length === 0) {
      setFetchLocationData({ data: [], loading: false, error: null });
    }
  };

  const searchName = (key: string) => {
    if (key.length > 0) {
      const keywordNoSpace = key.toLowerCase().replace(/ /g, "");
      const response = savedCoords.filter((i) => {
        const ENGNoSpace = i.name.toLowerCase().replace(/ /g, "");
        const THNoSpace = i.local_names.th.toLowerCase().replace(/ /g, "");

        return (
          ENGNoSpace.includes(keywordNoSpace) ||
          THNoSpace.includes(keywordNoSpace)
        );
      });

      setFetchLocationData({
        data: response,
        loading: false,
        error: null,
      });
    } else if (key.length === 0) {
      setFetchLocationData({ data: [], loading: false, error: null });
    }

    // return null;
  };

  const callHistoryAPI = async (lat: number, lon: number, date: number) => {
    if (lat !== 0 && lon !== 0) {
      setFetchHistoricalData({ data: undefined, loading: true, error: null });

      const response = await HistoricalDataService.getHistoricalData(
        lat,
        lon,
        date
      );

      if (response.status === 200) {
        setFetchHistoricalData({
          data: response.data,
          loading: false,
          error: null,
        });
      } else if (response.status === 401) {
        shownAlert(
          "Please contact the project owner and try again next time. Sorry for any inconvenience."
        );
        setFetchHistoricalData({
          data: undefined,
          loading: false,
          error: null,
        });
        return;
      } else if (response.status === 429) {
        shownAlert(
          "Due to exceeding the requests limitation, please try to access this website tomorrow. Thanks ;D"
        );
        setFetchHistoricalData({
          data: undefined,
          loading: false,
          error: null,
        });
        return;
      } else {
        shownAlert("Please select date in the past!!");
        setFetchHistoricalData({
          data: undefined,
          loading: false,
          error: null,
        });
        return;
      }
    } else shownAlert("You need to select location first!!");
  };

  const getHistoricalData = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const dateInput = document.getElementById(
      "history_date"
    ) as HTMLInputElement;
    const date = new Date(dateInput.value).getTime() / 1000;
    !fetchSelectedLocation.data
      ? callHistoryAPI(GPSCoords.lat, GPSCoords.lon, date)
      : callHistoryAPI(
          fetchSelectedLocation.data.lat,
          fetchSelectedLocation.data.lon,
          date
        );
    setSelectedDate(dateInput.value);
  };

  function handdleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const preKeyword = event.target as HTMLInputElement;
    setKeyword(preKeyword.value);
  }

  function setNewCoords(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: coordinateLocationList
  ) {
    e.preventDefault();
    setFetchSelectedLocation({ data: data, loading: false, error: null });
    setFetchLocationData({ data: [], loading: false, error: null });
    accessInput.value = "";
  }

  function clearData(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    accessInput.value = "";
    e.preventDefault();
    clearHistoricalData();
    setFetchSelectedLocation({ data: undefined, loading: false, error: null });
    setGPSCoords({ lat: 0, lon: 0 });
  }

  function onToggle() {
    toggler.getAttribute("data-theme") === "black"
      ? (toggler.setAttribute("data-theme", "light"), setGlobalSearch("off"))
      : (toggler.setAttribute("data-theme", "black"), setGlobalSearch("on"));
  }

  useEffect(() => {
    setTimeout(() => {
      const startingCompoonents = document.getElementsByClassName(
        "starting__animation--first"
      );
      for (const i of startingCompoonents) {
        i.classList.remove("initiator");
        i.classList.add("initialize");
      }
    }, 100);
    setTimeout(() => {
      const startingCompoonents = document.getElementsByClassName(
        "starting__animation--second"
      );
      for (const i of startingCompoonents) {
        i.classList.remove("initiator");
        i.classList.add("initialize");
      }
    }, 500);
    setTimeout(() => {
      const startingCompoonents = document.getElementsByClassName(
        "starting__animation--third"
      );
      for (const i of startingCompoonents) {
        i.classList.remove("initiator");
        i.classList.add("initialize");
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (fetchSelectedLocation.data === undefined) {
      if ("geolocation" in navigator) {
        // Prompt user for permission to access their location
        navigator.geolocation.getCurrentPosition(
          // Success callback function
          (position) => {
            // Get the user's latitude and longitude coordinates
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            // Do something with the location data, e.g. display on a map
            // console.log(`Latitude: ${lat}, longitude: ${lng}`);
            if (lat && lng) {
              setGPSCoords({ lat: lat, lon: lng });
              callReverseGeocodingAPI(lat, lng);
            }
          },
          // Error callback function
          (error) => {
            // Handle errors, e.g. user denied location sharing permissions
            console.error("Error getting user location:", error);
            shownAlert("Failed to get your location. Permission is needed.");
            setErrorGPS(error);
          }
        );
      } else {
        // Geolocation is not supported by the browser
        console.error("Geolocation is not supported by this browser.");
        shownAlert("Geolocation is not supported by this browser.");
      }
    }
  }, []);

  useEffect(() => {
    globalSearch === "off" ? searchName(keyword) : callCoordsAPI(keyword);
  }, [keyword]);

  useEffect(() => {
    const coordsStr = localStorage.getItem("allThaiProvincesLocation");

    if (coordsStr) {
      const coordsData = JSON.parse(coordsStr);
      setSavedCoords(coordsData);
    }
  }, []);

  return (
    <div
      id="history__page"
      onScroll={() => {
        setBannerByScroll(), setOpacBanner();
      }}
      className="scroll--dec w-full h-[100dvh] overflow-y-auto"
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
      <div className="sticky top-0 z-10 h-[15%] initiator starting__animation--first">
        <Banner trackPage={"historyPage"} />
      </div>
      <div className="w-full min-h-[80%] flex flex-col gap-2 px-[2dvw] sm:px-[10dvw] pt-[1dvw] pb-[2dvw] initiator starting__animation--second">
        <form className="relative w-full flex flex-col min-w-[370px] min-h-[350px] h-[60dvw] sm:h-[30dvw] sm:min-h-[250px] sm:max-h-[280px] bg-[rgb(0,0,0,0.8)] text-white m-x-auto rounded-xl p-5 transition-all">
          <span className="text-[1.5rem] sm:text-[2rem] font-semibold mb-4">
            Weather History:
          </span>
          <span className="sm:text-[1.2rem] lg:text-[1.5rem] ">
            {!fetchSelectedLocation.data ? (
              fetchGPSData.loading ? (
                <div className="w-full flex justify-center p-10">
                  <ReactLoading
                    type={"spin"}
                    color={"#475569"}
                    height={"40px"}
                    width={"40px"}
                  />
                </div>
              ) : fetchGPSData.data ? (
                <div className="flex flex-col">
                  <span>
                    <span className="font-semibold">Name: </span>
                    {fetchGPSData.data?.name}, {fetchGPSData.data?.state},{" "}
                    {fetchGPSData.data?.country}
                  </span>
                  <span>
                    <span className="font-semibold">Latitude: </span>
                    {GPSCoords.lat.toFixed(2)},{" "}
                    <span className="font-semibold">Longitude: </span>
                    {GPSCoords.lon.toFixed(2)}
                  </span>
                  <span className="text-slate-400 text-[1rem]">
                    ( your location according to GPS )
                  </span>
                </div>
              ) : (
                <span className="">select location first...</span>
              )
            ) : (
              <div className="flex flex-col">
                <span>
                  <span className="font-semibold">Name: </span>
                  {fetchSelectedLocation.data?.name},{" "}
                  {fetchSelectedLocation.data?.state},{" "}
                  {fetchSelectedLocation.data?.country}
                </span>
                <span>
                  <span className="font-semibold">Latitude: </span>
                  {fetchSelectedLocation.data.lat.toFixed(2)},{" "}
                  <span className="font-semibold">Longitude: </span>
                  {fetchSelectedLocation.data.lon.toFixed(2)}
                </span>
              </div>
            )}
          </span>
          <button
            onClick={(e) => clearData(e)}
            className="absolute top-6 right-4 w-[70px] btn rounded-full border-none bg-[rgb(235,110,75)] hover:bg-[rgb(143,67,48)] text-white"
          >
            clear
          </button>
          <div className="absolute w-full sm:w-[95%] bottom-4 right-4 flex flex-col items-end sm:flex-row sm:justify-between sm:right-0 sm:left-6">
            <div className="flex-1 flex gap-2 w-[90%] justify-center sm:justify-normal">
              <input
                type="date"
                id="history_date"
                className="h-[45px] rounded-full px-5"
              />
              <button
                type="submit"
                onClick={(e) => getHistoricalData(e)}
                className="bg-slate-500 rounded-full h-[45px] w-[45px] hover:bg-slate-700 hover:scale-105 active:scale-95"
              >
                <FaSearchLocation className="m-auto" />
              </button>
            </div>
            <div className="flex-1 flex w-[90%] max-w-[500px] mt-4 border-[2px] border-white focus-within:border-[rgb(235,110,75)] rounded-full">
              <div className="w-full relative">
                <input
                  id="accessInput"
                  type="text"
                  onChange={(e) => handdleChange(e)}
                  placeholder="e.g. Bangkok, กรุงเทพ..."
                  className="w-full bg-transparent h-[40px] outline-none px-[20px] rounded-full"
                />
                <ul className="z-10 scroll--dec absolute w-full max-h-[25dvh] overflow-y-auto text-xs md:text-base">
                  {!fetchLocationData.loading ? (
                    fetchLocationData.data?.map((i, index) => {
                      return (
                        <button
                          key={`${i.name}_${index}`}
                          className="w-full"
                          onClick={(e) => setNewCoords(e, i)}
                        >
                          <li className="flex justify-between p-[10px] text-black bg-white border-[1px] border-r-black">
                            <div>{i.name}</div>
                            <div className="flex gap-1 items-center">
                              <span>{`${i.state ? i.state + "," : ""} ${
                                i.country
                              }`}</span>
                              <img
                                src={`https://openweathermap.org/images/flags/${i.country.toLowerCase()}.png`}
                                className="w-[16px] h-[11px]"
                              />
                            </div>
                            <div className="text-slate-500">
                              {`${i.lat.toFixed(3)}, ${i.lon.toFixed(3)}`}
                            </div>
                          </li>
                        </button>
                      );
                    })
                  ) : (
                    <div className="w-full flex bg-white border justify-center py-[10px]">
                      <ReactLoading
                        type={"spin"}
                        color={"#475569"}
                        height={"40px"}
                        width={"40px"}
                      />
                    </div>
                  )}
                </ul>
              </div>
            </div>
            <div className="flex  items-center gap-2 sm:gap-1 mt-1 text-slate-300 sm:absolute sm:right-0 sm:bottom-[50px] sm:flex-col-reverse sm:items-end">
              <div className="text-[0.8rem] sm:text-[1rem]">
                P.S. toggle to search globally
              </div>
              <div className="flex items-center">
                {globalSearch === "off" ? (
                  <span className="mr-1 font-semibold text-[rgb(235,110,75)]">
                    Thai
                  </span>
                ) : (
                  <span className="mr-1 font-semibold">Thai</span>
                )}
                <input
                  id="toggle_switch"
                  type="checkbox"
                  className="toggle toggle-lg"
                  onClick={() => onToggle()}
                  data-theme="light"
                />
                {globalSearch === "off" ? (
                  <span className="ml-1 font-semibold">Global</span>
                ) : (
                  <span className="ml-1 font-semibold text-[rgb(235,110,75)]">
                    Global
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>
        <div className="w-[100%] sm:w-[70%] self-center flex flex-col bg-[rgb(0,0,0,0.8)] text-white rounded-xl p-5 transition-all">
          {fetchHistoricalData.loading ? (
            <span className="m-auto">
              <ReactLoading
                type={"spin"}
                color={"#FFFFFF"}
                height={"50px"}
                width={"50px"}
              />
            </span>
          ) : fetchHistoricalData.data === undefined ? (
            <span className="m-auto">
              Select the date to view weather history...
            </span>
          ) : (
            <div className="text-white w-full">
              <span>Date: {selectedDate}</span>
              <div className="flex flex-col xl:flex-row gap-[5%] w-full">
                <div className="relative xl:w-[40%] flex items-center border-b-2 border-b-white xl:min-w-[295px] xl:justify-center xl:border-b-0 xl:border-r-2 xl:border-r-white pb-4 px-2">
                  <img
                    title={
                      fetchHistoricalData.data?.data[0].weather[0].description
                    }
                    src={`https://openweathermap.org/img/wn/${fetchHistoricalData.data?.data[0].weather[0].icon}@2x.png`}
                    alt={`weather_${fetchHistoricalData.data?.data[0].weather[0].main}`}
                    className="w-[150px] aspect-square"
                  />
                  <span className="font-semibold text-[2rem]">
                    {fetchHistoricalData.data.data[0].temp} °C
                  </span>
                  <div className="w-full h-[30px] absolute bottom-0 flex gap-5 font-semibold capitalize">
                    <span>
                      Feels like: {fetchHistoricalData.data.data[0].feels_like}{" "}
                      °C.
                    </span>
                    <span>
                      {fetchHistoricalData.data.data[0].weather[0].description}.
                    </span>
                  </div>
                </div>
                <div className="xl:w-[60%] grid grid-cols-1 md:grid-cols-2 mt-5 md:gap-5 capitalize">
                  <div className="flex flex-col w-full px-2 md:p-2">
                    <div className="normal-case justify-between flex w-full">
                      <span className="font-semibold">Wind:</span>
                      <span>
                        {fetchHistoricalData.data.data[0].wind_speed} meter/sec
                      </span>
                    </div>
                    <div className="normal-case justify-between flex w-full">
                      <span className="font-semibold">Pressure:</span>
                      <span>
                        {fetchHistoricalData.data.data[0].pressure} hPa
                      </span>
                    </div>
                    {fetchHistoricalData.data.data[0].uvi ? (
                      <div className="normal-case justify-between flex w-full">
                        <span className="font-semibold">UV Index:</span>
                        <span>{fetchHistoricalData.data.data[0].uvi}</span>
                      </div>
                    ) : null}
                    <div className="normal-case justify-between flex w-full">
                      <span className="font-semibold">humidity:</span>
                      <span>{fetchHistoricalData.data.data[0].humidity}%</span>
                    </div>
                  </div>
                  <div className="flex flex-col w-full px-2 md:p-2">
                    {fetchHistoricalData.data.data[0].visibility ? (
                      <div className="normal-case justify-between flex w-full">
                        <span className="font-semibold">Visibility:</span>
                        <span>
                          {fetchHistoricalData.data.data[0].visibility / 1000}{" "}
                          km
                        </span>
                      </div>
                    ) : null}
                    <div className="normal-case justify-between flex w-full">
                      <span className="font-semibold">Sunrise:</span>
                      <span>
                        {new Date(
                          fetchHistoricalData.data.data[0].sunrise * 1000
                        ).toLocaleTimeString("en-TH")}
                      </span>
                    </div>
                    <div className="normal-case justify-between flex w-full">
                      <span className="font-semibold">Sunset:</span>
                      <span>
                        {new Date(
                          fetchHistoricalData.data.data[0].sunset * 1000
                        ).toLocaleTimeString("en-TH")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="h-[5%] initiator starting__animation--third">
        <Contact />
      </div>
      {errorGPS && errorGPS.code && (
        <div className="z-10 fixed top-0 w-[100vw] h-[100%] bg-black text-white flex flex-col items-center justify-center gap-10">
          <img src={error404} alt="" />
          <span className="text-[2rem] text-center w-full flex flex-col gap-2">
            {errorGPS.message.split(".").map((i) => {
              if (i !== "") {
                return (
                  <div
                    key={i}
                    className="w-full first:text-[4rem] last:text-slate-500"
                  >
                    {i}.
                  </div>
                );
              }
              return null;
            })}
          </span>
        </div>
      )}
    </div>
  );
};

export default History;
