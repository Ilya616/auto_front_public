import React from "react";
import styles from "./ListBrend.module.scss";
import Brend from "../UI/Components/Brend/Brend";
import logo from "/Brends/audi.webp";
import { BRENDS } from "../Libs/brends";

export default function ListBrend() {
  return (
    <div className={styles.brends}>
      {BRENDS.map((element) => (
        <Brend
          key={element.id}
          img={element.img}
          title={element.title}
          length={element.length}
        />
      ))}
      <div className={styles.btn}>
        <a className={styles.btn__link} href="#">
          Все марки
        </a>
      </div>
    </div>
  );
}
