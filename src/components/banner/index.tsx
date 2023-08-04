import { Link } from "react-router-dom";
import "./index.css";

export const Banner = ({ trackPage }: { trackPage: string }) => {
  return (
    <div
      id="banner__component"
      className={`relative navbar w-full h-full text-white p-[20px] transition-all`}
    >
      <div className="navbar-start p-2">
        <Link to="/thailand-weather-tracker/">
          <img
            src="https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png"
            alt="OpenWheather_logo"
            className="absolute -top-10 -left-16 m-0 p-0 w-[431px] min-w-[172px] h-[184px] scale-[40%] hover:scale-[45%] active:scale-[40%] transition ease-out duration-500"
          />
        </Link>
      </div>
      <div className="navbar-end absolute right-[10%]">
        <div className="dropdown relative">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          {trackPage === "homePage" ? (
            <ul
              tabIndex={0}
              className="absolute right-0 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-1"
            >
              <li className="">
                <a className="py-[10px] capitalize bg-[rgb(71,85,105)] hover:bg-[rgb(71,85,105)] hover:text-white hover:cursor-default">
                  main
                </a>
              </li>
              <li className="">
                <a
                  href="/thailand-weather-tracker/weather/history"
                  className="py-[10px] capitalize"
                >
                  weather history
                </a>
              </li>
              <li className="">
                <a
                  href="/thailand-weather-tracker/weather/ranking"
                  className="py-[10px] capitalize"
                >
                  weather ranking
                </a>
              </li>
              <li className="hidden">
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
            </ul>
          ) : trackPage === "rankingPage" ? (
            <ul
              tabIndex={0}
              className="absolute right-0 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-1"
            >
              <li className="">
                <a
                  href="/thailand-weather-tracker/"
                  className="py-[10px] capitalize"
                >
                  main
                </a>
              </li>
              <li className="">
                <a
                  href="/thailand-weather-tracker/weather/history"
                  className="py-[10px] capitalize"
                >
                  weather history
                </a>
              </li>
              <li className="">
                <a className="py-[10px] capitalize bg-[rgb(71,85,105)] hover:cursor-default hover:bg-[rgb(71,85,105)] hover:text-white">
                  weather ranking
                </a>
              </li>
              <li className="hidden">
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
            </ul>
          ) : trackPage === "historyPage" ? (
            <ul
              tabIndex={0}
              className="absolute right-0 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-1"
            >
              <li className="">
                <a
                  href="/thailand-weather-tracker/"
                  className="py-[10px] capitalize"
                >
                  main
                </a>
              </li>
              <li className="">
                <a className="py-[10px] capitalize bg-[rgb(71,85,105)] hover:bg-[rgb(71,85,105)] hover:text-white hover:cursor-default">
                  weather history
                </a>
              </li>
              <li className="">
                <a
                  href="/thailand-weather-tracker/weather/ranking"
                  className="py-[10px] capitalize"
                >
                  weather ranking
                </a>
              </li>
              <li className="hidden">
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            <ul
              tabIndex={0}
              className="absolute right-0 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-1"
            >
              <li className="">
                <a
                  href="/thailand-weather-tracker/"
                  className="py-[10px] capitalize"
                >
                  main
                </a>
              </li>
              <li className="">
                <a
                  href="/thailand-weather-tracker/weather/history"
                  className="py-[10px] capitalize"
                >
                  weather history
                </a>
              </li>
              <li className="">
                <a
                  href="/thailand-weather-tracker/weather/ranking"
                  className="py-[10px] capitalize"
                >
                  weather ranking
                </a>
              </li>
              <li className="hidden">
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="navbar-center hidden lg:flex lg:w-[50%] lg:justify-end">
        {trackPage === "homePage" ? (
          <ul className="menu menu-horizontal px-1 space-x-2 text-shadow--black">
            <li className="text-[24px] lg:text-[20px] xl:text-[24px]">
              <a className="capitalize bg-[rgb(255,255,255,0.2)] hover:bg-[rgb(255,255,255,0.2)] hover:text-white hover:cursor-default">
                main
              </a>
            </li>
            <li className="text-[24px] lg:text-[20px] xl:text-[24px]">
              <a
                href="/thailand-weather-tracker/weather/history"
                className="capitalize"
              >
                weather history
              </a>
            </li>
            <li className="text-[24px] lg:text-[20px] xl:text-[24px]">
              <a
                href="/thailand-weather-tracker/weather/ranking"
                className="capitalize"
              >
                weather ranking
              </a>
            </li>
          </ul>
        ) : trackPage === "rankingPage" ? (
          <ul className="menu menu-horizontal px-1 space-x-2">
            <li className="text-[24px] lg:text-[20px] xl:text-[24px]">
              <a href="/thailand-weather-tracker/" className="capitalize">
                main
              </a>
            </li>
            <li className="text-[24px] lg:text-[20px] xl:text-[24px]">
              <a
                href="/thailand-weather-tracker/weather/history"
                className="capitalize"
              >
                weather history
              </a>
            </li>
            <li className="text-[24px] lg:text-[20px] xl:text-[24px]">
              <a className="capitalize bg-[rgb(255,255,255,0.2)] hover:bg-[rgb(255,255,255,0.2)] hover:text-white hover:cursor-default">
                weather ranking
              </a>
            </li>
          </ul>
        ) : trackPage === "historyPage" ? (
          <ul className="menu menu-horizontal px-1 space-x-2">
            <li className="text-[24px] lg:text-[20px] xl:text-[24px]">
              <a href="/thailand-weather-tracker/" className="capitalize">
                main
              </a>
            </li>
            <li className="text-[24px] lg:text-[20px] xl:text-[24px]">
              <a className="capitalize bg-[rgb(255,255,255,0.2)] hover:bg-[rgb(255,255,255,0.2)] hover:text-white hover:cursor-default">
                weather history
              </a>
            </li>
            <li className="text-[24px] lg:text-[20px] xl:text-[24px]">
              <a
                href="/thailand-weather-tracker/weather/ranking"
                className="capitalize"
              >
                weather ranking
              </a>
            </li>
          </ul>
        ) : (
          <ul className="menu menu-horizontal px-1 space-x-2">
            <li className="text-[24px] lg:text-[20px] xl:text-[24px]">
              <a href="/thailand-weather-tracker/" className="capitalize">
                main
              </a>
            </li>
            <li className="text-[24px] lg:text-[20px] xl:text-[24px]">
              <a
                href="/thailand-weather-tracker/weather/history"
                className="capitalize"
              >
                weather history
              </a>
            </li>
            <li className="text-[24px] lg:text-[20px] xl:text-[24px]">
              <a
                href="/thailand-weather-tracker/weather/ranking"
                className="capitalize"
              >
                weather ranking
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};
