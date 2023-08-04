import { LuArrowDownUp, LuArrowDown, LuArrowUp } from "react-icons/lu";
import { IoMdCheckmarkCircle, IoMdAddCircleOutline } from "react-icons/io";
import { useRanking } from "./ranking.hook";
import { useSortingStore } from "@/storage/sortingStore";
import { FiSearch } from "react-icons/fi";
import { regions } from "@/utils/province";
import { weatherDataResponse } from "@/interface/weatherDataResponse";
import { useWatchlist } from "@/storage/watchlist";
import { useEffect } from "react";
import { useAllWeatherDataStore } from "@/storage/allWeatherDataStore";
import {
  getWatchlistWithExpiry,
  setWatchlistWithExpiry,
  setWithSameExpiry,
  shownAlert,
} from "@/utils";

export const RankingTable = () => {
  const { fieldSearchKeyword, fieldFilterRegion } = useRanking();
  const { allWeatherData } = useAllWeatherDataStore();
  const {
    sortName,
    sortTemp,
    sortHumi,
    sortSunr,
    sortSuns,
    setSortName,
    setSortTemp,
    setSortHumi,
    setSortSunr,
    setSortSuns,
  } = useSortingStore();

  const { watchlist, setWatchlist } = useWatchlist();

  function sortNameHanddler() {
    sortName.default === "on" || sortName.descending === "on"
      ? (setSortName({ default: "off" }),
        setSortName({ ascending: "on" }),
        setSortTemp({ default: "on" }),
        setSortHumi({ default: "on" }),
        setSortSunr({ default: "on" }),
        setSortSuns({ default: "on" }))
      : sortName.ascending === "on"
      ? (setSortName({ ascending: "off" }), setSortName({ descending: "on" }))
      : setSortName({ descending: "off" });
  }

  function sortTempHanddler() {
    sortTemp.default === "on" || sortTemp.descending === "on"
      ? (setSortTemp({ default: "off" }),
        setSortTemp({ ascending: "on" }),
        setSortName({ default: "on" }),
        setSortHumi({ default: "on" }),
        setSortSunr({ default: "on" }),
        setSortSuns({ default: "on" }))
      : sortTemp.ascending === "on"
      ? (setSortTemp({ ascending: "off" }), setSortTemp({ descending: "on" }))
      : setSortTemp({ descending: "off" });
  }

  function sortHumiHanddler() {
    sortHumi.default === "on" || sortHumi.descending === "on"
      ? (setSortHumi({ default: "off" }),
        setSortHumi({ ascending: "on" }),
        setSortName({ default: "on" }),
        setSortTemp({ default: "on" }),
        setSortSunr({ default: "on" }),
        setSortSuns({ default: "on" }))
      : sortHumi.ascending === "on"
      ? (setSortHumi({ ascending: "off" }), setSortHumi({ descending: "on" }))
      : setSortHumi({ descending: "off" });
  }

  function sortSunrHanddler() {
    sortSunr.default === "on" || sortSunr.descending === "on"
      ? (setSortSunr({ default: "off" }),
        setSortSunr({ ascending: "on" }),
        setSortName({ default: "on" }),
        setSortTemp({ default: "on" }),
        setSortHumi({ default: "on" }),
        setSortSuns({ default: "on" }))
      : sortSunr.ascending === "on"
      ? (setSortSunr({ ascending: "off" }), setSortSunr({ descending: "on" }))
      : setSortSunr({ descending: "off" });
  }

  function sortSunsHanddler() {
    sortSuns.default === "on" || sortSuns.descending === "on"
      ? (setSortSuns({ default: "off" }),
        setSortSuns({ ascending: "on" }),
        setSortName({ default: "on" }),
        setSortTemp({ default: "on" }),
        setSortHumi({ default: "on" }),
        setSortSunr({ default: "on" }))
      : sortSuns.ascending === "on"
      ? (setSortSuns({ ascending: "off" }), setSortSuns({ descending: "on" }))
      : setSortSuns({ descending: "off" });
    // : (setSortSuns({ descending: "off" }), setSortSuns({ default: "on" })); // OG
  }

  function addWatchlist(i: weatherDataResponse) {
    if ((watchlist.data ? watchlist.data.length : 0) < 3) {
      // console.log(watchlist.data?.length);

      setWatchlist({
        data: [...(watchlist.data !== undefined ? watchlist.data : []), i],
        // data: [...(watchlist.data || []), i], // other idea
        loading: false,
        error: null,
      });
    } else shownAlert("Watchlist contains maximum 3 items");
  }

  // Get userSaved w/o Expiry
  // useEffect(() => {
  //   const watchlistStr = localStorage.getItem("userSaved");

  //   if (watchlistStr) {
  //     const watchlist = JSON.parse(watchlistStr);

  //     setWatchlist({
  //       data: watchlist.value,
  //       loading: false,
  //       error: null,
  //     });
  //   }
  // }, []);

  // official version
  useEffect(() => {
    async function checkSavedWatchlist() {
      setWatchlist({ data: [], loading: true, error: null });

      const dataSaved = await getWatchlistWithExpiry("userSaved");

      if (dataSaved) {
        setWatchlist({
          data: dataSaved,
          loading: false,
          error: null,
        });
      } else {
        setWatchlist({
          data: [],
          loading: false,
          error: null,
        });
      }
    }
    checkSavedWatchlist();
  }, []);

  useEffect(() => {
    if (watchlist.data) {
      if (watchlist.data.length !== 0) {
        const userSaved = localStorage.getItem("userSaved");

        if (userSaved) {
          const dataSaved = JSON.parse(userSaved);

          if (dataSaved.expiry) {
            setWithSameExpiry("userSaved", watchlist.data);
          }
        }

        setWatchlistWithExpiry("userSaved", watchlist.data);
      }
    }
  }, [watchlist]);

  return (
    <div className="w-full scroll--dec overflow-y-auto">
      <div className="sm:w-full h-[80px] sm:h-[40px] flex flex-col sm:flex-row-reverse sm:items-center py-2 gap-2 sticky top-0 left-0">
        <div className="w-full max-w-[450px] flex items-center rounded-[10px] py-4 bg-gray-700 focus-within:font-semibold focus-within:bg-[rgb(235,110,75)] h-[25px] overflow-hidden">
          <input
            type="text"
            placeholder="e.g. Bangkok, กรุงเทพ,..."
            {...fieldSearchKeyword}
            className="bg-transparent w-[90%] text-[0.8rem] sm:text-[1rem] focus:outline-none capitalize text-white text-center placeholder:normal-case placeholder:text-[rgba(255,255,255,0.7)] placeholder:text-center"
          />
          <FiSearch className="text-white" />
        </div>
        <div className="w-full flex items-center gap-2">
          <select
            {...fieldFilterRegion}
            className="capitalize w-[70%] sm:w-[200px] text-center h-[32px] rounded-[10px] bg-gray-700 placeholder-gray-400 text-white"
          >
            {regions.map((i, index) => {
              return <option key={index}>{i}</option>;
            })}
          </select>
          <div className="font-semibold text-[0.9rem] sm:text-[1rem] text-slate-500">
            (count: {allWeatherData.data?.length})
          </div>
        </div>
      </div>
      <div className="w-full">
        <table className="w-full my-[10px] outline-none">
          <thead>
            <tr className="border border-b-black">
              <th className="p-1 border border-black font-normal text-[1px]">
                {/* (add watchlist) */}
              </th>
              <th className="p-1 border border-black">
                <button
                  type="button"
                  className="w-full flex justify-center hover:text-[rgb(234,110,75)] active:scale-105 hover:scale-110"
                  onClick={() => sortNameHanddler()}
                >
                  <div className="flex items-center gap-[5px]">
                    Name
                    {sortName.default === "on" ? (
                      <LuArrowDownUp className="scale-125" />
                    ) : sortName.ascending === "on" ? (
                      <LuArrowDown
                        title="sort ascending name(A-Z)"
                        className="text-[rgb(234,110,75)] scale-125"
                      />
                    ) : (
                      <LuArrowUp
                        title="sort descending name(Z-A)"
                        className="text-[rgb(234,110,75)] scale-125"
                      />
                    )}
                  </div>
                </button>
              </th>
              <th className="p-1 border border-black">
                <button
                  type="button"
                  className="w-full flex justify-center hover:text-[rgb(234,110,75)] active:scale-105 hover:scale-110"
                  onClick={() => sortTempHanddler()}
                >
                  <div className="flex items-center gap-[5px]">
                    Temperature
                    {sortTemp.default === "on" ? (
                      <LuArrowDownUp className="scale-125" />
                    ) : sortTemp.ascending === "on" ? (
                      <LuArrowDown
                        title="sort ascending temp. high to low"
                        className="text-[rgb(234,110,75)] scale-125"
                      />
                    ) : (
                      <LuArrowUp
                        title="sort ascending temp. low to high"
                        className="text-[rgb(234,110,75)] scale-125"
                      />
                    )}
                  </div>
                </button>
              </th>
              <th className="p-1 border border-black">
                <button
                  type="button"
                  className="w-full flex justify-center hover:text-[rgb(234,110,75)] active:scale-105 hover:scale-110"
                  onClick={() => sortHumiHanddler()}
                >
                  <div className="flex items-center gap-[5px]">
                    Humidity
                    {sortHumi.default === "on" ? (
                      <LuArrowDownUp className="scale-125" />
                    ) : sortHumi.ascending === "on" ? (
                      <LuArrowDown className="text-[rgb(234,110,75)] scale-125" />
                    ) : (
                      <LuArrowUp className="text-[rgb(234,110,75)] scale-125" />
                    )}
                  </div>
                </button>
              </th>
              <th className="p-1 border border-black">
                <button
                  type="button"
                  className="w-full flex justify-center hover:text-[rgb(234,110,75)] active:scale-105 hover:scale-110"
                  onClick={() => sortSunrHanddler()}
                >
                  <div className="flex items-center gap-[5px]">
                    Sunrise
                    {sortSunr.default === "on" ? (
                      <LuArrowDownUp className="scale-125" />
                    ) : sortSunr.ascending === "on" ? (
                      <LuArrowDown className="text-[rgb(234,110,75)] scale-125" />
                    ) : (
                      <LuArrowUp className="text-[rgb(234,110,75)] scale-125" />
                    )}
                  </div>
                </button>
              </th>
              <th className="p-1 border border-black">
                <button
                  type="button"
                  className="w-full flex justify-center hover:text-[rgb(234,110,75)] active:scale-105 hover:scale-110"
                  onClick={() => sortSunsHanddler()}
                >
                  <div className="flex items-center gap-[5px]">
                    Sunset
                    {sortSuns.default === "on" ? (
                      <LuArrowDownUp className="scale-125" />
                    ) : sortSuns.ascending === "on" ? (
                      <LuArrowDown className="text-[rgb(234,110,75)] scale-125" />
                    ) : (
                      <LuArrowUp className="text-[rgb(234,110,75)] scale-125" />
                    )}
                  </div>
                </button>
              </th>
              <th className="p-1 border border-black">Weather</th>
            </tr>
          </thead>
          <tbody>
            {allWeatherData.data?.map((i, index) => {
              return (
                <tr key={index} className="text-center text-[0.8rem]">
                  <td className="border border-black">
                    {!watchlist.data?.find((item) => item.name === i.name) ? (
                      <button
                        onClick={() => addWatchlist(i)}
                        className="hover:scale-105 active:scale-95"
                      >
                        <IoMdAddCircleOutline
                          title="add to watchlist"
                          className="h-[25px] w-[25px] m-auto rounded-[50%] active:text-white active:bg-[rgb(235,110,75)] hover:text-[rgb(235,110,75)] hover:bg-transparent"
                        />
                      </button>
                    ) : (
                      <IoMdCheckmarkCircle
                        title="watchlist added"
                        className="h-[25px] w-[25px] text-[rgb(235,110,75)] m-auto"
                      />
                    )}
                  </td>
                  <td className="border border-black capitalize">
                    {i.name
                      ?.toLowerCase()
                      .replace("city", "")
                      .replace("municipality", "")
                      .replace("town", "")
                      .replace("-", " ")
                      .trim()}
                  </td>
                  <td className="border border-black">{i.current.temp} °C</td>
                  <td className="border border-black">
                    {i.current.humidity} %
                  </td>
                  <td className="border border-black">
                    {new Date(i.current.sunrise * 1000).toLocaleTimeString(
                      "en-TH"
                    )}
                  </td>
                  <td className="border border-black">
                    {new Date(i.current.sunset * 1000).toLocaleTimeString(
                      "en-TH"
                    )}
                  </td>
                  <td className="border border-black">
                    <img
                      title={i.current.weather[0].description}
                      src={`https://openweathermap.org/img/wn/${i.current.weather[0].icon}@2x.png`}
                      alt={`weather_${i.current.weather[0].main}`}
                      className="h-[40px] w-[40px] m-auto"
                    />
                    <p className="text-[0.5rem] text-center font-semibold">
                      {i.current.weather[0].description}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
