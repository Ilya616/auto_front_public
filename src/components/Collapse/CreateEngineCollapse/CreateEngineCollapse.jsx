import React, { useState } from "react";
import styles from "./CreateEngineCollapse.module.scss";
import { Collapse } from "antd";
import WrappCard from "../../UI/Components/WrappCard/WrappCard";

import { useSelector, useDispatch } from "react-redux";
import { changeDataEngine } from "../../../store/createCard";

export default function CreateEngineCollapse(props) {
  const engineChecked = useSelector((state) => state.createCard.value.engine);

  const dispatch = useDispatch();
  const [choise, setChoise] = useState({ active_id: null });
  const text = props.data.map((card, index) => (
    <WrappCard
      key={index}
      card={card.engine}
      index={index}
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
          <label>{engineChecked.name}</label>
        </div>
      ),
      children: <div className={styles.wrapper}>{text}</div>,
      showArrow: false,
    },
  ];

  const onChange = (key) => {
    // console.log(key);
  };
  function changeData(data, id) {
    dispatch(changeDataEngine(data));
    setChoise({ active_id: id });
  }
  return (
    <>
      <Collapse defaultActiveKey={["1"]} onChange={onChange} items={items} />
    </>
  );
}
