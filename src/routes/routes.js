import LeftNavigation from "components/LeftNavigation";
import Error401 from "pages/Error401";
import Error404 from "pages/Error404";
import ListingDetails from "pages/ListingDetails";
import Listings from "pages/Listings";
import MyListingDetails from "pages/MyListingDetails";
import MyListings from "pages/MyListings";
import MyOrderDetails from "pages/MyOrderDetails";
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
        element: <Listings />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/listings",
        element: <Listings />,
      },
      {
        path: "/listings/:listingId",
        element: <ListingDetails />,
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
      {
        path: "my-orders/:orderId",
        element: <MyOrderDetails />,
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
