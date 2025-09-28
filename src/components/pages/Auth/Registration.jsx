import React, { useState } from 'react';
import styles from './Registration.module.scss';
import { NavLink } from 'react-router'
import Button from '../../UI/Button/Button';
import SignInForm from '../../UI/Form/SignInForm';
import SignUpForm from '../../UI/Form/SignUpForm';

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
          <Button 
            className={`${styles['block-item__btn']} ${styles['signin-btn']}`} 
            event={handleSignIn}
          >
            Войти
          </Button>
        </section>
        <section className={`${styles['block__item']} ${styles['block-item']}`}>
          <h2 className={styles['block-item__title']}>У вас нет аккаунта ?</h2>
          <Button 
            className={`${styles['block-item__btn']} ${styles['signup-btn']}`}
            event={handleSignUp}
          >
            Зарегистрироваться
          </Button>
        </section>
      </div>

      <div className={`${styles['form-box']} ${isActive ? styles.active : ''}`}>
        <form className={`${styles.form} ${styles['form_signin']}`}>
          <SignInForm/>
        </form>

        <form className={`${styles.form} ${styles['form_signup']}`}>
          <SignUpForm/>
        </form>  
      </div>
    </article>
  );
}
