import LeftNavigation from "components/LeftNavigation";
import Error401 from "pages/Error401";
import Error404 from "pages/Error404";
import Home from "pages/Home";
import Profile from "pages/Profile";
import MyListings from "pages/MyListings";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "",
    element: <LeftNavigation />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "my-listings",
        element: <MyListings />,
      },
      /* Error Pages */
      {
        path: "/401",
        element: <Error401 />,
      },
      {
        path: "/404",
        element: <Error404 />,
      },
    ],
  },
]);
