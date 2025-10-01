import React from "react";
import styles from "./Icone.module.scss";

export default function Icon(props) {
  return (
    <div className={styles.icon_main}>
      <i className={props.icon + " " + styles.icon_main__icon}></i>
      <span className={styles.icon_main__content}>{props.content}</span>
    </div>
  );
}
