import React from "react";
import styles from "./WrappCard.module.scss";

export default function WrappCard(props) {
  function select() {
    props.changeData(props.card, props.index);
  }
  let checkedId = props.choise.active_id;
  return (
    <div
      className={checkedId == props.index ? styles.active : styles.main}
      onClick={select}
    >
      {props.card}
    </div>
  );
}
