import React, { useState } from "react";
import styles from "./CreateCardAvailability.module.scss";
import { Collapse } from "antd";
import WrappCard from "../../UI/Components/WrappCard/WrappCard";

import { useSelector, useDispatch } from "react-redux";
import { changeDataAvailability } from "../../../store/createCard";

export default function CreateCardAvailability(props) {
  const availabilityChecked = useSelector(
    (state) => state.createCard.value.availability
  );
  const data = [
    { avail: "В наличии" },
    { avail: "На заказ" },
    { avail: "В пути" },
  ];

  const dispatch = useDispatch();
  const [choise, setChoise] = useState({ active_id: null });
  const text = data.map((card, index) => (
    <WrappCard
      key={index}
      card={card.avail}
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
          <label>{availabilityChecked}</label>
        </div>
      ),
      children: <div className={styles.wrapper}>{text}</div>,
      showArrow: false,
    },
  ];

  function changeData(data, id) {
    dispatch(changeDataAvailability(data));
    setChoise({ active_id: id });
  }
  return (
    <>
      <Collapse defaultActiveKey={["1"]} items={items} />
    </>
  );
}
