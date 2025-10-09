import styles from "./Auth.module.scss";
import { NavLink, useNavigate } from "react-router";
import Button from "../../UI/Components/Button/Button";
import SignInForm from "../../UI/Form/SignInForm/SignInForm";
import SignUpForm from "../../UI/Form/SignUpForm/SignUpForm";
import { useEffect, useState } from "react";
import { request } from "../../Libs/request";
import { validateAuth, validateRegistration } from "../../Validator/formValidator";
let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function Auth() {
  let navigate = useNavigate();
  
  const [authUser, setAuthUser] = useState({email: null, password: null});
  const [registrationUser, setRegistrationUser] = useState(
    {
      login: null, 
      email: null, 
      password: null,
      repassword: null
    }
  );
  const [errors, setErrors] = useState({});

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      navigate(`/lk`);
    }
  },[]);

  function onAuthRequest(evt){
    evt.preventDefault();
    let newErrors = validateAuth(authUser);
    setErrors(newErrors);
    if(Object.keys(newErrors).length === 0){
      request({method:"post", url: VITE_BACK_API+"/auth", data: authUser, callback: (response)=>{
        
        if(response.data.hasOwnProperty("token")){
          sessionStorage.setItem("token", response.data.token);
          navigate(`/lk`);
        }
        else{
          
        }

      }});
    }
  }

  function onChangeEmail(evt){
    authUser.email = evt.target.value;
    let copy = Object.assign({}, authUser);
    setAuthUser(copy);
  }

  function onChangePass(evt){
    authUser.password = evt.target.value;
    let copy = Object.assign({}, authUser);
    setAuthUser(copy);
  }



  function onRegistrationRequest(evt){
    evt.preventDefault();
    let newErrors = validateRegistration(registrationUser);
    setErrors(newErrors);
    
    if(Object.keys(newErrors).length === 0){
      request({method:"post", url: VITE_BACK_API+"/registration", data: registrationUser, callback: ()=>{}});
    }
  }
  function onChangeRegLogin(evt){
    registrationUser.login = evt.target.value;
    let copy = Object.assign({}, registrationUser);
    setRegistrationUser(copy);
  }
  function onChangeRegEmail(evt){
    registrationUser.email = evt.target.value;
    let copy = Object.assign({}, registrationUser);
    setRegistrationUser(copy);
  }
  function onChangeRegPass(evt){
    registrationUser.password = evt.target.value;
    let copy = Object.assign({}, registrationUser);
    setRegistrationUser(copy);
  }
  function onChangeRegRePass(evt){
    registrationUser.repassword = evt.target.value;
    let copy = Object.assign({}, registrationUser);
    setRegistrationUser(copy);
  }
  return (
    <article className={styles.container}>

      <div>
        авторизация
        <form onSubmit={onAuthRequest}>
          <input onChange={onChangeEmail} name="email" placeholder="email"/><br />
          {<div style={{color: 'red'}}>{errors.LogEmail}</div>}

          <input type="password" onChange={onChangePass} name="password" placeholder="пароль"/><br />
          {<div style={{color: 'red'}}>{errors.logPassword}</div>}

          {<button disabled={authUser.email === null || authUser.password === null ? true : false}>Войти</button>}
        </form>
      </div>

      <div>
        регистрация
        <form  onSubmit={onRegistrationRequest}>
          <input type="text" onChange={onChangeRegLogin} placeholder="login"/><br />
          {<div style={{color: 'red'}}>{errors.login}</div>}

          <input onChange={onChangeRegEmail} placeholder="email"/><br />
          {<div style={{color: 'red'}}>{errors.email}</div>}

          <input type="password" onChange={onChangeRegPass} placeholder="пароль"/><br />
          {<div style={{color: 'red'}}>{errors.password}</div>}

          <input type="password" onChange={onChangeRegRePass} placeholder="re пароль"/><br />
          {<div style={{color: 'red'}}>{errors.repassword}</div>}

          {<button disabled={registrationUser.password === null || registrationUser.email === null ? true : false}>зарегистрироваться</button>}
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
