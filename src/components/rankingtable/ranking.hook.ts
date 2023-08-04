import { weatherDataResponse } from "@/interface/weatherDataResponse";
import { useAllWeatherDataStore } from "@/storage/allWeatherDataStore";
import { sortOptionsType, useSortingStore } from "@/storage/sortingStore";
import { regionStore } from "@/utils/province";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const useRanking = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { sortName, sortTemp, sortHumi, sortSunr, sortSuns } =
    useSortingStore();
  const searchKeyword = watch("searchKeyword");
  const filterRegion = watch("filterRegion");

  const { setAllWeatherData, fetchAllWeatherData } = useAllWeatherDataStore();

  function dltsomestr(name: string | undefined) {
    return name
      ?.replace("town", "")
      .replace("city", "")
      .replace("municipality", "")
      .replace("-", " ")
      .trim();
  }

  // const setData = (province: string[]) => {
  //   const provincesWeatherData: weatherDataResponse[] = [];

  //   for (const name of province) {
  //     fetchAllWeatherData.data?.filter((item) => {
  //       const fetchName = dltsomestr(item.name).toLowerCase().replace(/ /g, "");
  //       const inputName = name.toLowerCase().replace(/ /g, "");

  //       if (fetchName.includes(inputName)) {
  //         provincesWeatherData.push(item);
  //       }
  //     });
  //   }

  //   setAllWeatherData({
  //     data: provincesWeatherData,
  //     loading: false,
  //     error: null,
  //   });
  // };

  function searchName(
    region: string,
    keyword: string,
    name: sortOptionsType,
    temp: sortOptionsType,
    humi: sortOptionsType,
    sunr: sortOptionsType,
    suns: sortOptionsType
  ) {
    const provincesWeatherData: weatherDataResponse[] = [];

    for (const item of regionStore) {
      if (region === item.name) {
        for (const name of item.province) {
          fetchAllWeatherData.data?.filter((item) => {
            const fetchName = dltsomestr(item.name)
              ?.toLowerCase()
              .replace(/ /g, "");
            const inputName = name.toLowerCase().replace(/ /g, "");

            if (fetchName?.includes(inputName)) {
              provincesWeatherData.push(item);
            }
          });
        }
      }
    }

    const result = provincesWeatherData.filter(
      (i) =>
        dltsomestr(i.name)
          ?.toLowerCase()
          .replace(/ /g, "")
          .includes(keyword?.toLowerCase().replace(/ /g, "")) ||
        dltsomestr(i.local_name)
          ?.toLowerCase()
          .replace(/ /g, "")
          .includes(keyword?.toLowerCase().replace(/ /g, ""))
    );

    return updateSortName(result, name);

    function updateSortName(
      data: weatherDataResponse[] | undefined,
      sortn: sortOptionsType
    ) {
      if (sortn.default === "on") {
        return updateSortTemp(data, temp);
      }

      if (sortn.ascending === "on") {
        const sortedn = data?.sort((a, b) => {
          if (a.name && b.name) {
            return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
          } else return 0;
        });
        return updateSortTemp(sortedn, temp);
      }

      if (sortn.descending === "on") {
        const sortedn = data?.sort((a, b) => {
          if (a.name && b.name) {
            return a.name > b.name ? -1 : a.name > b.name ? 1 : 0;
          } else return 0;
        });
        return updateSortTemp(sortedn, temp);
      }
    }

    function updateSortTemp(
      data: weatherDataResponse[] | undefined,
      sortt: sortOptionsType
    ) {
      if (sortt.default === "on") {
        return updateSortHumi(data, humi);
      }

      if (sortt.ascending === "on") {
        const sortedt = data?.sort((a, b) => b.current.temp - a.current.temp);
        return updateSortHumi(sortedt, humi);
      }

      if (sortt.descending === "on") {
        const sortedt = data?.sort((a, b) => a.current.temp - b.current.temp);
        return updateSortHumi(sortedt, humi);
      }
    }

    function updateSortHumi(
      data: weatherDataResponse[] | undefined,
      sorth: sortOptionsType
    ) {
      if (sorth.default === "on") {
        return updateSortSunr(data, sunr);
      }

      if (sorth.ascending === "on") {
        const sortedh = data?.sort(
          (a, b) => b.current.humidity - a.current.humidity
        );
        return updateSortSunr(sortedh, sunr);
      }

      if (sorth.descending === "on") {
        const sortedh = data?.sort(
          (a, b) => a.current.humidity - b.current.humidity
        );
        return updateSortSunr(sortedh, sunr);
      }
    }

    function updateSortSunr(
      data: weatherDataResponse[] | undefined,
      sortsr: sortOptionsType
    ) {
      if (sortsr.default === "on") {
        return updateSortSuns(data, suns);
      }

      if (sortsr.ascending === "on") {
        const sortedsr = data?.sort(
          (a, b) => b.current.sunrise - a.current.sunrise
        );
        return updateSortSuns(sortedsr, suns);
      }

      if (sortsr.descending === "on") {
        const sortedsr = data?.sort(
          (a, b) => a.current.sunrise - b.current.sunrise
        );
        return updateSortSuns(sortedsr, suns);
      }
    }

    function updateSortSuns(
      data: weatherDataResponse[] | undefined,
      sortss: sortOptionsType
    ) {
      if (sortss.default === "on") {
        return data;
      }

      if (sortss.ascending === "on") {
        return data?.sort((a, b) => b.current.sunset - a.current.sunset);
      }

      if (sortss.descending === "on") {
        return data?.sort((a, b) => a.current.sunset - b.current.sunset);
      }
    }
  }

  useEffect(() => {
    const data = searchName(
      filterRegion,
      searchKeyword,
      sortName,
      sortTemp,
      sortHumi,
      sortSunr,
      sortSuns
    );
    setAllWeatherData({ data: data, loading: false, error: null });
  }, [
    filterRegion,
    searchKeyword,
    sortName,
    sortTemp,
    sortHumi,
    sortSunr,
    sortSuns,
  ]);

  return {
    fieldSearchKeyword: register("searchKeyword"),
    fieldFilterRegion: register("filterRegion"),
  };
};
