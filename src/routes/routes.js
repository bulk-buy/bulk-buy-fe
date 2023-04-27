import LeftNavigation from "components/LeftNavigation";
import Error401 from "pages/Error401";
import Error404 from "pages/Error404";
import Home from "pages/Home";
import MyListingDetails from "pages/MyListingDetails";
import MyListings from "pages/MyListings";
import MyOrders from "pages/MyOrders";
import Profile from "pages/Profile";
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
      {
        path: "my-listings/:listingId",
        element: <MyListingDetails />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
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
