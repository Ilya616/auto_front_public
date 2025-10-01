import { createBrowserRouter } from "react-router";
import Index from "./components/IndexPage/Index";
import NewsPage from "./components/NewsPage/NewsPage";
import Contacts from "./components/ContactsPage/Contacts";

export let routes = createBrowserRouter([
  {
    path: "/",
    Component: Index,
  },
  {
    path: "/news",
    Component: NewsPage,
  },
  {
    path: "/contacts",
    Component: Contacts,
  },
]);
