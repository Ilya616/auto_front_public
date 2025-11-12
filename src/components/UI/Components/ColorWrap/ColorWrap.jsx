import React from "react";
import styles from "./ColorWrap.module.scss";

export default function ColorWrap(props) {
  function select() {
    props.changeData(props.color.title, props.color.id);
  }
  let checkedId = props.choise.active_id;
  return (
    <div
      onClick={select}
      className={checkedId == props.color.id ? styles.active : styles.circle}
      style={{ backgroundColor: props.color.hash }}
    ></div>
  );
}
