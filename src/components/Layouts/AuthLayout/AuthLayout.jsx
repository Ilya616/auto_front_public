import React from "react";
import styles from "./AuthLayout.module.scss";
import logo from "../../../../public/2.svg";

export default function AuthLayout(props) {
  return (
    <>
      <div className={styles.environment}>
        <div className={styles.wrapper}>
          <div className={styles.wrapper__border}>
            <div className={styles.wrapper__logo}>
              <img className={styles.wrapper__img} src={logo} alt="" />
              <h2 className={styles.wrapper__prewiev}>Вход на сайт</h2>
            </div>
            <div className={styles.wrapper__form}>{props.children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
