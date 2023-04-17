import { Home, List, Logout, Person, ShoppingCart } from "@mui/icons-material";

export const NavigationList = [
  {
    title: "Home",
    icon: <Home />,
    routeTo: "/",
  },
  {
    title: "My Profile",
    icon: <Person />,
    routeTo: "/profile",
  },
  {
    title: "My Listings",
    icon: <List />,
    routeTo: "/my-listings",
  },
  {
    title: "My Orders",
    icon: <ShoppingCart />,
    routeTo: "/my-orders",
  },
  {
    title: "Logout",
    icon: <Logout />,
    routeTo: "/logout",
  },
];
