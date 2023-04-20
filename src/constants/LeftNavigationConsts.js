import { Home, List, ShoppingCart } from "@mui/icons-material";

export const NavigationList = [
  {
    title: "Home",
    icon: <Home />,
    routeTo: "/",
    color: "primary",
  },
  {
    title: "My Listings",
    icon: <List />,
    routeTo: "/my-listings",
    color: "primary",
  },
  {
    title: "My Orders",
    icon: <ShoppingCart />,
    routeTo: "/my-orders",
    color: "primary",
  },
];
