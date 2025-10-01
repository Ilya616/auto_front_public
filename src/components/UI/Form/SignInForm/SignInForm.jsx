import React from "react";
import Button from "@uiComponents/Button/Button";
import { NavLink } from "react-router";
import styles from "./SignInForm.module.scss";

export default function SignInForm() {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <h3 className={styles.form__title}>Вход</h3>
          <p>
            <input
              type="text"
              className={styles.form__input}
              placeholder="Логин"
            />
          </p>
          <p>
            <input
              type="password"
              className={styles.form__input}
              placeholder="Пароль"
            />
          </p>
          <p>
            <Button className={styles.form__btn}>Войти</Button>
          </p>
          <p>
            <NavLink to={"/auth"} className={styles.form__forgot}>
              Восстановить пароль
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
}
