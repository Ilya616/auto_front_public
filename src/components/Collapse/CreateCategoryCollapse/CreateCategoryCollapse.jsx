import React, { useState } from "react";
import styles from "./CreateCategoryCollapse.module.scss";
import { Collapse } from "antd";
import WrappCard from "../../UI/Components/WrappCard/WrappCard";

import { useSelector, useDispatch } from "react-redux";
import { changeDataBodyWork } from "../../../store/createCard";

export default function CreateCategoryCollapse(props) {
  const bodyworkChecked = useSelector(
    (state) => state.createCard.value.bodywork
  );
  const dispatch = useDispatch();

  const [choise, setChoise] = useState({ active_id: null });
  const text = props.data.map((card, index) => (
    <WrappCard
      key={index}
      card={card.bodywork}
      id={card.id}
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
          <label>{bodyworkChecked.bodywork}</label>
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
    dispatch(changeDataBodyWork({ bodywork: data, id: id }));
    setChoise({ active_id: id });
  }
  return (
    <>
      <Collapse defaultActiveKey={["1"]} onChange={onChange} items={items} />
    </>
  );
}
