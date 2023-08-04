import { Banner } from "@/components/banner";
import { Contact } from "@/components/contact";
import { SearchBar } from "@/components/searchbar";
import { useEffect } from "react";
import { coordinateLocationService } from "@/services";
import { all_province } from "@/utils/province";
import { useAllWeatherDataStore } from "@/storage/allWeatherDataStore";
import { coordinateLocationRespon } from "@/interface/coordinateLocationRespon";
import ReactLoading from "react-loading";
import "./index.css";
import RandomWeather from "@/components/randomweather";
import { PreviewDetail } from "@/components/previewDetail";
import { Background } from "@/components/background";
import { Alert } from "@/components/alert";
import { shownAlert } from "@/utils";

const Homepage = () => {
  const detail = document.getElementById("selection__container") as HTMLElement;
  const search = document.getElementById("search__container") as HTMLElement;
  const searchDes = document.getElementById(
    "search__container--des"
  ) as HTMLElement;
  const weather = document.getElementById("weather__container") as HTMLElement;
  const { fetchAllLocation, setAllLocation, setFetchAllLocation } =
    useAllWeatherDataStore();

  const home = document.getElementById("home__page") as HTMLDivElement;
  const banner = document.getElementById("banner__component") as HTMLDivElement;
  let preScrollTop = 0;

  function setBannerByScroll() {
    const currentScrollTop = home.scrollTop;
    if (home.scrollTop > banner.offsetHeight) {
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
    if (home.scrollTop > 0) {
      banner?.classList.add("bg-[rgb(0,0,0,0.4)]");
    } else banner?.classList.remove("bg-[rgb(0,0,0,0.4)]");
  }

  const getLocation = async () => {
    const allLocationData: coordinateLocationRespon = [];
    const checkRepeated: any = [];

    setAllLocation({ data: undefined, loading: true, error: undefined });
    setFetchAllLocation({ data: undefined, loading: true, error: undefined });

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
      } else if (response.status === 401) {
        shownAlert(
          "Please contact the project owner and try again next time. Sorry for any inconvenience."
        );
        setAllLocation({
          data: undefined,
          loading: false,
          error: response.error,
        });
        setFetchAllLocation({
          data: undefined,
          loading: false,
          error: response.error,
        });
        return;
      } else if (response.status === 429) {
        shownAlert(
          "Due to exceeding the requests limitation, please try to access this website tomorrow. Thanks ;D"
        );
        setAllLocation({
          data: undefined,
          loading: false,
          error: response.error,
        });
        setFetchAllLocation({
          data: undefined,
          loading: false,
          error: response.error,
        });
        return;
      } else {
        setAllLocation({
          data: undefined,
          loading: false,
          error: response.error,
        });
        setFetchAllLocation({
          data: undefined,
          loading: false,
          error: response.error,
        });
        shownAlert("Error. 404");
        return;
      }
    }

    localStorage.setItem(
      "allThaiProvincesLocation",
      JSON.stringify(allLocationData)
    );
    setAllLocation({ data: allLocationData, loading: false, error: undefined });
    setFetchAllLocation({
      data: allLocationData,
      loading: false,
      error: undefined,
    });
  };

  function showDetailHanddler(action: string) {
    // showDetail === "on" ? setShowDetail("off") : setShowDetail("on");
    const startingCompoonents = document.getElementsByClassName(
      "starting__animation--second"
    );
    for (const i of startingCompoonents) {
      i.classList.remove("initialize");
    }

    function dismiss(reaction: string) {
      detail.classList.remove("fadeIn");
      search.classList.remove("fadeOut");
      searchDes.classList.remove("hidden");
      weather.classList.remove("expand");

      if (reaction === "reopen") {
        popup();
      }
    }

    function popup() {
      detail.classList.add("fadeIn");
      search.classList.add("fadeOut");
      weather.classList.add("expand");
      searchDes.classList.add("hidden");
    }

    if (action === "close") {
      dismiss("");
    }

    if (action === "open") {
      detail.classList.contains("fadeIn") ? dismiss("reopen") : popup();
    }
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

    if (savedTHLocationStr) {
      const savedTHLocation = JSON.parse(savedTHLocationStr);

      setAllLocation({
        data: savedTHLocation,
        loading: false,
        error: undefined,
      });
      setFetchAllLocation({
        data: savedTHLocation,
        loading: false,
        error: undefined,
      });
    } else if (!fetchAllLocation.data) {
      getLocation();
    }
  }, []);

  return (
    <div
      onScroll={() => {
        setBannerByScroll(), setOpacBanner();
      }}
      id="home__page"
      className="scroll--dec relative h-[100dvh] overflow-y-auto scroll-smooth"
    >
      {fetchAllLocation.loading && (
        <div className="z-50 flex justify-center items-center fixed top-0 bottom-0 right-0 left-0 h-[100dvh] w-[100vw] bg-[rgb(100,100,100,0.4)]">
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
      <div className="sticky top-0 z-10 h-[15%] starting__animation--first initiator">
        <Banner trackPage={"homePage"} />
      </div>
      <div
        id="weather__container"
        className="h-[45%] starting__animation--second initiator"
      >
        <SearchBar />
        <PreviewDetail showDetail={(e: string) => showDetailHanddler(e)} />
      </div>
      <div className="h-[35%] flex items-end starting__animation--third initiator">
        {fetchAllLocation.data && (
          <RandomWeather showDetail={(e: string) => showDetailHanddler(e)} />
        )}
      </div>
      <div className="h-[5%] text-black starting__animation--fourth initiator">
        <Contact />
      </div>
    </div>
  );
};

export default Homepage;
