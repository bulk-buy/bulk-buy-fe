const { default: Home } = require("pages/home");
const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);
