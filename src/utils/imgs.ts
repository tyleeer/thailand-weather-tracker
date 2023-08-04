import cloud from "@/img/clouds.jpg";
import clear_day from "@/img/clear_day.jpg";
import clear_night from "@/img/clear_night.jpg";
import cloud_day from "@/img/cloud_day.jpg";
import cloud_night from "@/img/cloud_night.jpg";
import mist from "@/img/mist.png";
import rain_day from "@/img/rain_day.jpg";
import rain_night from "@/img/rain_night.jpg";
import shower_rain from "@/img/shower_rain.jpg";
import thunderstrom from "@/img/thunderstrom.jpg";
import snow_day from "@/img/snow_day.jpg";
import snow_night from "@/img/snow_night.jpg";

type weatherPics = {
  name: string;
  pic: string;
  color: string;
};

export const weatherPics: weatherPics[] = [
  {
    name: "01d",
    pic: clear_day,
    color: "bg-[rgb(62,171,228)]",
  },
  {
    name: "01n",
    pic: clear_night,
    color: "bg-[rgb(63,65,103)]",
  },
  {
    name: "02d",
    pic: cloud_day,
    color: "bg-[rgb(154,216,255)]",
  },
  {
    name: "02n",
    pic: cloud_night,
    color: "bg-[rgb(63,65,103)]",
  },
  {
    name: "03d",
    pic: cloud,
    color: "bg-[rgb(164,225,244)]",
  },
  {
    name: "03n",
    pic: cloud,
    color: "bg-[rgb(164,225,244)]",
  },
  {
    name: "04d",
    pic: cloud,
    color: "bg-[rgb(164,225,244)]",
  },
  {
    name: "04n",
    pic: cloud,
    color: "bg-[rgb(164,225,244)]",
  },
  {
    name: "09d",
    pic: shower_rain,
    color: "bg-[#5F859A]",
  },
  {
    name: "09n",
    pic: shower_rain,
    color: "bg-[#5F859A]",
  },
  {
    name: "10d",
    pic: rain_day,
    color: "bg-[#3EABE4]",
  },
  {
    name: "10n",
    pic: rain_night,
    color: "bg-[rgb(63,65,103)]",
  },
  {
    name: "11d",
    pic: thunderstrom,
    color: "bg-[#5F859A]",
  },
  {
    name: "11n",
    pic: thunderstrom,
    color: "bg-[#5F859A]",
  },
  {
    name: "13d",
    pic: snow_day,
    color: "bg-[rgb(94,155,209])",
  },
  {
    name: "13n",
    pic: snow_night,
    color: "bg-[rgb(63,65,103)]",
  },
  {
    name: "50d",
    pic: mist,
    color: "bg-[rgb(255,255,255)]",
  },
  {
    name: "50n",
    pic: mist,
    color: "bg-[rgb(0,0,0)]",
  },
];
