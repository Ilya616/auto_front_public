import React, { useEffect, useState } from "react";
import styles from "./Lk.module.scss";
import logo from "../../../public/4.jpg";
import avatar from "../../../public/avatar/default.webp";
import { SettingOutlined, RollbackOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import AdvertisementTable from "../AdvertisementTable/AdvertisementTable";
import { Link, useNavigate } from "react-router";
import { request } from "../Libs/request";

import { useDispatch } from "react-redux";
import { setUser } from "../../store/userMake";
import { deleteDataPhoto } from "../../store/createCard";

let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function Lk() {
  let dispatch = useDispatch();
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
      navigate(`/auth-new`);
    } else {
      request({
        method: "POST",
        url: VITE_BACK_API + "/check-user",
        data: { token: sessionStorage.getItem("token") },
        callback: (response) => {
          if (!response.data) {
            logout();
          } else {
            dispatch(deleteDataPhoto([]));
            dispatch(setUser(response.data));
            setLoader(false);
          }
        },
      });
    }
  }, []);
  function logout() {
    dispatch(setUser(null));
    sessionStorage.removeItem("token");
    navigate(`/auth-new`);
  }
  return (
    <div className={styles.page}>
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
          <div className={styles.page__wrapper}>
            <img className={styles.page__image} src={logo} alt="" />
          </div>
          <div className={styles.content}>
            <div className={styles.user}>
              <div className={styles.user__logo}>
                <img className={styles.user__img} src={avatar} alt="" />
              </div>
              <div className={styles.user__content}>
                <h2>Миша</h2>
                <div className={styles.prefix}>
                  <span className={styles.prefix__text}>Москва</span>
                </div>
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.feature__icons}>
                <RollbackOutlined onClick={logout} />
              </div>
              <div className={styles.feature__icons}>
                <SettingOutlined />
              </div>
            </div>
          </div>
          <p>Список объявлений</p>
          <div className={styles.advertisement}>
            <AdvertisementTable />
          </div>
        </>
      )}
    </div>
  );
}
