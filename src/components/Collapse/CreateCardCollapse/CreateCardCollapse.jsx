import React, { useState } from "react";
import styles from "./CreateCardCollapse.module.scss";
import { Collapse } from "antd";
import WrappCard from "../../UI/Components/WrappCard/WrappCard";

import { useSelector, useDispatch } from "react-redux";
import { changeDataYear } from "../../../store/createCard";
import { year } from "../../Libs/year";

export default function CreateCardCollapse(props) {
  const yearChecked = useSelector((state) => state.createCard.value.year);

  const dispatch = useDispatch();
  const [choise, setChoise] = useState({ active_id: null });
  const text = year().map((card, index) => (
    <WrappCard
      key={index}
      card={card}
      id={index}
      changeData={changeData}
      choise={choise}
    />
  ));

  const items = [
    {
      key: "2",
      label: (
        <div className={styles.label}>
          <label>{props.head}</label>
          <label>{yearChecked}</label>
        </div>
      ),
      children: <div className={styles.wrapper}>{text}</div>,
      showArrow: false,
    },
  ];

  function changeData(data, id) {
    dispatch(changeDataYear(data));
    setChoise({ active_id: id });
  }
  return (
    <>
      <Collapse defaultActiveKey={["1"]} items={items} />
    </>
  );
}
