import React, { useEffect, useState } from "react";
import { redirect, useLocation, useNavigate } from "react-router";
import { request } from "../../Libs/request";
import Loader from "@uiComponents/Loader/Loader";
import styles from "./Lk.module.scss";
import Button from "@uiComponents/Button/Button";

let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function Lk() {
  const [loader, setLoader] = useState(true);
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
          } else {
            setLoader(false);
          }
        },
      });
    }
  }, []);
  function logout() {
    sessionStorage.removeItem("token");
    navigete("/auth");
  }

  return (
    <div>
      {loader ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : (
        <>
          <h1>lk</h1>
          <Button event={logout} className={"button"}>
            logout
          </Button>
        </>
      )}
    </div>
  );
}
