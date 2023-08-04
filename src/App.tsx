import Homepage from "@/pages/home";
import Ranking from "@/pages/ranking";
import History from "@/pages/history";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Detail from "@/pages/detail";
// import { useEffect } from "react";
import "./App.scss";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/weather/history",
      element: <History />,
    },
    {
      path: "/weather/ranking",
      element: <Ranking />,
    },
    {
      path: `/weather/:name/:lat/:lon`,
      element: <Detail />,
    },
  ]);

  // Test API Called Check
  // useEffect(() => {
  //   const checkAPIUsageStr = localStorage.getItem("trackAPIUsage");

  //   if (checkAPIUsageStr) {
  //     const checkAPIUsageData = JSON.parse(checkAPIUsageStr);
  //     const now = new Date().getDate();

  //     if (now > checkAPIUsageData.exp) {
  //       const trackAPIUsage = {
  //         call: 0,
  //         exp: now,
  //         update: "not yet",
  //       };

  //       localStorage.setItem("trackAPIUsage", JSON.stringify(trackAPIUsage));

  //       return;
  //     }
  //     // else {
  //     //   const trackAPIUsage = {
  //     //     call: checkAPIUsageData.call,
  //     //     exp: checkAPIUsageData.exp,
  //     //     update: "not yet",
  //     //   };

  //     //   localStorage.setItem("trackAPIUsage", JSON.stringify(trackAPIUsage));
  //     // }
  //     return;
  //   } else {
  //     const now = new Date().getDate();
  //     const trackAPIUsage = {
  //       call: 0,
  //       exp: now,
  //       update: "not yet",
  //     };

  //     localStorage.setItem("trackAPIUsage", JSON.stringify(trackAPIUsage));
  //     return;
  //   }
  // }, []);

  return <RouterProvider router={router} />;
}

export default App;
