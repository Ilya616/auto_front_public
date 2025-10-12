import React from "react";
import styles from "./ColorMenu.module.scss";

export default function ColorMenu(props) {
  return (
    <>
      <h2 className={styles.color__content}>Цвет</h2>
      <div className={styles.color__wrap}>
        {props.colors.map((color) => (
          <div
            key={color.id}
            className={styles.color__circle}
            style={{ backgroundColor: color.hash }}
          ></div>
        ))}
      </div>
    </>
  );
}
