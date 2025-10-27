import React, { useState } from "react";
import styles from "./CreateCardMarksModel.module.scss";
import { Input } from "antd";

import Marks from "../UI/Components/Marks/Marks";
import CreateCardSpecifications from "../CreateCardSpecifications/CreateCardSpecifications";
import { useSelector, useDispatch } from "react-redux";
import { changeDataMark, changeDataModel } from "../../store/createCard";
import TabsAdvertisement from "../UI/Components/Tabs/TabsAdvertisement";

export default function CreateCardMarksModel(props) {
  const data = useSelector((state) => state.createCard.value);

  const dispatch = useDispatch();

  const [step, setStep] = useState(0);

  const [btn, setBtn] = useState({ btnMark: false, btnModel: false });

  function setMarka(marka, id) {
    dispatch(changeDataMark({ mark: marka, id: id }));
    let copy = Object.assign({}, btn);
    copy.btnMark = true;
    setBtn(copy);
    setStep(1);
  }
  function setModel(model, id) {
    dispatch(changeDataModel({ model: model, id: id }));

    let copy = Object.assign({}, btn);
    copy.btnModel = true;
    setBtn(copy);
    setStep(2);
  }

  return (
    <div className={styles.main}>
      <h1>Продайте свой автомобиль</h1>
      <p>Объявление смогут увидеть 3 000 000 человек ежедневно</p>

      <div className={step == 0 ? styles.category : "displayN"}>
        <TabsAdvertisement />
      </div>

      <div className={step != 0 ? styles.category : "displayN"}>
        {data.mark.mark}
      </div>

      <Input
        disabled={btn.btnMark}
        value={data.mark.mark}
        className={styles.input}
        placeholder="Марка"
        onChange={(evt) => {
          dispatch(
            changeDataMark({ mark: evt.target.value, id: data.mark.id })
          );
        }}
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

      <Input
        disabled={btn.btnModel}
        value={data.model.model}
        className={step != 0 ? styles.input : "displayN"}
        placeholder="Модель"
        onChange={(evt) => {
          dispatch(
            changeDataModel({ model: evt.target.value, id: data.model.id })
          );
        }}
      />

      {step == 1 ? (
        <div className={styles.list}>
          <div className={step == 1 ? styles.models : "displyN"}>
            {props.marks[data.mark.id - 1].models.map((model) => (
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
        <CreateCardSpecifications step={step} form={props.form} />
      ) : (
        ""
      )}
    </div>
  );
}
