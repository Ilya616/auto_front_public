import React from "react";
import CategorySelect from "../UI/Components/Selects/CategoryInputSelect/CategorySelect";
import styles from "./CarFilter.module.scss";

export default function CarFilter() {
  return (
    <>
      <div className={styles.prewiev}>
        <div className={styles.prewiev__text + " " + styles.active}>Все</div>
        <div className={styles.prewiev__text}>Новые</div>
        <div className={styles.prewiev__text}>С пробегом</div>
      </div>
      <form action="" className={styles.filterForm}>
        <CategorySelect value="Марка" />
        <CategorySelect value="Модель" />
        <CategorySelect value="Поколение" />
        <CategorySelect value="Кузов" />
        <CategorySelect value="Двигатель" />
        <CategorySelect value="Объем" />
        <CategorySelect value="Год" />
        <CategorySelect value="Пробег" />
        <CategorySelect value="Цена" />
        <div className={styles.params}>
          <a className={styles.params__link} href="#">
            Все параметры
          </a>
          <span className={styles.params__icon}>Без дтп</span>
        </div>
        <button className={styles.btn}>Показать 0 предложений</button>
      </form>
    </>
  );
}
