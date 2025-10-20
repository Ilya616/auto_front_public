import React from "react";
import styles from "./Marks.module.scss";
import logo from "../../../../../public/Brends/audi.webp";

export default function Marks(props) {
  return (
    <div
      className={styles.mark}
      onClick={() => {
        props.setMarka(props.marka, props.id);
      }}
    >
      <img className={styles.mark__img} src={logo} alt="" />
      <p className={styles.mark__text}>{props.marka}</p>
    </div>
  );
}
