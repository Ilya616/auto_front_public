import React from "react";
import styles from "./LocationLink.module.scss";

export default function LocationLink(props) {
  return (
    <div className={styles.location}>
      <i className={"fa-regular fa-compass " + styles.location__icon}></i>
      <a className={styles.location__link} href="#">
        {props.children}
      </a>
    </div>
  );
}
