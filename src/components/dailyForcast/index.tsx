import { Daily } from "@/interface/weatherDataResponse";
// import { useEffect, useState } from "react";
import { RxCalendar } from "react-icons/rx";
import { MdWaterDrop } from "react-icons/md";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { LiaTemperatureHighSolid } from "react-icons/lia";
import { PiSmileyNervousDuotone, PiSmileyWinkDuotone } from "react-icons/pi";
import { TbUvIndex } from "react-icons/tb";
import {
  WiMoonFirstQuarter,
  WiMoonFull,
  WiMoonNew,
  WiMoonThirdQuarter,
  WiMoonWaningCrescent3,
  WiMoonWaningGibbous1,
  WiMoonWaxingCrescent4,
  WiMoonWaxingGibbous6,
  WiMoonrise,
  WiMoonset,
} from "react-icons/wi";
import { LuSunrise, LuSunset } from "react-icons/lu";
import "./index.css";

type attrType = { daily: Daily[] };

export const DailyForcast = ({ daily }: attrType) => {
  function hourAndMinTime(value: number) {
    const time = new Date(value * 1000).toDateString();
    return time;
  }
  function hourTime(value: number) {
    const time = new Date(value * 1000).toLocaleTimeString().substring(0, 2);
    return time;
  }

  function percentageTemp(max: number, min: number, day: number, eve: number) {
    const averageTemp = (day + eve) / 2;
    const length = max - min;
    const positionInLength = averageTemp - min;
    const valuePercent = positionInLength / length;
    // const valuePercent = ((value - min) / (max - min)) * 100;

    return valuePercent * 100;
  }

  return (
    <>
      <div className="flex md:hidden flex-col gap-1 w-full h-full">
        <span className="uppercase h-[5%] flex items-center gap-2 font-semibold px-2">
          <RxCalendar className="scale-125" />
          7-day forcast
        </span>
        <div className="h-[85%] justify-between flex flex-col gap-1">
          {daily.map((i, index) => {
            const fullDate = hourAndMinTime(i.dt);
            const dayDate = fullDate.split(" ")[0];
            return (
              <div
                key={index}
                className="collapse-title flex justify-between items-center px-2 border-b-2 border-b-gray-400 last:border-none"
              >
                <div className="uppercase font-semibold">
                  {index === 0 ? "today" : dayDate}
                </div>
                <div className="flex flex-col items-center">
                  <img
                    title={i.weather[0].description}
                    src={`https://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`}
                    className="aspect-square w-[40px]"
                  />
                  {i.weather[0].main.toLowerCase().includes("rain") ? (
                    <span className="text-[0.8rem] -translate-y-2">
                      {i.pop.toFixed(1) * 100}%
                    </span>
                  ) : null}
                </div>
                <div className="relavtive flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[1.2rem] text-slate-500">
                      {i.temp.min.toFixed(0)}°
                    </span>
                    <progress
                      className="progress progress-warning w-[40dvw]"
                      value={percentageTemp(
                        i.temp.max,
                        i.temp.min,
                        i.temp.day,
                        i.temp.eve
                      )}
                      max="100"
                    ></progress>
                    <span className="font-semibold text-[1.2rem]">
                      {i.temp.max.toFixed(0)}°
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <span className="h-[10%] normal-case text-[0.8rem] md:text-[1rem] text-center p-2 text-black">
          P.S. Orange-colored bars represent the average of day and evening
          temperatures
        </span>
      </div>
      <div className="hidden md:flex flex-col gap-1 w-full h-full">
        <span className="uppercase h-[5%] flex items-center gap-2 font-semibold px-2">
          <RxCalendar className="scale-125" />
          7-day forcast
        </span>
        <div className="h-[90%] justify-between flex flex-col gap-1">
          {daily.map((i, index) => {
            const fullDate = hourAndMinTime(i.dt);
            const dayDate = fullDate.split(" ")[0];
            return (
              <div key={index} className="collapse collapse-arrow">
                <input type="checkbox" className="peer group" />
                <div className="collapse-title peer-checked:bg-[#0D3B66] peer-checked:text-white flex justify-between items-center px-2  bg-[rgb(255,255,255,0.5)] last:border-none">
                  <div className="uppercase font-semibold w-[10%] text-[1.3rem]">
                    {index === 0 ? "today" : dayDate}
                  </div>
                  <div className="flex flex-col items-center w-[10%] lg:w-[15%] scale-150">
                    <img
                      title={i.weather[0].description}
                      src={`https://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`}
                      className="aspect-square w-[40px]"
                    />
                    {i.weather[0].main.toLowerCase().includes("rain") ? (
                      <span className="text-[0.8rem] -translate-y-2 font-semibold">
                        {i.pop.toFixed(1) * 100}%
                      </span>
                    ) : null}
                  </div>
                  <div className="relavtive flex flex-col items-center w-[75%]">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[1.2rem] text-slate-400">
                        {i.temp.min.toFixed(0)}°
                      </span>
                      <progress
                        className="progress progress-warning w-[48dvw] lg:w-[24dvw]"
                        value={percentageTemp(
                          i.temp.max,
                          i.temp.min,
                          i.temp.day,
                          i.temp.eve
                        )}
                        max="100"
                      ></progress>
                      <span className="font-semibold text-[1.2rem]">
                        {i.temp.max.toFixed(0)}°
                      </span>
                    </div>
                  </div>
                </div>
                <div className="collapse-content peer-checked:bg-[#0D3B66] peer-checked:text-white">
                  <div className="p-2 mt-2 flex">
                    <div className="w-[55%] lg:w-[40%] flex lg:flex-col gap-4 rounded-xl p-4">
                      <div className="flex flex-col gap-3 w-[45%] lg:w-full border-r-2 lg:border-none pr-[2%] lg:pr-0">
                        <span className="uppercase font-semibold lg:text-[1.1rem]">
                          day summary
                        </span>
                        <span>{i.summary}</span>
                      </div>
                      <div className="carousel rounded-box w-[55%] lg:w-full flex">
                        <div className="carousel-item relative w-[90%] bg-[rgb(235,110,75)] px-4 py-2 grid grid-rows-3 grid-cols-2 text-[1rem] lg:text-[0.9rem]">
                          <div className="bouncing absolute right-4 top-4">
                            <RiArrowRightDoubleFill />
                          </div>
                          <div className="absolute right-2 bottom-0">
                            <LiaTemperatureHighSolid className="w-32 h-32 opacity-30" />
                          </div>
                          <span className="uppercase font-semibold lg:text-[1rem] col-span-2 lg:col-span-3">
                            all day temp.
                          </span>
                          <span className="flex lg:flex-col xl:flex-row gap-1">
                            High:{" "}
                            <span className="font-semibold text-[1.1rem]">
                              {i.temp.max.toFixed(0)}°
                            </span>
                          </span>
                          <span className="flex lg:flex-col xl:flex-row gap-1 lg:row-start-3">
                            Low:{" "}
                            <span className="font-semibold text-[1.1rem]">
                              {i.temp.min.toFixed(0)}°
                            </span>
                          </span>
                          <span className="flex lg:flex-col xl:flex-row gap-1">
                            morn:{" "}
                            <span className="font-semibold text-[1.1rem]">
                              {i.temp.morn.toFixed(0)}°
                            </span>
                          </span>
                          <span className="flex lg:flex-col xl:flex-row gap-1 lg:col-start-3">
                            day:{" "}
                            <span className="font-semibold text-[1.1rem]">
                              {i.temp.day.toFixed(0)}°
                            </span>
                          </span>
                          <span className="flex lg:flex-col xl:flex-row gap-1">
                            eve:{" "}
                            <span className="font-semibold text-[1.1rem]">
                              {i.temp.eve.toFixed(0)}°
                            </span>
                          </span>
                          <span className="flex lg:flex-col xl:flex-row gap-1">
                            night:{" "}
                            <span className="font-semibold text-[1.1rem]">
                              {i.temp.night.toFixed(0)}°
                            </span>
                          </span>
                        </div>
                        <div className="carousel-item relative w-[90%] text-end bg-[#3b7dbb] px-2 pr-4 py-2 grid grid-rows-4 grid-cols-1 text-[1rem] lg:text-[0.9rem]">
                          <div className="absolute bottom-2 left-2">
                            {i.temp.day > 25 ? (
                              <PiSmileyNervousDuotone className="h-32 w-32 opacity-30" />
                            ) : (
                              <PiSmileyWinkDuotone className="h-32 w-32 opacity-30" />
                            )}
                          </div>
                          <div className="bouncing absolute left-4 bottom-4">
                            <RiArrowRightDoubleFill className="rotate-180" />
                          </div>
                          <span className="uppercase font-semibold mb-3">
                            Feels like temp.
                          </span>
                          <span>
                            morn:{" "}
                            <span className="font-semibold text-[1rem]">
                              {i.feels_like.morn}°
                            </span>
                          </span>
                          <span>
                            day:{" "}
                            <span className="font-semibold text-[1rem]">
                              {i.feels_like.day}°
                            </span>
                          </span>
                          <span>
                            eve:{" "}
                            <span className="font-semibold text-[1rem]">
                              {i.feels_like.eve}°
                            </span>
                          </span>
                          <span>
                            night:{" "}
                            <span className="font-semibold text-[1rem]">
                              {i.feels_like.night}°
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-[45%] lg:w-[60%] border grid grid-cols-2 lg:grid-cols-3 grid-rows-3 lg:grid-rows-2 gap-x-2 rounded-xl px-4 py-2 lg:p-4">
                      <div className="row-span-3 grid grid-rows-3 border-r-2 pr-2 lg:row-span-1 lg:grid-rows-1 lg:col-span-3 lg:grid-cols-3 lg:border-b-2 lg:border-r-0 lg:pr-0">
                        <div className="relative flex lg:flex-col items-center justify-evenly lg:border-r-2">
                          <MdWaterDrop className="scale-[250%] lg:scale-[400%]" />
                          <span className="scale-[150%] lg:scale-[200%]">
                            {i.humidity}%
                          </span>
                          <span className="absolute -bottom-2 text-[0.8rem] lg:text-[1rem] lg:bottom-0 lowercase">
                            humidity
                          </span>
                        </div>
                        <div className="relative flex lg:flex-col items-center justify-evenly lg:border-r-2">
                          <LuSunrise className="scale-[250%] lg:scale-[350%]" />
                          <span className="scale-[150%] lg:scale-[200%]">
                            {new Date(i.sunrise * 1000)
                              .toLocaleTimeString()
                              .slice(0, 5)}
                          </span>
                          <span className="absolute -bottom-2 text-[0.8rem] lg:text-[1rem] lg:bottom-0 lowercase">
                            sunrise
                          </span>
                        </div>
                        <div className="relative flex lg:flex-col items-center justify-evenly">
                          <WiMoonrise className="scale-[400%] lg:scale-[600%]" />
                          <span className="scale-[150%] lg:scale-[200%]">
                            {new Date(i.moonrise * 1000)
                              .toLocaleTimeString()
                              .slice(0, 5)}
                          </span>
                          <span className="absolute -bottom-2 text-[0.8rem] lg:text-[1rem] lg:bottom-0 lowercase">
                            moonrise
                          </span>
                        </div>
                      </div>
                      <div className="row-span-3 grid grid-rows-3 lg:row-span-1 lg:grid-rows-1 lg:col-span-3 lg:grid-cols-3">
                        <div className="relative flex lg:flex-col items-center justify-evenly lg:border-r-2">
                          <TbUvIndex className="scale-[250%] lg:scale-[400%]" />
                          <div className="flex flex-col gap-1 lg:gap-0 items-center">
                            <span className="scale-[150%] lg:scale-[200%]">
                              {i.uvi.toFixed(0)}
                            </span>
                            <span className="text-[0.7rem]">
                              (
                              {i.uvi > 2
                                ? i.uvi > 5
                                  ? i.uvi > 7
                                    ? i.uvi > 10
                                      ? "Extreme High"
                                      : "Very High"
                                    : "High"
                                  : "Moderate"
                                : "Low"}
                              )
                            </span>
                            <span className="absolute -bottom-2 text-[0.8rem] lg:text-[1rem] lg:bottom-0 lowercase">
                              uv index
                            </span>
                          </div>
                        </div>
                        <div className="relative flex lg:flex-col items-center justify-evenly lg:border-r-2">
                          <LuSunset className="scale-[250%] lg:scale-[350%]" />
                          <span className="scale-[150%] lg:scale-[200%]">
                            {new Date(i.sunset * 1000)
                              .toLocaleTimeString()
                              .slice(0, 5)}
                          </span>
                          <span className="absolute -bottom-2 text-[0.8rem] lg:text-[1rem] lg:bottom-0 lowercase">
                            sunset
                          </span>
                        </div>
                        <div className="relative flex lg:flex-col items-center justify-evenly">
                          <WiMoonset className="scale-[400%] lg:scale-[600%]" />
                          <span className="scale-[150%] lg:scale-[200%]">
                            {new Date(i.moonset * 1000)
                              .toLocaleTimeString()
                              .slice(0, 5)}
                          </span>
                          <span className="absolute -bottom-2 text-[0.8rem] lg:text-[1rem] lg:bottom-0 lowercase">
                            moonset
                          </span>
                        </div>
                      </div>
                      {i.moon_phase ? (
                        <div className="col-span-2 lg:col-span-3 mt-2 flex items-center gap-1 justify-center text-[0.9rem]">
                          <span>moon phase:</span>
                          <span className="font-semibold">
                            {i.moon_phase === 0
                              ? "new moon"
                              : i.moon_phase > 0 && i.moon_phase < 0.25
                              ? "waxing crescent"
                              : i.moon_phase === 0.25
                              ? "first quarter moon"
                              : i.moon_phase > 0.25 && i.moon_phase < 0.5
                              ? "waxing gibous"
                              : i.moon_phase === 0.5
                              ? "full moon"
                              : i.moon_phase > 0.5 && i.moon_phase < 0.75
                              ? "waning gibous"
                              : i.moon_phase === 0.75
                              ? "last quarter moon"
                              : i.moon_phase > 0.75 && i.moon_phase < 1
                              ? "waning crescent"
                              : i.moon_phase === 1
                              ? "new moon"
                              : null}
                          </span>
                          {i.moon_phase === 0 ? (
                            <WiMoonNew />
                          ) : i.moon_phase > 0 && i.moon_phase < 0.25 ? (
                            <WiMoonWaxingCrescent4 />
                          ) : i.moon_phase === 0.25 ? (
                            <WiMoonFirstQuarter />
                          ) : i.moon_phase > 0.25 && i.moon_phase < 0.5 ? (
                            <WiMoonWaxingGibbous6 />
                          ) : i.moon_phase === 0.5 ? (
                            <WiMoonFull />
                          ) : i.moon_phase > 0.5 && i.moon_phase < 0.75 ? (
                            <WiMoonWaningGibbous1 />
                          ) : i.moon_phase === 0.75 ? (
                            <WiMoonThirdQuarter />
                          ) : i.moon_phase > 0.75 && i.moon_phase < 1 ? (
                            <WiMoonWaningCrescent3 />
                          ) : i.moon_phase === 1 ? (
                            <WiMoonNew />
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <span className="h-[5%] normal-case text-[0.8rem] md:text-[1rem] text-center p-2 text-slate-500">
          P.S. Orange-colored bars represent the average of day and evening
          temperatures
        </span>
      </div>
    </>
  );
};
