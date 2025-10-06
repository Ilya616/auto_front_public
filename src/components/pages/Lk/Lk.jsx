import React, { useEffect } from "react";
import { redirect, useLocation, useNavigate } from "react-router";
import { request } from "../../Libs/request";
let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function Lk() {
  let navigete = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigete("/auth");
    } else {
      request({
        method: "post",
        url: VITE_BACK_API + "/check-user",
        data: { token: sessionStorage.getItem("token") },
        callback: (response) => {
          if (!response.data) {
            sessionStorage.removeItem("token");
            navigete("/auth");
          }
        },
      });
    }
  }, []);
  return <div>Lk</div>;
}
