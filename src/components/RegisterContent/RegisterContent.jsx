import React, { useState } from "react";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Input, Spin, Flex } from "antd";
import Button from "../UI/Components/Button/Button";
import { Link, useNavigate } from "react-router";
import styles from "./RegisterContent.module.scss";
import { validateRegistration } from "../Validator/formValidator";
import { request } from "../Libs/request";
let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function RegisterContent() {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  let navigate = useNavigate();

  const [dataUser, setDataUser] = useState({
    email: null,
    password: null,
    login: null,
    repassword: null,
  });
  const [validate, setValidate] = useState({
    user: null,
    password: null,
    email: null,
    login: null,
    repassword: null,
  });
  const [loader, setLoader] = useState(false);
  function changeEmail(evt) {
    let copy = Object.assign({}, dataUser);
    copy.email = evt.target.value;
    setDataUser(copy);
    console.log(evt.target.value);
  }
  function changeLogin(evt) {
    let copy = Object.assign({}, dataUser);
    copy.login = evt.target.value;
    setDataUser(copy);
    console.log(evt.target.value);
  }
  function changePassword(evt) {
    let copy = Object.assign({}, dataUser);
    copy.password = evt.target.value;
    setDataUser(copy);
    console.log(evt.target.value);
  }
  function changeRePassword(evt) {
    let copy = Object.assign({}, dataUser);
    copy.repassword = evt.target.value;
    setDataUser(copy);
    console.log(evt.target.value);
  }
  function onRegisterRequest() {
    setLoader(true);
    request({
      method: "post",
      url: VITE_BACK_API + "/registration",
      data: dataUser,
      callback: (response) => {
        setLoader(false);
        navigate(`/auth-new`);
      },
      error: (error) => {
        let copy = Object.assign({}, validate);
        copy.user = "Пользователь уже зарегистрирован";
        setValidate(copy);
        setLoader(false);
        console.log(error);
      },
    });
  }
  function isValidate(evt) {
    evt.preventDefault();

    let validator = validateRegistration(dataUser);
    console.log(validator);
    if (Object.getOwnPropertyNames(validator).length == 0) {
      onRegisterRequest();
    } else {
      setValidate({
        user: validate.user,
        password: validator.password,
        email: validator.email,
        repassword: validator.repassword,
        login: validator.login,
      });
    }
  }

  return (
    <>
      {loader ? (
        <Flex align="center" gap="middle">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        </Flex>
      ) : (
        <form onSubmit={isValidate} className={styles.form}>
          {validate.user != null ? (
            <>
              <p className={styles.errorText}>{validate.user}</p>
            </>
          ) : (
            ""
          )}
          <Input
            size="large"
            placeholder="Введите логин"
            prefix={<UserOutlined />}
            onChange={changeLogin}
            value={dataUser.login}
          />
          {validate.login != null ? (
            <>
              <p className={styles.errorText}>{validate.login}</p>
            </>
          ) : (
            ""
          )}
          <Input
            size="large"
            placeholder="Введите email"
            prefix={<UserOutlined />}
            onChange={changeEmail}
            value={dataUser.email}
          />
          {validate.email != null ? (
            <>
              <p className={styles.errorText}>{validate.email}</p>
            </>
          ) : (
            ""
          )}
          <Input.Password
            onChange={changePassword}
            placeholder="Введите пароль"
            value={dataUser.password}
          />
          {validate.password != null ? (
            <>
              <p className={styles.errorText}>{validate.password}</p>
            </>
          ) : (
            ""
          )}
          <Input.Password
            onChange={changeRePassword}
            placeholder="Повторите пароль"
            value={dataUser.repassword}
          />
          {validate.repassword != null ? (
            <>
              <p className={styles.errorText}>{validate.repassword}</p>
            </>
          ) : (
            ""
          )}
          <Button>Войти</Button>
          <Link to="/auth-new">Авторизация</Link>
        </form>
      )}
    </>
  );
}
