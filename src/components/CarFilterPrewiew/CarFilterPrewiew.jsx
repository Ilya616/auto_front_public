import React from "react";
import img from "/3.png";
import styles from "./CarFilterPrewiew.module.scss";
import Prewiev from "../UI/Components/Prewiev/Prewiev";

export default function CarFilterPrewiew() {
  return (
    <div className={styles.filter}>
      <div className={styles.fllter__prewiev}>
        <h1 className={styles.filter__main}>Купить автомобиль</h1>
        <span>В Локация</span>
      </div>

      <Prewiev link={"#"} img={img} />
    </div>
  );
}
