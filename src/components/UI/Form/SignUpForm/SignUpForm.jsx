import React from "react";

import styles from "@components/pages/Auth/Auth.module.scss";
import Button from "../../Components/Button/Button";

export default function SignUpForm() {
  return (
    <div className={styles.main}>
      <h3 className={styles["form__title"]}>Регистрация</h3>
      <p>
        <input
          type="text"
          className={styles["form__input"]}
          placeholder="Логин"
        />
      </p>
      <p>
        <input
          type="email"
          className={styles["form__input"]}
          placeholder="Email"
        />
      </p>
      <p>
        <input
          type="password"
          className={styles["form__input"]}
          placeholder="Пароль"
        />
      </p>
      <p>
        <input
          type="password"
          className={styles["form__input"]}
          placeholder="Подтвердите пароль"
        />
      </p>
      <p>
        <Button
          className={`${styles["form__btn"]} ${styles["form__btn_signup"]}`}
        >
          Зарегистрироваться
        </Button>
      </p>
    </div>
  );
}
