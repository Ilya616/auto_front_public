import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "normalize.css";
import "@/index.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { RouterProvider } from "react-router";

import { routes } from "./routes";

function App() {
  console.log(routes);

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
export default App;
