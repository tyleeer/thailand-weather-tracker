import { useCoordinateStore } from "@/storage/coordinateStore";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useAllWeatherDataStore } from "@/storage/allWeatherDataStore";
import { AiOutlineGlobal } from "react-icons/ai";
import { coordinateLocationService } from "@/services";
import { useSelectionStore } from "@/storage/selectionStore";
import { reName, shownAlert } from "@/utils";
import chat from "@/img/chat.png";
import "./index.css";
import { BiCurrentLocation } from "react-icons/bi";

export const SearchBar = () => {
  const { location, setLocation, clearLocation } = useCoordinateStore();
  const { setCoordSelected } = useSelectionStore();
  const { fetchAllLocation } = useAllWeatherDataStore();
  const inputEle = document.getElementById("accessInput") as HTMLInputElement;
  const toggler = document.getElementById("toggle_switch") as HTMLInputElement;
  const [keyword, setKeyword] = useState("");
  const [globalSearch, setGlobalSearch] = useState("off");

  function clearText() {
    // e.preventDefault();
    clearLocation();
    setKeyword("");
    if (keyword !== "") {
      inputEle.value = "";
    }
  }

  function handdleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const preKeyword = event.target as HTMLInputElement;
    setKeyword(preKeyword.value);
  }

  const searchName = (key: string) => {
    if (key.length > 0) {
      const keywordNoSpace = key.toLowerCase().replace(/ /g, "");
      const response = fetchAllLocation.data?.filter((i) => {
        const ENGNoSpace = i.name.toLowerCase().replace(/ /g, "");
        const THNoSpace = i.local_names.th.toLowerCase().replace(/ /g, "");

        return (
          ENGNoSpace.includes(keywordNoSpace) ||
          THNoSpace.includes(keywordNoSpace)
        );
      });

      setLocation({
        data: response,
        loading: false,
        error: null,
      });
    } else if (key.length === 0) {
      clearLocation();
      setKeyword("");
      if (keyword !== "") {
        inputEle.value = "";
      }
    }
  };

  const callCoordsAPI = async (key: string) => {
    if (key.length > 0) {
      setLocation({ data: [], loading: true, error: null });

      const response = await coordinateLocationService.getCoordinateLocation(
        key
      );

      if (response.status === 200) {
        setLocation({
          data: response.data,
          loading: false,
          error: null,
        });
      } else {
        shownAlert("Error. 404");
        return;
      }
    } else if (key.length === 0) {
      clearLocation();
      setKeyword("");
      if (keyword !== "") {
        inputEle.value = "";
      }
    }
  };

  function getUserCoordinate(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if ("geolocation" in navigator) {
      // Prompt user for permission to access their location
      navigator.geolocation.getCurrentPosition(
        // Success callback function
        async (position) => {
          // Get the user's latitude and longitude coordinates
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Do something with the location data, e.g. display on a map
          // console.log(`Latitude: ${lat}, longitude: ${lng}`);
          if (lat && lng) {
            const response =
              await coordinateLocationService.getReverseCoordsLocation(
                lat,
                lng
              );

            if (response.status === 200) {
              if (response.data) {
                setCoordSelected({
                  lat: lat,
                  lon: lng,
                  name: response.data[0].name,
                  local_name:
                    response.data[0]?.local_names.th ||
                    response.data[0]?.local_names.en,
                });
              }
            } else if (response.status === 401) {
              shownAlert(
                "Please contact the project owner and try again next time. Sorry for any inconvenience."
              );
              return;
            } else if (response.status === 429) {
              shownAlert(
                "Due to exceeding the requests limitation, please try to access this website tomorrow. Thanks ;D"
              );
              return;
            } else {
              shownAlert("Error. 404");
              return;
            }
          }
        },
        // Error callback function
        (error) => {
          // Handle errors, e.g. user denied location sharing permissions
          console.error("Error getting user location:", error);
          shownAlert(`Error getting user location:, ${error}`);
        }
      );
    } else {
      // Geolocation is not supported by the browser
      console.error("Geolocation is not supported by this browser.");
      shownAlert("Geolocation is not supported by this browser.");
    }
  }

  function onToggle() {
    toggler.getAttribute("data-theme") === "black"
      ? (toggler.setAttribute("data-theme", "light"), setGlobalSearch("off"))
      : (toggler.setAttribute("data-theme", "black"), setGlobalSearch("on"));
  }

  function setCoords(lat: number, lon: number, name: string, lcname: string) {
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
    globalSearch === "on" ? callCoordsAPI(keyword) : searchName(keyword);
  }, [keyword]);

  return (
    <form
      id="search__container"
      className="relative w-full px-5 flex flex-col gap-2 text-black"
    >
      <div
        id="search__container--bar"
        className="w-full flex justify-center items-center gap-[10px]"
      >
        <div className="absolute text-center -top-2 right-2 scale-[80%] flex items-center text-black md:right-7 md:scale-100 bg-[rgb(0,0,0,0.2)] p-2 rounded-xl">
          {globalSearch === "off" ? (
            <span className="mr-1 font-semibold text-[1.2rem] text-white rounded-full">
              TH
            </span>
          ) : (
            <span className="mr-1 font-semibold text-[1.2rem]">TH</span>
          )}
          <input
            id="toggle_switch"
            type="checkbox"
            className="toggle toggle-lg text-shadow--black"
            onClick={() => onToggle()}
            data-theme="light"
          />
          {globalSearch === "off" ? (
            <AiOutlineGlobal className="text-[30px]" />
          ) : (
            <AiOutlineGlobal className="text-[30px] text-white" />
          )}
        </div>
        <div className="relative max-w-[700px] w-full md:max-w-[1000px] flex justify-between items-center border-[2px] border-white bg-white focus-within:border-[rgb(235,110,75)] rounded-[15px] shadow-lg">
          <div className="w-full relative">
            <input
              id="accessInput"
              type="text"
              onChange={(e) => handdleChange(e)}
              placeholder="e.g. Bangkok, กรุงเทพ,..."
              className="w-full bg-transparent h-[40px] outline-none px-[15px] text-[0.75rem] sm:text-[1rem] text-black capitalize placeholder:normal-case"
            />
            <ul className="scroll--dec z-[2] absolute w-full text-xs sm:text-sm md:font-normal md:text-base h-auto max-h-[25vh] overflow-y-auto text-black">
              {!location.loading ? (
                location.data &&
                (location.data.length > 0 ? (
                  location.data.map((i, index) => {
                    const checkLocal = i.local_names
                      ? i.local_names.th
                      : i.name;
                    return (
                      <button
                        key={`${i.name}_${index}`}
                        className="w-full"
                        onClick={() => {
                          clearText(),
                            setCoords(i.lat, i.lon, i.name, checkLocal),
                            toCard(),
                            denyMessage();
                        }}
                      >
                        <li className="flex capitalize justify-between p-[10px] bg-white hover:bg-slate-300 focus:bg-slate-300 border-[1px] border-b-black">
                          <div>{reName(i.name)}</div>
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
                  <li className="text-center font-semibold py-2 bg-slate-200 border-[1px] border-b-black">
                    Not found
                  </li>
                ))
              ) : (
                <div className="w-full flex justify-center bg-slate-200 border-[1px] border-b-black mt-1 py-[10px]">
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
          {keyword.length > 0 ? (
            <>
              <button
                onClick={() => clearText()}
                className="w-[80px] rounded-r-[13px] text-white font-semibold h-[40px] px-1 bg-[rgb(235,110,75)] hover:bg-[rgb(130,59,40)] active:scale-105 active:bg-[rgb(243,89,46)]"
              >
                Clear
              </button>
            </>
          ) : (
            <button
              disabled
              className="w-[80px] rounded-r-[13px] text-white font-semibold h-[40px] px-1 bg-[rgb(235,110,75)]"
            >
              Search
            </button>
          )}
          <div className="absolute text-shadow--black -top-7 text-white text-[0.9rem] md:text-[1.2rem] md:-top-9 lg:text-[1.4rem] lg:-top-12 font-semibold">
            {globalSearch === "on" ? (
              <span>Search for cities globally:</span>
            ) : (
              <span>Search for cities in Thailand:</span>
            )}
          </div>
        </div>
        <div className="relative w-[35px] h-[35px] flex items-center justify-center">
          <button
            id="locate_coordinate_btn"
            title="Find your location"
            onClick={(e) => {
              getUserCoordinate(e), denyMessage();
            }}
            className="flex justify-center items-center h-[35px] w-[35px] hover:scale-125 active:scale-100 transition-all"
          >
            <BiCurrentLocation className="h-full w-full text-[#EA6E4B] hover:text-[#b8563b]" />
          </button>
          <div
            id="locate_coordinate_message"
            className="resize--blinking absolute -top-16 -left-10 transition-all"
          >
            <img src={chat} />
            <span className="absolute top-1 left-0 text-white text-[0.8rem] font-semibold capitalize text-center">
              your location
            </span>
          </div>
        </div>
      </div>
      <div
        id="search__container--des"
        className="flex flex-col items-center w-full text-white text-shadow--black"
      >
        <p className="text-[0.4rem] font-semibold sm:text-[0.8rem] lg:text-[1.2rem]">
          By default, only search for cities in Thailand.
        </p>
        <p className="text-[0.4rem] font-semibold sm:text-[0.8rem] lg:text-[1.2rem]">
          You can toggle the switch on the top-right side to search for cities
          globally.
        </p>
      </div>
    </form>
  );
};
