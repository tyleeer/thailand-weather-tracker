import { useWatchlist } from "@/storage/watchlist";
import {
  IoMdAddCircleOutline,
  IoMdCloseCircle,
  IoMdArrowDropup,
  IoMdArrowDropdown,
} from "react-icons/io";
import ReactLoading from "react-loading";

export const Watchlist = () => {
  const { watchlist, setWatchlist, clearWatchlist } = useWatchlist();

  function deleteItem(index: number) {
    const target = watchlist.data;
    if (target) {
      target.splice(index, 1);
      setWatchlist({ data: target, loading: false, error: null });
    }
  }

  function moveUp(index: number) {
    const target = watchlist.data;
    if (target) {
      const result = target.splice(index, 1);
      target.splice(index - 1, 0, result[0]);
      setWatchlist({ data: target, loading: false, error: null });
    }
  }

  function moveDown(index: number) {
    const target = watchlist.data;
    if (target) {
      const result = target.splice(index, 1);
      target.splice(index + 1, 0, result[0]);
      setWatchlist({ data: target, loading: false, error: null });
    }
  }

  return (
    <div id="watchlist__component" className="relative w-full min-h-[80px]">
      <div className="h-[48px] font-semibold text-[2rem]">
        <span className="absolute left-1 top-0">Watchlist</span>
      </div>
      {watchlist.data && watchlist.data.length > 0 ? (
        <table className="w-full my-[10px] outline-none">
          <thead>
            <tr className="border border-b-black">
              <th className="p-1 border border-black">
                <div className="w-full justify-center flex items-center gap-[5px]">
                  Name
                </div>
              </th>
              <th className="p-1 border border-black">
                <div className="w-full justify-center flex items-center gap-[5px]">
                  Temperature
                </div>
              </th>
              <th className="p-1 border border-black">
                <div className="w-full justify-center flex items-center gap-[5px]">
                  Humidity
                </div>
              </th>
              <th className="p-1 border border-black">
                <div className="w-full justify-center flex items-center gap-[5px]">
                  Sunrise
                </div>
              </th>
              <th className="p-1 border border-black">
                <div className="w-full justify-center flex items-center gap-[5px]">
                  Sunset
                </div>
              </th>
              <th className="p-1 border border-black">Weather</th>
              <th className="p-1 border border-black"></th>
            </tr>
          </thead>
          <tbody>
            {watchlist.data?.map((i, index) => {
              return (
                <tr key={index} className="text-center text-[0.8rem]">
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
                  <td className="border border-black">
                    {index === 0 ? (
                      watchlist.data?.length === 1 ? (
                        <button onClick={() => deleteItem(index)}>
                          <IoMdCloseCircle
                            title="delete from watch-list"
                            className="hover:scale-105 active:scale-95 h-[25px] w-[25px] m-auto rounded-[50%] active:text-white active:bg-[rgb(235,110,75)] hover:text-black text-[rgb(235,110,75)] hover:bg-transparent"
                          />
                        </button>
                      ) : (
                        <div className="flex flex-col">
                          <button onClick={() => deleteItem(index)}>
                            <IoMdCloseCircle
                              title="delete from watch-list"
                              className="hover:scale-105 active:scale-95 h-[25px] w-[25px] m-auto rounded-[50%] active:text-white active:bg-[rgb(235,110,75)] hover:text-black text-[rgb(235,110,75)] hover:bg-transparent"
                            />
                          </button>
                          <button onClick={() => moveDown(index)}>
                            <IoMdArrowDropdown
                              title="move downward"
                              className="hover:scale-105 active:scale-95 h-[25px] w-[25px] m-auto rounded-[50%]  hover:text-black text-[rgb(235,110,75)] hover:bg-transparent"
                            />
                          </button>
                        </div>
                      )
                    ) : index === 1 ? (
                      watchlist.data?.length === 2 ? (
                        <div className="flex flex-col">
                          <button onClick={() => moveUp(index)}>
                            <IoMdArrowDropup
                              title="move upward"
                              className="hover:scale-105 active:scale-95 h-[25px] w-[25px] m-auto rounded-[50%]  hover:text-black text-[rgb(235,110,75)] hover:bg-transparent"
                            />
                          </button>
                          <button onClick={() => deleteItem(index)}>
                            <IoMdCloseCircle
                              title="delete from watch-list"
                              className="hover:scale-105 active:scale-95 h-[25px] w-[25px] m-auto rounded-[50%] active:text-white active:bg-[rgb(235,110,75)] hover:text-black text-[rgb(235,110,75)] hover:bg-transparent"
                            />
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col">
                          <button onClick={() => moveUp(index)}>
                            <IoMdArrowDropup
                              title="move upward"
                              className="hover:scale-105 active:scale-95 h-[25px] w-[25px] m-auto rounded-[50%]  hover:text-black text-[rgb(235,110,75)] hover:bg-transparent"
                            />
                          </button>
                          <button onClick={() => deleteItem(index)}>
                            <IoMdCloseCircle
                              title="delete from watch-list"
                              className="hover:scale-105 active:scale-95 h-[25px] w-[25px] m-auto rounded-[50%] active:text-white active:bg-[rgb(235,110,75)] hover:text-black text-[rgb(235,110,75)] hover:bg-transparent"
                            />
                          </button>
                          <button onClick={() => moveDown(index)}>
                            <IoMdArrowDropdown
                              title="move downward"
                              className="hover:scale-105 active:scale-95 h-[25px] w-[25px] m-auto rounded-[50%] hover:text-black text-[rgb(235,110,75)] hover:bg-transparent"
                            />
                          </button>
                        </div>
                      )
                    ) : (
                      <div className="flex flex-col">
                        <button onClick={() => moveUp(index)}>
                          <IoMdArrowDropup
                            title="move upward"
                            className="hover:scale-105 active:scale-95 h-[25px] w-[25px] m-auto rounded-[50%] hover:text-black text-[rgb(235,110,75)] hover:bg-transparent"
                          />
                        </button>
                        <button onClick={() => deleteItem(index)}>
                          <IoMdCloseCircle
                            title="delete from watch-list"
                            className="hover:scale-105 active:scale-95 h-[25px] w-[25px] m-auto rounded-[50%] active:text-white active:bg-[rgb(235,110,75)] hover:text-black text-[rgb(235,110,75)] hover:bg-transparent"
                          />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : watchlist.loading ? (
        <div className="w-full flex justify-center py-[10%]">
          <ReactLoading
            type={"spin"}
            color={"#475569"}
            height={"50px"}
            width={"50px"}
          />
        </div>
      ) : (
        <div className="flex justify-center gap-[5px] items-center text-[rgb(99,105,109)]">
          <span>Click</span>
          <IoMdAddCircleOutline />
          <span>to add watchlist</span>
        </div>
      )}
      <button
        type="button"
        onClick={() => {
          clearWatchlist();
          localStorage.removeItem("userSaved");
        }}
        className="absolute right-1 top-2 rounded-[10px] h-[30px] w-[50px] border-none bg-[rgb(235,110,75)] text-white hover:scale-110 active:scale-95"
      >
        clear
      </button>
    </div>
  );
};
