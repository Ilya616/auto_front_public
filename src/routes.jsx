import { createBrowserRouter} from "react-router";
import Index from "./components/pages/Index/Index";
import Contacts from "./components/pages/Contacts/Contacts";
import Auth from "./components/pages/Auth/Auth";


export default function Routes() {
    return;
}



export let routes = createBrowserRouter([
  {
    path: "/",
    Component: Index
  },
  {
    path: "/contacts",
    Component: Contacts
  },
  {
    path: "/auth",
    Component: Auth
  },
]);