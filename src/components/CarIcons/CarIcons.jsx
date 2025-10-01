import React from "react";
import styles from "./CarIcons.module.scss";

export default function CarIcons(props) {
  return (
    <div className={styles.main}>
      <div className={styles.main__text}>
        <span>
          {props.cars.length}{" "}
          {props.cars.length > 0 ? "Предложения" : "Предложений"}
        </span>
      </div>
      <div className={styles.main__filter}>
        <i
          className={
            "fa-solid fa-magnifying-glass-chart" + " " + styles.main__icon
          }
        ></i>
        <a className={styles.main__link} href="#">
          Сохранить поиск
        </a>
        <i
          className={
            "fa-regular fa-share-from-square" + " " + styles.main__icon
          }
        ></i>
      </div>
    </div>
  );
}
