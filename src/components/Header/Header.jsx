import logotip from "/2.svg";
import Icon from "../UI/Components/Icons/Icon";
import styles from "./Header.module.scss";
import React, { useEffect, useState } from "react";
import { Switch } from "antd";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { setUser } from "../../store/userMake";
import avatar from "../../../public/avatar/default.webp";
import { request } from "../Libs/request";
let VITE_BACK_API = import.meta.env.VITE_BACK_API;
let VITE_BACK_STORAGE = import.meta.env.VITE_BACK_STORAGE;

export default function Header() {
  const user = useSelector((state) => state.userMake.value);

  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <span className={styles.header__span}>-</span>
        <Link to="/">
          <img className={styles.header__img} src={logotip} alt="" />
        </Link>
      </div>

      <form action="" className={styles.header__form}>
        <i
          className={"fa-solid fa-magnifying-glass " + styles.header__icon}
        ></i>
        <input
          className={styles.header__input}
          type="text"
          name="search"
          placeholder="Поиск по объявлениям"
        />
      </form>
      <div className={styles.header__links}>
        <Icon icon="fa-regular fa-heart" content={"Избранное"} />
        <Icon icon="fa-solid fa-magnifying-glass-chart" content={"Поиски"} />
        <Icon icon="fa-solid fa-arrow-right-arrow-left" content={"Сравнения"} />
        <Icon icon="fa-regular fa-comment-dots" content={"Сообщения"} />
        <Icon icon="fa-solid fa-car" content={"Я продаю"} />
      </div>
      {user == null ? (
        <>
          <Link className={styles.header__log} to="/auth-new">
            Войти
          </Link>
        </>
      ) : (
        <>
          <Link to="/lk">
            <img
              className={styles.user__img}
              src={VITE_BACK_STORAGE + user.avatar}
              alt=""
            />
          </Link>
        </>
      )}
      <Link className={styles.header__btn} to="/lk/create-card">
        Разместить объявление
      </Link>
    </div>
  );
}
