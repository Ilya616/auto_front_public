import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { request } from "../../Libs/request";
import { Flex, Spin } from "antd";
import Button from "../../UI/Components/Button/Button";

let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function LK() {
  const contentStyle = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };
  const content = <div style={contentStyle} />;
  const [loader, setLoader] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      navigate(`/auth`);
    } else {
      request({
        method: "POST",
        url: VITE_BACK_API + "/check-user",
        data: { token: sessionStorage.getItem("token") },
        callback: (response) => {
          if (!response.data) {
            logout();
          } else {
            setLoader(false);
          }
        },
      });
    }
  }, []);
  function logout() {
    sessionStorage.removeItem("token");
    navigate(`/auth`);
  }

  return (
    <div>
      {loader ? (
        <>
          <Flex gap="middle">
            <Spin tip="Loading" size="large">
              {content}
            </Spin>
          </Flex>
        </>
      ) : (
        <>
          <Link to="/lk/create-card">Подать объявление</Link>
          <Button event={logout}>Logout</Button>
        </>
      )}
    </div>
  );
}
