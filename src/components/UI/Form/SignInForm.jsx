import React from 'react'
import Button from '../Button/Button'
import { NavLink } from 'react-router'
import styles from '../../pages/Auth/Auth.module.scss'

export default function Form() {
  return (
    <>
        <h3 className={styles['form__title']}>Вход</h3>
        <p><input type="text" className={styles['form__input']} placeholder="Логин" /></p>
        <p><input type="password" className={styles['form__input']} placeholder="Пароль" /></p>
        <p>
          <Button 
            className={styles['form__btn']} 
          >
            Войти
          </Button>
        </p>
        <p><NavLink to={"/auth"} className={styles['form__forgot']}>Восстановить пароль</NavLink></p>
    </>
  )
}
