import LeftNavigation from "components/sidebar/LeftNavigation";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "routes/routes";

function App() {
  return (
    <RouterProvider router={router}>
      <LeftNavigation />
    </RouterProvider>
  );
}

export default App;
