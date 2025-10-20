import { createBrowserRouter } from "react-router";
import Index from "../src/components/pages/IndexPage/Index";
import NewsPage from "./components/NewsPage/NewsPage";
import Contacts from "./components/ContactsPage/Contacts";
import Auth from "./components/pages/Auth/Auth";

import CreateCard from "./components/pages/CreateCard/CreateCard";
import LK from "./components/pages/Lk/Lk";

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
  {
    path: "/auth",
    Component: Auth,
  },
  {
    path: "/lk",
    Component: LK,
  },
  {
    path: "/lk/create-card",
    Component: CreateCard,
  },
]);
