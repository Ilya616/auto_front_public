import React from "react";
import styles from "./CardLk.module.scss";
import logo from "../../../../../public/Car/4.webp";

export default function CardLk() {
  return (
    <div className={styles.main}>
      <div className={styles.prewiev}>
        <img className={styles.img} src={logo} alt="" />
      </div>
      <div className={styles.content}>
        <span>Audi</span>
        <span>666666 p</span>
      </div>
    </div>
  );
}
