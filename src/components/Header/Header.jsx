import React from "react";
import logotip from "/2.svg";
import Icon from "../UI/Components/Icons/Icon";
import styles from "./Header.module.scss";

export default function Header() {
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
        <Icon icon="fa-regular fa-heart" content={"Избранное • 56"} />
        <Icon icon="fa-solid fa-magnifying-glass-chart" content={"Поиски"} />
        <Icon icon="fa-solid fa-arrow-right-arrow-left" content={"Сравнения"} />
        <Icon icon="fa-regular fa-comment-dots" content={"Сообщения"} />
        <Icon icon="fa-solid fa-car" content={"Я продаю"} />
      </div>

      <a className={styles.header__btn}>Разместить объявление</a>
    </div>
  );
}
