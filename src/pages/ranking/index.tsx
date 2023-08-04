import { RankingTable } from "@/components/rankingtable";
import { Watchlist } from "@/components/watchlist";
import "./index.css";
import { useEffect, useState } from "react";
import { weatherDataResponse } from "@/interface/weatherDataResponse";
import { coordinateLocationService, weatherDataService } from "@/services";
import { useAllWeatherDataStore } from "@/storage/allWeatherDataStore";
import { coordinateLocationRespon } from "@/interface/coordinateLocationRespon";
import ReactLoading from "react-loading";
import { getWithExpiry, setWithExpiry } from "@/utils";
import { all_province } from "@/utils/province";
import { BiSolidArrowToTop } from "react-icons/bi";
import { Banner } from "@/components/banner";
import { Contact } from "@/components/contact";
import { Background } from "@/components/background";
import { Alert } from "@/components/alert";
import { shownAlert } from "@/utils";

// let APIUsageCount = 0;
let preScrollTop = 0;

const Ranking = () => {
  const {
    setAllLocation,
    setFetchAllLocation,
    fetchAllWeatherData,
    setFetchAllWeatherData,
    setAllWeatherData,
  } = useAllWeatherDataStore();
  const page = document.getElementById("ranking__page") as HTMLElement;
  const [isBottom, setIsBottom] = useState(false);
  const banner = document.getElementById("banner__component") as HTMLElement;

  function setBannerByScroll() {
    const currentScrollTop = page.scrollTop;
    if (page.scrollTop > banner.offsetHeight) {
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
    if (page.scrollTop > 0) {
      banner?.classList.add("bg-[rgb(0,0,0,0.4)]");
    } else banner?.classList.remove("bg-[rgb(0,0,0,0.4)]");
  }

  const getAllProvincesDataAPI = async (
    LocationList: coordinateLocationRespon
  ) => {
    const allProvinceData: weatherDataResponse[] = [];
    const checkRepeated: any = [];

    setAllWeatherData({ data: [], loading: true, error: null });
    setFetchAllWeatherData({ data: [], loading: true, error: null });

    for (const item of LocationList) {
      if (item.country === "TH") {
        const arrName = item.name.toLowerCase().split(" ");
        const arrState = item.state.toLowerCase().split(" ");

        for (const p of arrName) {
          if (arrState.find((q) => q.match(p))) {
            if (!checkRepeated.includes(item.name)) {
              checkRepeated.push(item.name);
              const lat = item.lat;
              const lon = item.lon;
              const dataRespon = await weatherDataService.getWeatherDataService(
                lat,
                lon
              );
              if (dataRespon.status === 200) {
                // APIUsageCount++;
                allProvinceData.push({
                  ...dataRespon.data,
                  name: item.name,
                  local_name: item.local_names.th,
                });
              } else if (dataRespon.status === 429) {
                shownAlert(
                  "Due to exceeding the requests limitation, please try to access this website tomorrow. Thanks ;D"
                );
                setAllWeatherData({ data: [], loading: false, error: null });
                setFetchAllWeatherData({
                  data: [],
                  loading: false,
                  error: null,
                });
                return;
              } else {
                shownAlert(dataRespon.error.message);
                setAllWeatherData({ data: [], loading: false, error: null });
                setFetchAllWeatherData({
                  data: [],
                  loading: false,
                  error: null,
                });
                return;
              }
            }
          }
        }
      }
    }

    setWithExpiry("allThaiProvincesWeather", allProvinceData, 10);
    setAllWeatherData({ data: allProvinceData, loading: false, error: null });
    setFetchAllWeatherData({
      data: allProvinceData,
      loading: false,
      error: null,
    });
  };

  const getLocation = async () => {
    const allLocationData: coordinateLocationRespon = [];
    const checkRepeated: any = [];

    setAllLocation({ data: [], loading: true, error: null });
    setFetchAllLocation({ data: [], loading: true, error: null });

    for (const province of all_province) {
      const response = await coordinateLocationService.getCoordinateLocation(
        province
      );

      if (response.status === 200) {
        for (const item of response.data) {
          if (item.country === "TH") {
            const arrName = item.name.toLowerCase().split(" ");
            const arrState = item.state.toLowerCase().split(" ");

            for (const p of arrName) {
              if (arrState.find((q) => q.match(p))) {
                if (!checkRepeated.includes(item.name)) {
                  checkRepeated.push(item.name);
                  allLocationData.push(item);
                }
              }
            }
          }
        }
      } else {
        shownAlert(`${response.error?.message} CODE: ${response.error?.code}`);
        setAllLocation({ data: [], loading: false, error: null });
        setFetchAllLocation({ data: [], loading: false, error: null });
      }
    }

    localStorage.setItem(
      "allThaiProvincesLocation",
      JSON.stringify(allLocationData)
    );
    setAllLocation({ data: allLocationData, loading: false, error: null });
    setFetchAllLocation({
      data: allLocationData,
      loading: false,
      error: null,
    });
  };

  function toTop() {
    const topEle = document.getElementById("ranking__page") as HTMLDivElement;
    topEle.scrollTo(0, 0);
  }

  function topBottomBtnHandler() {
    const triggerHeight = (page.scrollHeight - page.clientHeight) * 0.1;
    page.scrollTop > triggerHeight ? setIsBottom(true) : setIsBottom(false);
  }

  // CSS
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
    setTimeout(() => {
      const startingCompoonents = document.getElementsByClassName(
        "starting__animation--fourth"
      );
      for (const i of startingCompoonents) {
        i.classList.remove("initiator");
        i.classList.add("initialize");
      }
    }, 1500);
  }, []);

  useEffect(() => {
    const savedTHLocationStr = localStorage.getItem("allThaiProvincesLocation");
    const savedTHWeather = getWithExpiry("allThaiProvincesWeather");
    if (savedTHWeather) {
      setAllWeatherData({
        data: savedTHWeather,
        loading: false,
        error: null,
      });
      setFetchAllWeatherData({
        data: savedTHWeather,
        loading: false,
        error: null,
      });
    } else if (savedTHLocationStr) {
      const savedTHLocation = JSON.parse(savedTHLocationStr);
      getAllProvincesDataAPI(savedTHLocation);
    } else {
      getLocation();
    }
  }, []);

  // API USE CHECK
  // useEffect(() => {
  //   const checkAPIUsageStr = localStorage.getItem("trackAPIUsage");
  //   console.log("APICallCount", APIUsageCount);

  //   if (checkAPIUsageStr) {
  //     const checkAPIUsageData = JSON.parse(checkAPIUsageStr);

  //     if (checkAPIUsageData.update === "not yet") {
  //       const updateStatus = { ...checkAPIUsageData, update: "done" };

  //       APIUsageCount = checkAPIUsageData.call;
  //       localStorage.setItem("trackAPIUsage", JSON.stringify(updateStatus));
  //     } else if (checkAPIUsageData.update === "done") {
  //       const trackAPIUsage = {
  //         call: APIUsageCount,
  //         exp: checkAPIUsageData.exp,
  //         update: "not yet",
  //       };

  //       localStorage.setItem("trackAPIUsage", JSON.stringify(trackAPIUsage));
  //     }
  //   }
  // }, [APIUsageCount]);

  return (
    <div
      id="ranking__page"
      onScroll={() => {
        topBottomBtnHandler(), setBannerByScroll(), setOpacBanner();
      }}
      className="scroll--dec text-black h-[100dvh] overflow-y-scroll scroll-smooth"
    >
      {isBottom ? (
        <button
          onClick={() => toTop()}
          className="fixed bottom-5 right-5 w-[25px] aspect-square bg-[rgb(234,110,75,0.8)] flex justify-center items-center rounded-xl animate-bounce hover:animate-none active:scale-90"
        >
          <BiSolidArrowToTop />
        </button>
      ) : null}
      {fetchAllWeatherData.loading && (
        <div className="z-50 flex justify-center items-center fixed top-0 bottom-0 right-0 left-0 h-[100%] w-[100%] bg-[rgb(255,255,255,0.2)]">
          <ReactLoading
            type={"spin"}
            color={"#EB6E4B"}
            height={"80px"}
            width={"80px"}
          />
        </div>
      )}
      <div
        id="alert__container"
        className="w-[100dvw] z-20 fixed -top-[20%] transition-all duration-500 ease-out"
      >
        <Alert />
      </div>
      <div className="-z-10 w-[100dvw] flex h-[100dvh] fixed top-0">
        <Background />
      </div>
      <div className="h-[13%] sticky top-0 z-10 initiator starting__animation--first">
        <Banner trackPage={"rankingPage"} />
      </div>
      <div className="sm:p-[20px] min-h-[80%] justify-center items-center">
        <div className="scroll--dec m-auto p-[5px] max-h-[350px] mb-[10px] w-full bg-[rgb(255,255,255,0.8)] sm:rounded-[10px] overflow-x-auto initiator starting__animation--second">
          <Watchlist />
        </div>
        <div className="scroll--dec m-auto px-1 bg-[rgb(255,255,255,0.8)] w-full sm:rounded-[10px] overflow-x-auto initiator starting__animation--third">
          <RankingTable />
        </div>
      </div>
      <div className="h-[7%] bg-[rgb(0,0,0,0.2)] initiator starting__animation--fourth">
        <Contact />
      </div>
    </div>
  );
};

export default Ranking;
