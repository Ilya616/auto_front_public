import React from "react";
import styles from "./AdvertisementTable.module.scss";
import CardLk from "../UI/Components/CardLk/CardLk";

export default function AdvertisementTable() {
  return (
    <div className={styles.table}>
      <div className={styles.table__category}>
        <div className={styles.category__wrapp}>Все</div>
        <div className={styles.category__wrapp}>Легковые</div>
        <div className={styles.category__wrapp}>Коммерческие</div>
        <div className={styles.category__wrapp}>Мото</div>
      </div>
      <hr />
      <div className={styles.table__lis}>
        <CardLk />
      </div>
    </div>
  );
}
