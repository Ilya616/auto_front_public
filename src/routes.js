import { createBrowserRouter } from "react-router";
import Index from "../src/components/pages/IndexPage/Index";
import NewsPage from "./components/pages/NewsPage/NewsPage";
import Contacts from "./components/pages/ContactsPage/Contacts";

// import LK from "./components/pages/Lk/Lk";
import LkNew from "./components/pages/LkNew/LkNew";
import AuthNew from "./components/pages/AuthNew/AuthNew";
import RegisterNews from "./components/pages/RegisterNews/RegisterNews";
import CreateCardPage from "./components/pages/CreateCardPage/CreateCardPage";
import CardPage from "./components/pages/CardPage/CardPage";
import Test from "./components/Test";

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
    path: "/card/:card_id",
    Component: CardPage,
  },
  {
    path: "/test",
    Component: Test,
  },
]);
