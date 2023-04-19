import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { Amplify } from "aws-amplify";
import LeftNavigation from "components/sidebar/LeftNavigation";
import { RouterProvider } from "react-router-dom";
import { router } from "routes/routes";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

function App({ signOut, user }) {
  console.log(user);
  console.log(signOut);
  return (
    <RouterProvider router={router}>
      <LeftNavigation onSignOut={signOut} currentUser={user} />
    </RouterProvider>
  );
}

export default withAuthenticator(App);
