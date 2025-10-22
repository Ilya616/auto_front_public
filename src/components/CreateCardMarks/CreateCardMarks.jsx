import React, { useState } from "react";
import styles from "./CreateCardMarks.module.scss";
import { Tabs, Input } from "antd";

import Marks from "../UI/Components/Marks/Marks";
import CreateCardModel from "../CreateCardModel/CreateCardModel";
import { useSelector, useDispatch } from "react-redux";
import { changeDataMark } from "../../store/createCard";

export default function CreateCardMarks(props) {
  const carCaracteristics = useSelector((state) => state.createCard.value);

  const dispatch = useDispatch();

  const [step, setStep] = useState(0);
  const onChange = (key) => {};
  const [btn, setBtn] = useState(false);
  const [mark, setMark] = useState({ value: "", mark_id: null });
  const items = [
    {
      key: "1",
      label: "Легковые",
      children: "",
    },
    {
      key: "2",
      label: "Комтранс",
      children: "",
    },
    {
      key: "3",
      label: "Мото",
      children: "",
    },
  ];
  function setMarka(marka, id) {
    setMark({ value: marka, mark_id: id });
    dispatch(changeDataMark({name:marka, id:id}));
    setBtn(true);
    setStep(1);
  }
  function nextStep() {
    setStep(step + 1);
  }
  return (
    <div className={styles.main}>
      <h1>Продайте свой автомобиль</h1>
      <p>Объявление смогут увидеть 3 000 000 человек ежедневно</p>
      {step == 0 ? (
        <div className={styles.category}>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </div>
      ) : (
        <div className={styles.category}>{mark.value}</div>
      )}
      <Input
        value={mark.value}
        className={styles.input}
        placeholder="Марка"
        disabled={btn}
        onChange={(evt) => {
          setMark({ value: evt.target.value, mark_id: mark.mark_id });
        }}
      />
      {step == 0 && (
        <div className={styles.list}>
          {props.marks != undefined &&
            props.marks.map((marka, index) => (
              <Marks
                key={marka.id}
                marka={marka.mark}
                setMarka={setMarka}
                id={index}
              />
            ))}
        </div>
      )}

      {/* {props.marks != undefined && console.log(props.marks)} */}
      {step >= 1 && (
        <div className={styles.list}>
          <CreateCardModel
            model={props.marks}
            id={mark.mark_id}
            step={step}
            nextStep={nextStep}
          />
        </div>
      )}

      
      {/* {step >= 1 && console.log(carCaracteristics)} */}
    </div>
  );
}
