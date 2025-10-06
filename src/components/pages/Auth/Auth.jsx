import styles from "./Auth.module.scss";
import { NavLink, useNavigate } from "react-router";
import Button from "../../UI/Components/Button/Button";
import SignInForm from "../../UI/Form/SignInForm/SignInForm";
import SignUpForm from "../../UI/Form/SignUpForm/SignUpForm";
import { useEffect, useState } from "react";
import { request } from "@components/Libs/request";

let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function Auth() {
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      navigate("/lk");
    }
  }, []);
  // const [isActive, setIsActive] = useState(false);

  // const handleSignUp = () => {
  //   setIsActive(true);
  // };

  // const handleSignIn = () => {
  //   setIsActive(false);
  // };

  const [authUser, setauthUser] = useState({ email: null, password: null });
  const [regUser, setregUser] = useState({
    email: null,
    password: null,
    repass: null,
    login: null,
  });
  let navigate = useNavigate();

  function onAuthRequest(evt) {
    evt.preventDefault();
    console.log(evt);
    request({
      method: "post",
      url: VITE_BACK_API + "/auth",
      data: authUser,
      callback: (response) => {
        if (response.data.hasOwnProperty("token")) {
          sessionStorage.setItem("token", response.data.token);
          navigate("/lk");
        } else {
          console.log(response.data);
        }
      },
    });
  }
  function onChangeEmail(evt) {
    authUser.email = evt.target.value;
    let copy = Object.assign({}, authUser);
    setauthUser(copy);
    // setauthUser({ email: evt.target.value, password: authUser.password });
  }
  function onChangePassword(evt) {
    authUser.password = evt.target.value;
    let copy = Object.assign({}, authUser);
    setauthUser(copy);
  }

  function onRegisterhRequest(evt) {
    evt.preventDefault();
    console.log(regUser);

    console.log(evt);
    request({
      method: "post",
      url: VITE_BACK_API + "/regitration",
      data: regUser,
      callback: () => {
        console.log("otvet");
      },
    });
  }
  function onChangeRegEmail(evt) {
    regUser.email = evt.target.value;
    let copy = Object.assign({}, regUser);
    setregUser(copy);
  }
  function onChangeRegPassword(evt) {
    regUser.password = evt.target.value;
    let copy = Object.assign({}, regUser);
    setregUser(copy);
  }
  function onChangeRegRePassword(evt) {
    regUser.repass = evt.target.value;
    let copy = Object.assign({}, regUser);
    setregUser(copy);
  }
  function onChangeRegLogin(evt) {
    regUser.login = evt.target.value;
    let copy = Object.assign({}, regUser);
    setregUser(copy);
  }

  return (
    <article className={styles.container}>
      <div>
        login
        <form className={styles.reg} onSubmit={onAuthRequest}>
          <label htmlFor="1">email</label>
          <input
            onChange={onChangeEmail}
            type="email"
            name="email"
            id="1"
            placeholder="email"
          />
          <label htmlFor="2">password</label>
          <input
            onChange={onChangePassword}
            type="password"
            name="password"
            id="2"
            placeholder="password"
          />
          <button>войти</button>
        </form>
      </div>
      <div>
        register
        <form className={styles.reg} onSubmit={onRegisterhRequest}>
          <label htmlFor="3">login</label>
          <input
            onChange={onChangeRegLogin}
            type="text"
            name="login"
            id="3"
            placeholder="login"
          />
          <label htmlFor="4">email</label>
          <input
            onChange={onChangeRegEmail}
            type="email"
            name="email"
            id="4"
            placeholder="email"
          />
          <label htmlFor="5">password</label>
          <input
            onChange={onChangeRegPassword}
            type="password"
            name="password"
            id="5"
            placeholder="password"
          />
          <label htmlFor="6">re-password</label>
          <input
            onChange={onChangeRegRePassword}
            type="password"
            name="re-password"
            id="6"
            placeholder="re-password"
          />
          <button>Зарегистрироваться</button>
        </form>
      </div>
      {/* <div className={styles.block}>
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
      </div> */}
    </article>
  );
}
