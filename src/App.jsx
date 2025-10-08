import { useState } from "react";
import "normalize.css";
import "@/index.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { RouterProvider } from "react-router";
import { routes } from "./routes";


function App() {
  

  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
export default App;
