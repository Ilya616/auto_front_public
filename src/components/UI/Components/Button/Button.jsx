import React from "react";
import styles from "./Button.module.scss";

export default function Button(props) {
  return (
    <>
      <button
        onClick={props.event}
        className={styles.btn}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    </>
  );
}
