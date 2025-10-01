import React from "react";
import { NAVIGATE } from "../Libs/navigate";
import NavLink from "../NavLink/NavLink";
import styles from "./Navigate.module.scss";

export default function Navigate() {
  return (
    <div className={styles.navigate}>
      <ul className={styles.navigate__content}>
        {NAVIGATE.map((element) => (
          <li className={styles.navigate__link} key={element.id}>
            <NavLink content={element.content} link={element.link} />
          </li>
        ))}
      </ul>
    </div>
  );
}
