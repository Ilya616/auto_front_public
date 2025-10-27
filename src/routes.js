import { createBrowserRouter } from "react-router";
import Index from "../src/components/pages/IndexPage/Index";
import NewsPage from "./components/pages/NewsPage/NewsPage";
import Contacts from "./components/pages/ContactsPage/Contacts";
import Auth from "./components/pages/Auth/Auth";

// import LK from "./components/pages/Lk/Lk";
import LkNew from "./components/pages/LkNew/LkNew";
import AuthNew from "./components/pages/AuthNew/AuthNew";
import RegisterNews from "./components/pages/RegisterNews/RegisterNews";
import CreateCardPage from "./components/pages/CreateCardPage/CreateCardPage";
import Cabinet from "./components/Cabinet/Cabinet";

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
    Component: LkNew,
  },
  {
    path: "/lk/create-card",
    Component: CreateCardPage,
  },
  {
    path: "/auth-new",
    Component: AuthNew,
  },
  {
    path: "/register-new",
    Component: RegisterNews,
  },
  {
    path: "/cab",
    Component: Cabinet,
  },
]);
