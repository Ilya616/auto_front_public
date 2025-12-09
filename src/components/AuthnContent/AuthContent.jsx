import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import { Input, Flex, Spin } from "antd";
import Button from "../UI/Components/Button/Button";
import { Link, useNavigate } from "react-router";
import { request } from "../Libs/request";
let VITE_BACK_API = import.meta.env.VITE_BACK_API;
import styles from "./AuthContent.module.scss";
import { validateAuth } from "../Validator/formValidator";

import { useDispatch } from "react-redux";
import { setUser } from "../../store/userMake";

export default function AuthContent() {
  useEffect(() => {
    setLoader(true);
    if (!sessionStorage.getItem("token")) {
      setLoader(false);
    } else {
      request({
        method: "POST",
        url: VITE_BACK_API + "/check-user",
        data: { token: sessionStorage.getItem("token") },
        callback: (response) => {
          if (!response.data) {
            sessionStorage.removeItem("token");
            setLoader(false);
          } else {
            navigate(`/lk`);
          }
        },
        error: (error) => {
          setLoader(false);
        },
      });
    }
  }, []);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [authUser, setAuthUser] = useState({ email: null, password: null });
  const [validate, setValidate] = useState({
    user: null,
    password: null,
    email: null,
  });
  const [loader, setLoader] = useState(false);
  function changeEmail(evt) {
    let copy = Object.assign({}, authUser);
    copy.email = evt.target.value;
    setAuthUser(copy);
  }
  function changePassword(evt) {
    let copy = Object.assign({}, authUser);
    copy.password = evt.target.value;
    setAuthUser(copy);
  }
  function onAuthRequest() {
    setLoader(true);
    request({
      method: "post",
      url: VITE_BACK_API + "/auth",
      data: authUser,
      callback: (response) => {
        if (response.data.hasOwnProperty("token")) {
          sessionStorage.setItem("token", response.data.token);
          localStorage.setItem('token', response.data.token);

          if (response.data.user && response.data.user.id) {
            sessionStorage.setItem('user_id', response.data.user.id);
            localStorage.setItem('token', response.data.token);
          } else {
            console.log(' No user data in response');
          }

          window.location.reload();
          dispatch(setUser(response.data));
          setLoader(false);
          navigate(`/lk`);
        }
      },
      error: (error) => {
        console.log(error);
        setLoader(false);
        setValidate({
          user: "Пользователь не найден",
          password: validate.password,
          email: validate.email,
        });
      },
    });
  }
  function isValidate(evt) {
    evt.preventDefault();
    let validator = validateAuth(authUser);
    if (Object.getOwnPropertyNames(validator).length == 0) {
      onAuthRequest();
    } else {
      setValidate({
        user: validate.user,
        password: validator.logPassword,
        email: validator.LogEmail,
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
        <form className={styles.form} onSubmit={isValidate}>
          {validate.user != null ? (
            <>
              <p className={styles.errorText}>{validate.user}</p>
            </>
          ) : (
            ""
          )}
          <Input
            size="large"
            placeholder="Введите email"
            prefix={<UserOutlined />}
            onChange={changeEmail}
            value={authUser.email}
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
            value={authUser.password}
          />
          {validate.password != null ? (
            <>
              <p className={styles.errorText}>{validate.password}</p>
            </>
          ) : (
            ""
          )}
          <Button>Войти</Button>
          <Link to="/register-new">Регистрация</Link>
        </form>
      )}
    </>
  );
}
