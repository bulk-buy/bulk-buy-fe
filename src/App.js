import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import LeftNavigation from "components/sidebar/LeftNavigation";
import { RouterProvider } from "react-router-dom";
import { router } from "routes/routes";

function App() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <RouterProvider router={router}>
          <LeftNavigation />
        </RouterProvider>
      )}
    </Authenticator>
  );
}

export default App;
