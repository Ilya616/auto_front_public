import React, { useState } from "react";
import styles from "./CreateCardModel.module.scss";
import { Input } from "antd";

import CreateCardCollapse from "../Collapse/CreateCardCollapse/CreateCardCollapse";

import { useSelector, useDispatch } from "react-redux";
import {
  changeDataModel,
  changeDataMilege,
  changeDataPrice,
  changeDataPhoto,
} from "../../store/createCard";

import Load from "../UI/Components/Load/Load";
import CreateCard from "../CreateCard/CreateCard";
import CreateCategoryCollapse from "../Collapse/CreateCategoryCollapse/CreateCategoryCollapse";
import CreateDriveCollapse from "../Collapse/CreateDriveCollapse/CreateDriveCollapse";
import CreateEngineCollapse from "../Collapse/CreateEngineCollapse/CreateEngineCollapse";
import CreateTransmissionCollapse from "../Collapse/CreateTransmissionCollapse/CreateTransmissionCollapse";
import Button from "../UI/Components/Button/Button";

export default function CreateCardModel(props) {
  const count = useSelector((state) => state.createCard.value);

  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [btn, setBtn] = useState(false);
  function setModel(model) {
    dispatch(changeDataModel(model));

    setInput(model);
    setBtn(true);
    props.nextStep();
  }
  let cars = props.model != undefined ? props.model : "";
  function years() {
    let years = [];
    let date = new Date();
    for (let year = date.getFullYear(); year >= 1900; year--) {
      years.push(year);
    }
    return years;
  }
  function loadAdvertisement() {
    console.log(count);
  }
  return (
    <>
      <Input
        disabled={btn}
        value={input}
        className={styles.input}
        placeholder="Модель"
        onChange={(evt) => {
          setInput(evt.target.value);
        }}
      />
      {props.step == 1 && (
        <div className={styles.models}>
          {cars != undefined &&
            cars[props.id].models.map((model, index) => (
              <span
                key={index}
                className={styles.link}
                onClick={() => {
                  setModel(model);
                }}
              >
                {model}
              </span>
            ))}
        </div>
      )}
      {props.step == 2 && (
        <>
          <div className={styles.main}>
            <h2>Характеристики:</h2>
            <CreateCardCollapse
              data={years()}
              head={"Год выпуска"}
              prefix={null}
            />
            <CreateCategoryCollapse
              data={cars[props.id].bodywork}
              head={"Кузов"}
            />
            <CreateDriveCollapse data={cars[props.id].drive} head={"Привод"} />
            <CreateEngineCollapse
              data={cars[props.id].engine}
              head={"Двигатель"}
            />
            <CreateTransmissionCollapse
              data={cars[props.id].transmission}
              head={"Коробка передач"}
            />
          </div>
          <div className={styles.main}>
            <h2>Пробег:</h2>
            <Input
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
              <CreateCard />
            </div>
          </div>
          <div className={styles.main}>
            <h2>Стоимость:</h2>
            <Input
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
