import styles from "./Auth.module.scss";
import { NavLink } from "react-router";
import Button from "../../UI/Components/Button/Button";
import SignInForm from "../../UI/Form/SignInForm/SignInForm";
import SignUpForm from "../../UI/Form/SignUpForm/SignUpForm";
import { useState } from "react";

export default function Auth() {
  // const [isActive, setIsActive] = useState(false);

  // const handleSignUp = () => {
  //   setIsActive(true);
  // };

  // const handleSignIn = () => {
  //   setIsActive(false);
  // };

  return (
    <article className={styles.container}>
      <div className={styles.block}>
        <section className={"block-item" + " " + styles.block__item}>
          <h2 className={"block-item__title"}>У вас уже есть аккаунт ?</h2>
          <Button className={"block-item__btn" + " " + "signin-btn"}>
            Войти
          </Button>
        </section>
        <section className={styles.block__item + " " + "block-item"}>
          <h2 className={"block-item__title"}>У вас нет аккаунта ?</h2>
          <Button className={"block-item__btn" + " " + "signup-btn"}>
            Зарегистрироваться
          </Button>
        </section>
      </div>

      <div className={styles.formBox}>
        <form className={styles.form + " " + "form_signin"}>
          <SignInForm />
        </form>

        <form className={styles.form + " " + "form_signup"}>
          <SignUpForm />
        </form>
      </div>
    </article>
  );
}
