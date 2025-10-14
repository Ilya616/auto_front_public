import { createBrowserRouter } from "react-router";
import Index from "../src/components/pages/IndexPage/Index";
import NewsPage from "./components/pages/NewsPage/NewsPage";
import Contacts from "./components/pages/ContactsPage/Contacts";

import CreateCard from "./components/CreateCard/CreateCard";

import AuthPage from "./components/pages/AuthPage/AuthPage";
import LkPage from "./components/pages/LkPage/LkPage";
import CreateCardPage from "./components/pages/CreateCardPage/CreateCardPage";

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
    Component: AuthPage,
  },
  {
    path: "/lk",
    Component: LkPage,
  },
  {
    path: "/lk/create-card",
    Component: CreateCardPage,
  },
]);
