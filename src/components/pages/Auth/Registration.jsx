import React, { useState } from 'react';
import styles from './Registration.module.scss';

export default function Registration() {
  const [isActive, setIsActive] = useState(false);

  const handleSignUp = () => {
    setIsActive(true);
  };

  const handleSignIn = () => {
    setIsActive(false);
  };

  return (
    <article className={styles.container}>
      <div className={styles.block}>
        <section className={`${styles['block__item']} ${styles['block-item']}`}>
          <h2 className={styles['block-item__title']}>У вас уже есть аккаунт ?</h2>
          <button
            onClick={handleSignIn}
            className={`${styles['block-item__btn']} ${styles['signin-btn']}`}
          >
            Войти
          </button>
        </section>
        <section className={`${styles['block__item']} ${styles['block-item']}`}>
          <h2 className={styles['block-item__title']}>У вас нет аккаунта ?</h2>
          <button
            onClick={handleSignUp}
            className={`${styles['block-item__btn']} ${styles['signup-btn']}`}
          >
            Зарегистрироваться
          </button>
        </section>
      </div>

      <div className={`${styles['form-box']} ${isActive ? styles.active : ''}`}>
        <form className={`${styles.form} ${styles['form_signin']}`}>
          <h3 className={styles['form__title']}>Вход</h3>
          <p><input type="text" className={styles['form__input']} placeholder="Логин" /></p>
          <p><input type="password" className={styles['form__input']} placeholder="Пароль" /></p>
          <p><button className={styles['form__btn']}>Войти</button></p>
          <p><a href="#" className={styles['form__forgot']}>Восстановить пароль</a></p>
        </form>

        <form className={`${styles.form} ${styles['form_signup']}`}>
          <h3 className={styles['form__title']}>Регистрация</h3>
          <p><input type="text" className={styles['form__input']} placeholder="Логин" /></p>
          <p><input type="email" className={styles['form__input']} placeholder="Email" /></p>
          <p><input type="password" className={styles['form__input']} placeholder="Пароль" /></p>
          <p><input type="password" className={styles['form__input']} placeholder="Подтвердите пароль" /></p>
          <p>
            <button className={`${styles['form__btn']} ${styles['form__btn_signup']}`}>
              Зарегистрироваться
            </button>
          </p>
        </form>
      </div>
    </article>
  );
}
