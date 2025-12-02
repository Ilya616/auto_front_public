import React, { useState } from "react";
import styles from "./CreateCardMarksModel.module.scss";
import { Input } from "antd";

import Marks from "../UI/Components/Marks/Marks";
import CreateCardSpecifications from "../CreateCardSpecifications/CreateCardSpecifications";
import { useSelector, useDispatch } from "react-redux";
import TabsAdvertisement from "../UI/Components/Tabs/TabsAdvertisement";
import { request } from "../Libs/request";
import { useNavigate } from "react-router";
let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function CreateCardMarksModel(props) {
  const data = useSelector((state) => state.createCard.value);
  let navigate = useNavigate();
  const [collect, setCollect] = useState({
    mark: { id: null, name: "" },
    model: { id: null, name: "" },
    mileage: null,
    price: null,
    description: "<p>text</p>",
    user: { name: null, id: null },
    location: "Нижний Новгород",
    availability: null,
  });
  const [step, setStep] = useState(0);

  const [btn, setBtn] = useState({ btnMark: false, btnModel: false });

  function setMarka(marka, id) {
    let copy = Object.assign({}, collect);
    copy.mark.name = marka;
    copy.mark.id = id;
    setCollect(copy);

    setBtn({ btnMark: true, btnModel: btn.btnModel });
    setStep(1);
  }
  function setModel(model, id) {
    let copy = Object.assign({}, collect);
    copy.model.name = model;
    copy.model.id = id;
    setCollect(copy);

    setBtn({ btnMark: btn.btnMark, btnModel: true });
    setStep(2);
  }
  function collection(form) {
    let copyData = Object.assign({}, data);
    copyData.price = form.get("price");
    copyData.mileage = form.get("milege");
    copyData.location = form.get("location");
    copyData.description = form.get("textarea");
    copyData.mark = collect.mark;
    copyData.model = collect.model;
    console.log(copyData);

    props.setLoader(true);
    request({
      method: "POST",
      url: VITE_BACK_API + "/card/create",
      data: copyData,
      headers: `Authorization: Bearer ${sessionStorage.getItem("token")}`,
      callback: (response) => {
        props.setLoader(true);
        navigate(`/lk`);
      },
      error: (error) => {
        props.setLoader(false);

        if (response.data.user) {
          // 1. Обновляем Redux store
          dispatch(setUser(response.data.user));
          
          // 2. Обновляем sessionStorage
          sessionStorage.setItem('user_id', response.data.user.id);
        }

        console.log(error);
      },
    });
  }

  return (
    <form action={collection} className={styles.main}>
      <h1>Продайте свой автомобиль</h1>
      <p>Объявление смогут увидеть 3 000 000 человек ежедневно</p>

      <div className={step == 0 ? styles.category : "displayN"}>
        <TabsAdvertisement />
      </div>

      <div className={step != 0 ? styles.category : "displayN"}>
        <span className={styles.category__title}>{collect.mark.name}</span>
        <span className={styles.category__title}>{collect.model.name}</span>
      </div>
      <Input
        name="mark"
        disabled={btn.btnMark}
        className={styles.input}
        placeholder="Марка"
      />
      {step == 0 ? (
        <div className={step == 0 ? styles.list : "displayN"}>
          {props.marks != undefined &&
            props.marks.map((marka) => (
              <Marks
                key={marka.id}
                marka={marka.mark}
                setMarka={setMarka}
                id={marka.id}
              />
            ))}
        </div>
      ) : (
        ""
      )}
      {step != 0 ? (
        <Input
          name="model"
          disabled={btn.btnModel}
          className={styles.input}
          placeholder="Модель"
        />
      ) : (
        ""
      )}

      {step == 1 ? (
        <div className={styles.list}>
          <div className={step == 1 ? styles.models : "displyN"}>
            {props.marks[collect.mark.id - 1].models.map((model) => (
              <span
                key={model.id}
                className={styles.link}
                onClick={() => {
                  setModel(model.model, model.id);
                }}
              >
                {model.model}
              </span>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
      {step == 2 ? (
        <CreateCardSpecifications
          step={step}
          collect={collect}
          setCollect={setCollect}
        />
      ) : (
        ""
      )}
    </form>
  );
}
