import LeftNavigation from "components/sidebar/LeftNavigation";
import Error401 from "pages/Error401";
import Error404 from "pages/Error404";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LeftNavigation />,
  },
  {
    path: "/401",
    element: <Error401 />,
  },
  {
    path: "/404",
    element: <Error404 />,
  },
]);
