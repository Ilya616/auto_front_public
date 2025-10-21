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
} from "../../store/createCard";

import CreateCard from "../CreateCard/CreateCard";
import CreateCategoryCollapse from "../Collapse/CreateCategoryCollapse/CreateCategoryCollapse";
import CreateDriveCollapse from "../Collapse/CreateDriveCollapse/CreateDriveCollapse";
import CreateEngineCollapse from "../Collapse/CreateEngineCollapse/CreateEngineCollapse";
import CreateTransmissionCollapse from "../Collapse/CreateTransmissionCollapse/CreateTransmissionCollapse";
import Button from "../UI/Components/Button/Button";

import { request } from "../Libs/request";
import CreateColorCollapse from "../Collapse/CreateColorCollapse/CreateColorCollapse";
import Load from "../UI/Components/Load/Load";

let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function CreateCardSpecifications(props) {
  const data = useSelector((state) => state.createCard.value);
  const [specifications, setSpecifications] = useState([]);
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const { TextArea } = Input;
  const onChange = (e) => {
    dispatch(changeDataDescription(e.target.value));
    console.log("Change:", e.target.value);
  };

  // получение второго пакета данных
  useEffect(() => {
    setLoader(true);
    request({
      method: "POST",
      url: VITE_BACK_API + "/get-specifications",
      data: { token: sessionStorage.getItem("token") },
      callback: (response) => {
        // console.log(response.data);
        setSpecifications(response.data);
        setLoader(false);
      },
      error: (error) => {
        // console.log(error);
      },
    });
  }, []);

  // отправка итоговых данных
  function loadAdvertisement() {
    let copyData = Object.assign({}, data);
    copyData.token = sessionStorage.getItem("token");
    console.log(data);
    request({
      method: "POST",
      url: VITE_BACK_API + "/card/create",
      data: copyData,
      callback: (response) => {
        // console.log(response.data);
      },
      error: (error) => {
        // console.log(error);
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
          <div className={styles.main}>
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
          </div>
          <div className={styles.main}>
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
          <div className={styles.main}>
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
          <div className={styles.main}>
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
          <div className={styles.main}>
            <h2>Стоимость:</h2>
            <Input
              value={data.price}
              className={styles.input}
              placeholder="Стоимость"
              onChange={(evt) => {
                dispatch(changeDataPrice(evt.target.value));
              }}
            />
          </div>
          <Button event={loadAdvertisement}>Разместить объявление</Button>
        </>
      )}
    </>
  );
}
