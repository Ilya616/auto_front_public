import React, { useEffect, useState } from "react";
import styles from "./CreateCardSpecifications.module.scss";
import { Input, Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import CreateCardCollapse from "../Collapse/CreateCardCollapse/CreateCardCollapse";

import { useSelector, useDispatch } from "react-redux";
import {
  changeDataMilege,
  changeDataPrice,
  changeDataPhoto,
  changeDataDescription,
  changeDataUser,
} from "../../store/createCard";

import CreateCategoryCollapse from "../Collapse/CreateCategoryCollapse/CreateCategoryCollapse";
import CreateDriveCollapse from "../Collapse/CreateDriveCollapse/CreateDriveCollapse";
import CreateEngineCollapse from "../Collapse/CreateEngineCollapse/CreateEngineCollapse";
import CreateTransmissionCollapse from "../Collapse/CreateTransmissionCollapse/CreateTransmissionCollapse";
import Button from "../UI/Components/Button/Button";

import { request } from "../Libs/request";
import CreateColorCollapse from "../Collapse/CreateColorCollapse/CreateColorCollapse";
import Load from "../UI/Components/Load/Load";
import { useNavigate } from "react-router";
import CreateModificCollapse from "../Collapse/CreateModificCollapse/CreateModificCollapse";
import CreateCardAvailability from "../Collapse/CreateCardAvailability/CreateCardAvailability";
import CreateCardContact from "../UI/Components/CreateCardContact/CreateCardContact";
import { position } from "../Libs/position";

let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function CreateCardSpecifications(props) {
  const data = useSelector((state) => state.createCard.value);
  const [specifications, setSpecifications] = useState([]);

  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { TextArea } = Input;
  const onChange = (e) => {
    dispatch(changeDataDescription(e.target.value));
  };

  // получение второго пакета данных
  useEffect(() => {
    setLoader(true);
    let copyData = Object.assign({}, data);
    copyData.token = sessionStorage.getItem("token");
    request({
      method: "POST",
      url: VITE_BACK_API + "/get-specifications",
      headers: `Authorization: Bearer ${copyData.token}`,
      data: { token: copyData.token },
      callback: (response) => {
        setSpecifications(response.data);
        dispatch(
          changeDataUser({
            name: response.data.user.name,
            id: response.data.user.id,
          })
        );
        setLoader(false);
      },
      error: (error) => {
        sessionStorage.removeItem("token");
        navigate(`/auth-new`);
        // console.log(error);
      },
    });
  }, []);

  // отправка итоговых данных
  function loadAdvertisement() {
    let token = sessionStorage.getItem("token");
    console.log(data);

    setLoader(true);
    request({
      method: "POST",
      url: VITE_BACK_API + "/card/create",
      data: data,
      headers: [`Authorization: Bearer ${token}`],
      callback: (response) => {
        setLoader(false);
        navigate(`/lk`);
      },
      error: (error) => {
        setLoader(false);

        console.log(error);
      },
    });
  }

  return (
    <>
      {loader ? (
        <div className={styles.loader}>
          <Flex align="center" gap="middle">
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
          </Flex>
        </div>
      ) : (
        <>
          <div className={props.step == 2 ? styles.main : "displayN"}>
            <h2>Характеристики:</h2>
            <CreateCardCollapse head={"Год выпуска"} />
            {specifications.bodywork != undefined && (
              <CreateCategoryCollapse
                head={"Кузов"}
                data={specifications.bodywork}
              />
            )}
            {specifications.drive != undefined && (
              <CreateDriveCollapse
                head={"Привод"}
                data={specifications.drive}
              />
            )}
            {specifications.engine != undefined && (
              <CreateEngineCollapse
                head={"Двигатель"}
                data={specifications.engine}
              />
            )}
            {specifications.tranmission != undefined && (
              <CreateTransmissionCollapse
                head={"Коробка передач"}
                data={specifications.tranmission}
              />
            )}
            {specifications.color != undefined && (
              <CreateColorCollapse head={"Цвет"} data={specifications.color} />
            )}
            {specifications.mode != undefined && (
              <CreateModificCollapse
                head={"Модификация"}
                data={specifications.mode}
              />
            )}
            {<CreateCardAvailability head={"Наличие"} />}
          </div>
          <div className={props.step == 2 ? styles.main : "displayN"}>
            <h2>Пробег:</h2>
            <Input
              value={data.mileage}
              className={styles.input}
              placeholder="км"
              onChange={(evt) => {
                dispatch(changeDataMilege(evt.target.value));
              }}
            />
          </div>
          <div className={props.step == 2 ? styles.main : "displayN"}>
            <h2>Фото:</h2>
            <p className={styles.text}>
              Госномер должен быть хорошо виден — он поможет проверить
              объявление. В поиске мы скроем его от пользователей. Также, не
              показывайте на фото контакты, надписи, людей, водяные знаки и
              посторонние предметы.
            </p>
            <div>
              <input
                type="file"
                onChange={(evt) => {
                  dispatch(changeDataPhoto(evt.target.value));
                }}
              />
              <Load />
            </div>
          </div>
          <div className={props.step == 2 ? styles.main : "displayN"}>
            <h2>Описание:</h2>
            <p className={styles.text}>
              Убедитесь, что описание соответствует Правилам. Не указывайте
              ссылки, цену, контакты и не предлагайте услуги — объявление не
              пройдет модерацию
            </p>
            <div>
              <TextArea
                showCount
                maxLength={100}
                onChange={onChange}
                placeholder="Описание"
                style={{ height: 120, resize: "none" }}
              />
            </div>
          </div>
          <div className={props.step == 2 ? styles.main : "displayN"}>
            <h2>Стоимость:</h2>
            <Input
              value={data.price}
              className={styles.input}
              placeholder="Стоимость"
              onChange={(evt) => {
                dispatch(changeDataPrice(evt.target.value));
              }}
            />
            <div className={styles.main}>
              <h2>Контакты</h2>
              {specifications.user != undefined && (
                <CreateCardContact name={specifications} />
              )}
            </div>
            <div className={styles.main}>
              <h2>Место осмотра</h2>
              <Input
                className={styles.input}
                placeholder="Город"
                value={data.location}
              />
            </div>
          </div>
          <div className={styles.main}>
            <Button event={loadAdvertisement}>Разместить объявление</Button>
          </div>
        </>
      )}
    </>
  );
}
