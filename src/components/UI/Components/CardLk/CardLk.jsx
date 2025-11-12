import React from "react";
import styles from "./CardLk.module.scss";
import logo from "../../../../../public/Car/4.webp";
const VITE_BACK_STORAGE = import.meta.env.VITE_BACK_STORAGE;

export default function CardLk(props) {
  return (
    <div className={styles.main}>
      <div className={styles.prewiev}>
        <img
          className={styles.img}
          src={VITE_BACK_STORAGE + props.carImg}
          alt=""
        />
      </div>
      <div className={styles.content}>
        <span>{props.carName}</span>
        <span>{props.price}</span>
      </div>
    </div>
  );
}
