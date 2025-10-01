import React from "react";
import styles from "./Brend.module.scss";

export default function Brend(props) {
  return (
    <div className={styles.main}>
      <div className={styles.main__circle}>
        <img className={styles.main__img} src={props.img} alt="brend" />
      </div>

      <span className={styles.main__content}>{props.title}</span>
      <span className={styles.main__content}>{props.length}</span>
    </div>
  );
}
