import { Authenticator, Image, withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import LeftNavigation from "components/LeftNavigation";
import { RouterProvider } from "react-router-dom";
import { router } from "routes/routes";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

const components = {
  Header() {
    return <Image alt="BulkBuy logo" src="/images/logo.png" />;
  },
};

function App() {
  return (
    <Authenticator>
      <RouterProvider router={router}>
        <LeftNavigation />
      </RouterProvider>
    </Authenticator>
  );
}

export default withAuthenticator(App, { components: components });
