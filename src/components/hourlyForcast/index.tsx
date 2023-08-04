import { Daily, Rain, Weather2 } from "@/interface/weatherDataResponse";
import sunrise_color from "@/img/sunrise_arrow2.png";
import sunset_color from "@/img/sunset_arrow2.png";
import { useEffect, useState } from "react";
import {
  BsFillSunsetFill,
  BsSunrise,
  BsSunriseFill,
  BsSunset,
} from "react-icons/bs";
import { LuClock } from "react-icons/lu";

interface Hourly {
  dt: number;
  temp?: number;
  feels_like?: number;
  pressure?: number;
  humidity?: number;
  dew_point?: number;
  uvi?: number;
  clouds?: number;
  visibility?: number;
  wind_speed?: number;
  wind_deg?: number;
  wind_gust?: number;
  weather?: Weather2[];
  pop?: number;
  rain?: Rain;
}
type sunEvent = {
  dt: number;
  img?: string;
};

type attrType = { hourly: Hourly[]; daily: Daily[] };

export const HourlyForcast = ({ hourly, daily }: attrType) => {
  const twentyfourHourData: Hourly[] | sunEvent[] = [];
  const hourNewData: Hourly[] | sunEvent[] = [];
  const [hourData, setHourData] = useState<any>(undefined);
  // const [hourData, setHourData] = useState<Hourly[] | sunEvent[] | undefined>(
  //   undefined
  // );

  const today = daily[0];
  const tomorrow = daily[1];
  const sunEvent: sunEvent[] = [
    { dt: today.sunrise, img: sunrise_color },
    { dt: today.sunset, img: sunset_color },
    { dt: tomorrow.sunrise, img: sunrise_color },
    { dt: tomorrow.sunset, img: sunset_color },
  ];

  function hourAndMinTime(value: number) {
    const time = new Date(value * 1000).toLocaleTimeString().substring(0, 5);
    return time;
  }

  function hourTime(value: number) {
    const time = new Date(value * 1000).toLocaleTimeString().substring(0, 2);
    return time;
  }

  function startRender() {
    for (let i = 0; i <= hourly.length / 2; i++) {
      twentyfourHourData.push(hourly[i]);
      hourNewData.push(hourly[i]);
    }

    for (let i = 0; i < twentyfourHourData.length - 1; i++) {
      for (let l = 0; l < sunEvent.length; l++) {
        if (
          twentyfourHourData[i].dt < sunEvent[l].dt &&
          twentyfourHourData[i + 1].dt > sunEvent[l].dt
        ) {
          hourNewData.push(sunEvent[l]);
        }
      }
    }
    hourNewData.sort((a, b) => a.dt - b.dt);
    setHourData(hourNewData);
  }

  // console.log(hourData);

  useEffect(() => {
    startRender();
  }, []);

  return (
    <>
      <div className="flex md:hidden flex-col gap-1 min-w-[440dvw] min-[500px]:min-w-[320dvw] sm:min-w-[350dvw]">
        <span className="uppercase flex items-center gap-1 sticky top-0 left-0 w-[20%] font-semibold px-2">
          <LuClock />
          hourly forcast
        </span>
        <div className="flex">
          {hourData &&
            hourData.map((i: any, index: any) => {
              const timetitle = hourTime(i.dt);
              const suntimetitle = hourAndMinTime(i.dt);
              return (
                <div key={index} className="min-w-[60px] text-center">
                  {i.img ? (
                    <div
                      key={index}
                      className="flex flex-col h-full justify-between"
                    >
                      <span className="font-semibold">{suntimetitle}</span>
                      <span className="w-full flex justify-center">
                        {i.img === `${sunrise_color}` ? (
                          <BsSunrise className="scale-[300%]" />
                        ) : (
                          <BsSunset className="scale-[300%]" />
                        )}
                      </span>
                      <span className="font-semibold">
                        {i.img === `${sunrise_color}` ? "sunrise" : "sunset"}
                      </span>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="flex flex-col h-full justify-between text-center"
                    >
                      <span className="font-semibold">
                        {index === 0 ? "now" : timetitle}
                      </span>
                      <img
                        title={i.weather[0].description}
                        src={`https://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`}
                        className="aspect-square min-w-[40px]"
                      />
                      {i.weather[0].main.toLowerCase().includes("rain") ? (
                        <span className="text-[0.8rem] -translate-y-2">
                          {i.pop.toFixed(1) * 100}%
                        </span>
                      ) : null}
                      <span className="font-semibold text-[1.2rem]">
                        {i.temp.toFixed(0)}°
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <div className="hidden md:flex flex-col gap-1 min-w-[100dvw] lg:min-w-[110dvw] h-full">
        <span className="uppercase sticky top-0 left-0 flex items-center gap-1 w-[45%] font-semibold px-2">
          <LuClock />
          hourly forcast
        </span>
        <div className="flex lg:hidden gap-2">
          <div className="grid grid-rows-2 grid-cols-6 gap-y-4 snap-center">
            {hourData &&
              hourData.map((i: any, index: any) => {
                const timetitle = hourTime(i.dt);
                const suntimetitle = hourAndMinTime(i.dt);
                if (index < 12) {
                  return (
                    <div key={index} className="min-w-[60px] text-center">
                      {i.img ? (
                        <div
                          key={index}
                          className="flex flex-col h-full justify-between"
                        >
                          <span className="font-semibold">{suntimetitle}</span>
                          <span className="w-full flex justify-center">
                            {i.img === `${sunrise_color}` ? (
                              <BsSunrise className="scale-[300%]" />
                            ) : (
                              <BsSunset className="scale-[300%]" />
                            )}
                          </span>
                          <span className="font-semibold">
                            {i.img === `${sunrise_color}`
                              ? "sunrise"
                              : "sunset"}
                          </span>
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="flex flex-col h-full justify-between text-center"
                        >
                          <span className="font-semibold">
                            {index === 0 ? "now" : timetitle}
                          </span>
                          <img
                            title={i.weather[0].description}
                            src={`https://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`}
                            className="aspect-square min-w-[40px]"
                          />
                          {i.weather[0].main.toLowerCase().includes("rain") ? (
                            <span className="text-[0.8rem] -translate-y-2">
                              {i.pop.toFixed(1) * 100}%
                            </span>
                          ) : null}
                          <span className="font-semibold text-[1.2rem]">
                            {i.temp.toFixed(0)}°
                          </span>
                        </div>
                      )}
                    </div>
                  );
                }
              })}
          </div>
          <div className="grid grid-rows-2 grid-cols-6 gap-y-4 snap-center">
            {hourData &&
              hourData.map((i: any, index: any) => {
                const timetitle = hourTime(i.dt);
                const suntimetitle = hourAndMinTime(i.dt);
                if (index >= 12 && index < 24) {
                  return (
                    <div key={index} className="min-w-[60px] text-center">
                      {i.img ? (
                        <div
                          key={index}
                          className="flex flex-col h-full justify-between"
                        >
                          <span className="font-semibold">{suntimetitle}</span>
                          <span className="w-full flex justify-center">
                            {i.img === `${sunrise_color}` ? (
                              <BsSunrise className="scale-[300%]" />
                            ) : (
                              <BsSunset className="scale-[300%]" />
                            )}
                          </span>
                          <span className="font-semibold">
                            {i.img === `${sunrise_color}`
                              ? "sunrise"
                              : "sunset"}
                          </span>
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="flex flex-col h-full justify-between text-center"
                        >
                          <span className="font-semibold">
                            {index === 0 ? "now" : timetitle}
                          </span>
                          <img
                            title={i.weather[0].description}
                            src={`https://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`}
                            className="aspect-square min-w-[40px]"
                          />
                          {i.weather[0].main.toLowerCase().includes("rain") ? (
                            <span className="text-[0.8rem] -translate-y-2">
                              {i.pop.toFixed(1) * 100}%
                            </span>
                          ) : null}
                          <span className="font-semibold text-[1.2rem]">
                            {i.temp.toFixed(0)}°
                          </span>
                        </div>
                      )}
                    </div>
                  );
                }
              })}
          </div>
          <div className="grid grid-rows-2 grid-cols-1 gap-y-4 snap-center">
            {hourData &&
              hourData.map((i: any, index: any) => {
                const timetitle = hourTime(i.dt);
                const suntimetitle = hourAndMinTime(i.dt);
                if (index >= 24) {
                  return (
                    <div
                      key={index}
                      className="min-w-[60px] text-center last:hidden"
                    >
                      {i.img ? (
                        <div
                          key={index}
                          className="flex flex-col h-full justify-between"
                        >
                          <span className="font-semibold">{suntimetitle}</span>
                          <span className="w-full flex justify-center">
                            {i.img === `${sunrise_color}` ? (
                              <BsSunrise className="scale-[300%]" />
                            ) : (
                              <BsSunset className="scale-[300%]" />
                            )}
                          </span>
                          <span className="font-semibold">
                            {i.img === `${sunrise_color}`
                              ? "sunrise"
                              : "sunset"}
                          </span>
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="flex flex-col h-full justify-between text-center"
                        >
                          <span className="font-semibold">
                            {index === 0 ? "now" : timetitle}
                          </span>
                          <img
                            title={i.weather[0].description}
                            src={`https://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`}
                            className="aspect-square min-w-[40px]"
                          />
                          {i.weather[0].main.toLowerCase().includes("rain") ? (
                            <span className="text-[0.8rem] -translate-y-2">
                              {i.pop.toFixed(1) * 100}%
                            </span>
                          ) : null}
                          <span className="font-semibold text-[1.2rem]">
                            {i.temp.toFixed(0)}°
                          </span>
                        </div>
                      )}
                    </div>
                  );
                }
              })}
          </div>
        </div>
        <div className="hidden lg:flex gap-2">
          <div className="grid grid-rows-2 grid-cols-8 gap-y-4 snap-center">
            {hourData &&
              hourData.map((i: any, index: any) => {
                const timetitle = hourTime(i.dt);
                const suntimetitle = hourAndMinTime(i.dt);
                if (index < 16) {
                  return (
                    <div key={index} className="min-w-[60px] text-center">
                      {i.img ? (
                        <div
                          key={index}
                          className="flex flex-col h-full justify-between"
                        >
                          <span className="font-semibold">{suntimetitle}</span>
                          <span className="w-full flex justify-center">
                            {i.img === `${sunrise_color}` ? (
                              <BsSunrise className="scale-[300%]" />
                            ) : (
                              <BsSunset className="scale-[300%]" />
                            )}
                          </span>
                          <span className="font-semibold">
                            {i.img === `${sunrise_color}`
                              ? "sunrise"
                              : "sunset"}
                          </span>
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="flex flex-col h-full justify-between text-center"
                        >
                          <span className="font-semibold">
                            {index === 0 ? "now" : timetitle}
                          </span>
                          <img
                            title={i.weather[0].description}
                            src={`https://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`}
                            className="aspect-square min-w-[40px]"
                          />
                          {i.weather[0].main.toLowerCase().includes("rain") ? (
                            <span className="text-[0.8rem] -translate-y-2">
                              {i.pop.toFixed(1) * 100}%
                            </span>
                          ) : null}
                          <span className="font-semibold text-[1.2rem]">
                            {i.temp.toFixed(0)}°
                          </span>
                        </div>
                      )}
                    </div>
                  );
                }
              })}
          </div>
          <div className="grid grid-rows-2 grid-cols-8 gap-y-4 snap-start">
            {hourData &&
              hourData.map((i: any, index: any) => {
                const timetitle = hourTime(i.dt);
                const suntimetitle = hourAndMinTime(i.dt);
                if (index >= 11) {
                  return (
                    <div key={index} className="min-w-[60px] text-center">
                      {i.img ? (
                        <div
                          key={index}
                          className="flex flex-col h-full justify-between"
                        >
                          <span className="font-semibold">{suntimetitle}</span>
                          <span className="w-full flex justify-center">
                            {i.img === `${sunrise_color}` ? (
                              <BsSunrise className="scale-[300%]" />
                            ) : (
                              <BsSunset className="scale-[300%]" />
                            )}
                          </span>
                          <span className="font-semibold">
                            {i.img === `${sunrise_color}`
                              ? "sunrise"
                              : "sunset"}
                          </span>
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="flex flex-col h-full justify-between text-center"
                        >
                          <span className="font-semibold">
                            {index === 0 ? "now" : timetitle}
                          </span>
                          <img
                            title={i.weather[0].description}
                            src={`https://openweathermap.org/img/wn/${i.weather[0].icon}@2x.png`}
                            className="aspect-square min-w-[40px]"
                          />
                          {i.weather[0].main.toLowerCase().includes("rain") ? (
                            <span className="text-[0.8rem] -translate-y-2">
                              {i.pop.toFixed(1) * 100}%
                            </span>
                          ) : null}
                          <span className="font-semibold text-[1.2rem]">
                            {i.temp.toFixed(0)}°
                          </span>
                        </div>
                      )}
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    </>
  );
};
