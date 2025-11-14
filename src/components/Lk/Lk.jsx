import React, { useEffect, useState } from "react";
import styles from "./Lk.module.scss";
import logo from "../../../public/setings.png";
import { SettingOutlined, RollbackOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import AdvertisementTable from "../AdvertisementTable/AdvertisementTable";
import { Link, useNavigate } from "react-router";
import { request } from "../Libs/request";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userMake";
import { deleteDataPhoto } from "../../store/createCard";
import ModalInfo from "../UI/Components/ModalInfo/ModalInfo";
import Button from "../UI/Components/Button/Button";

import axios from "axios";

let VITE_BACK_API = import.meta.env.VITE_BACK_API;
let VITE_BACK_STORAGE = import.meta.env.VITE_BACK_STORAGE;

export default function Lk() {
  const user = useSelector((state) => state.userMake.value);
  let dispatch = useDispatch();
  const contentStyle = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };
  const content = <div style={contentStyle} />;
  const [loader, setLoader] = useState({ lk: true, settings: false });
  const [cards, setCards] = useState([]);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState({
    name: null,
    location: null,
  });
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
            setData({
              name: response.data.name,
              location: response.data.location,
            });
            getData(response.data.id);
          }
        },
      });
    }
  }, []);
  function getData(id) {
    request({
      method: "post",
      url: VITE_BACK_API + "/card/get-card-lk",
      data: { id: id },
      headers: `Authorization: Bearer ${sessionStorage.getItem("token")}`,
      callback: (response) => {
        setCards(response.data.data);
        setLoader({ lk: false, settings: loader.settings });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  function logout() {
    dispatch(setUser(null));
    sessionStorage.removeItem("token");
    navigate(`/auth-new`);
  }
  function closeModal() {
    setModal(!modal);
  }
  function changeUser(form) {
    const background = form.get("background");
    const file = form.get("file");
    const name = form.get("name");
    const location = form.get("location");

    const formData = new FormData();
    formData.append("name", form.get("name"));
    formData.append("location", form.get("location"));
    formData.append("userId", user.id);

    setLoader({ lk: loader.lk, settings: true });
    if (file instanceof File) {
      formData.append("avatar", file);
    }
    if (background instanceof File) {
      formData.append("background", background);
    }
    request({
      method: "post",
      url: VITE_BACK_API + "/user/change",
      data: formData,
      callback: (response) => {
        if (response.status == 200) {
          setLoader({ lk: loader.lk, settings: false });
          setModal(false);
          let copy = Object.assign([], user);
          copy.name = name;
          copy.location = location;
          copy.avatar = response.data[0];
          copy.background = response.data[1];
          dispatch(setUser(copy));
        }
      },
      error: (error) => {
        console.log(error);
      },      
      
    });


  }
  return (
    <div className={styles.page}>
      {loader.lk ? (
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
            <img
              className={styles.page__image}
              src={VITE_BACK_STORAGE + user.background}
              alt=""
            />
          </div>
          <div className={styles.content}>
            <div className={styles.user}>
              <div className={styles.user__logo}>
                <img
                  className={styles.user__img}
                  src={VITE_BACK_STORAGE + user.avatar}
                  alt=""
                />
              </div>
              <div className={styles.user__content}>
                <h2>{user.name}</h2>
                {user.location != undefined ? (
                  <div className={styles.prefix}>
                    <span className={styles.prefix__text}>{user.location}</span>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className={styles.feature}>
              <div className={styles.feature__icons}>
                <RollbackOutlined onClick={logout} />
              </div>
              <div
                className={styles.feature__icons}
                onClick={() => {
                  setModal(!modal);
                }}
              >
                <SettingOutlined />
              </div>
            </div>
          </div>
          <p>Список объявлений</p>
          <div className={styles.advertisement}>
            <AdvertisementTable cards={cards} />
          </div>
          {modal ? (
            <ModalInfo open={modal}>
              <form action={changeUser} className={styles.settings}>
                <h1>Информация о пользователе</h1>
                <label>Имя</label>
                <input
                  name="name"
                  type="text"
                  className={styles.settings__input}
                  value={data.name}
                  onChange={(evt) => {
                    setData({
                      name: evt.target.value,
                      location: data.location,
                    });
                  }}
                />
                <label>Город</label>
                <input
                  name="location"
                  type="text"
                  className={styles.settings__input}
                  value={data.location}
                  onChange={(evt) => {
                    setData({ name: data.name, location: evt.target.value });
                  }}
                />
                <label>Аватар</label>
                <input
                  name="file"
                  type="file"
                  className={styles.settings__file}
                />
                <label>Фон</label>
                <input
                  name="background"
                  type="file"
                  className={styles.settings__file}
                />
                {loader.settings ? (
                  <Flex gap="middle">
                    <Spin tip="Loading" size="large">
                      {content}
                    </Spin>
                  </Flex>
                ) : (
                  <Button>Сохранить</Button>
                )}
              </form>
              <div className={styles.settings__logo}>
                <img src={logo} alt="" className={styles.settings__img} />
              </div>
              <div className={styles.settings__btn}>
                <Button event={closeModal}>Отмена</Button>
              </div>
            </ModalInfo>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}
