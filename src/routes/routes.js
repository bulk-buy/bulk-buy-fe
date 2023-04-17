import Error401 from "pages/Error401";
import Error404 from "pages/Error404";

const { default: Home } = require("pages/Home");
const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
