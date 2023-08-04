import nightSky from "@/img/night_sky.jpg";
import "./index.css";

export const Background = () => {
  const isEvening =
    Number(new Date().toLocaleTimeString().substring(0, 2)) > 19;

  return (
    <>
      <div className="lg:hidden">
        <img
          className="z-[1] w-full absolute top-[30%] md:top-[10%] primary--bg__phone"
          src="https://assets.codepen.io/721952/cloud2.png"
        />
        <img
          className="z-[1] w-full -scale-x-100 absolute top-[30%] md:top-[10%] secondary--bg__phone"
          src="https://assets.codepen.io/721952/cloud2.png"
        />
        <img
          className="z-[1] w-full absolute top-[10%] md:-top-[5%] primary--bg__additional"
          src="https://assets.codepen.io/721952/cloud2.png"
        />
        <img
          className="z-[1] w-full -scale-x-100 absolute top-[10%] md:-top-[5%] secondary--bg__additional"
          src="https://assets.codepen.io/721952/cloud2.png"
        />
        {isEvening ? (
          <img className="z-[0] absolute top-0 w-full h-full" src={nightSky} />
        ) : (
          <img
            className="z-[0] absolute top-0 w-full h-full"
            src="https://assets.codepen.io/721952/sky.jpg"
          />
        )}
        <img
          className="z-[1] absolute w-full -top-[2%] md:-top-[7%] rotate-180 primary--bg3__phone"
          src="https://assets.codepen.io/721952/cloud1.png"
        />
        <img
          className="z-[1] absolute w-full -top-[2%] md:-top-[7%] rotate-180 -scale-x-100 secondary--bg3__phone"
          src="https://assets.codepen.io/721952/cloud1.png"
        />
        <img
          className=" z-[1] absolute bottom-[8%] scale-150 w-full primary--bg2__phone"
          src="https://assets.codepen.io/721952/cloud3.png"
        />
        <img
          className=" z-[1] absolute bottom-[8%] scale-150 w-full -scale-x-100 secondary--bg2__phone"
          src="https://assets.codepen.io/721952/cloud3.png"
        />
      </div>
      <div className="hidden lg:block">
        <img
          className="z-[1] w-full absolute top-[50%] lg:-top-[50%] xl:-top-[60%] primary--bg"
          src="https://assets.codepen.io/721952/cloud2.png"
        />
        <img
          className="z-[1] w-full -scale-x-100 absolute top-[50%] lg:-top-[50%] xl:-top-[60%] secondary--bg"
          src="https://assets.codepen.io/721952/cloud2.png"
        />
        {isEvening ? (
          <img className="z-[0] absolute top-0 w-full h-full" src={nightSky} />
        ) : (
          <img
            className="z-[0] absolute top-0 w-full h-full"
            src="https://assets.codepen.io/721952/sky.jpg"
          />
        )}
        <img
          className="z-[1] absolute lg:-bottom-10 w-full primary--bg3"
          src="https://assets.codepen.io/721952/cloud1.png"
        />
        <img
          className="z-[1] absolute bottom-0 lg:bottom-0 scale-100 w-full primary--bg2"
          src="https://assets.codepen.io/721952/cloud3.png"
        />
        <img
          className="z-[1] absolute bottom-0 lg:bottom-0 scale-100 w-full -scale-x-100 secondary--bg2"
          src="https://assets.codepen.io/721952/cloud3.png"
        />
      </div>
    </>
  );
};
