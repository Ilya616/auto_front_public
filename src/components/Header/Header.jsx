import logotip from "/2.svg";
import Icon from "../UI/Components/Icons/Icon";
import styles from "./Header.module.scss";
import React, { useState } from "react";
import { Switch } from "antd";
import { Link, useNavigate } from "react-router";

export default function Header() {
  const [user, setUser] = useState(false);
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div className={styles.header}>
      <div className={styles.header__logo}>
        <span className={styles.header__span}>-</span>
        <img className={styles.header__img} src={logotip} alt="" />
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
      {!user ? (
        <>
          <Link className={styles.header__log} to="/auth-new">
            Войти
          </Link>
        </>
      ) : (
        <div></div>
      )}
      <Link className={styles.header__btn} to="/lk/create-card">
        Разместить объявление
      </Link>
    </div>
  );
}
