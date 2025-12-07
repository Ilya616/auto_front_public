import React, { useState } from "react";
import styles from "./CreateColorCollapse.module.scss";
import { Collapse } from "antd";
import WrappCard from "../../UI/Components/WrappCard/WrappCard";

import { useSelector, useDispatch } from "react-redux";
import { changeDataColor } from "../../../store/createCard";
import ColorWrap from "../../UI/Components/ColorWrap/ColorWrap";

export default function CreateColorCollapse(props) {
  const colorChecked = useSelector((state) => state.createCard.value.color);
  const dispatch = useDispatch();

  const [choise, setChoise] = useState({ active_id: null });

  const text = props.data.map((color, index) => (
    <ColorWrap
      key={color.id}
      id={color.id}
      color={color}
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
          <label>{colorChecked.color}</label>
        </div>
      ),
      children: <div className={styles.wrapper}>{text}</div>,
      showArrow: false,
    },
  ];

  function changeData(data, id) {
    dispatch(changeDataColor({ color: data, id: id }));
    setChoise({ active_id: id });
  }
  return (
    <>
      <Collapse defaultActiveKey={["1"]} items={items} />
    </>
  );
}
