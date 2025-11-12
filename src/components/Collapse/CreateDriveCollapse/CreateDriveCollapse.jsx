import React, { useState } from "react";
import styles from "./CreateDriveCollapse.module.scss";
import { Input, Collapse } from "antd";
import WrappCard from "../../UI/Components/WrappCard/WrappCard";

import { useSelector, useDispatch } from "react-redux";
import { changeDataDrive } from "../../../store/createCard";

export default function CreateDriveCollapse(props) {
  const driveChecked = useSelector((state) => state.createCard.value.drive);

  const dispatch = useDispatch();
  const [choise, setChoise] = useState({ active_id: null });
  const text = props.data.map((card, index) => (
    <WrappCard
      key={index}
      card={card.drive}
      id={card.id}
      changeData={changeYear}
      choise={choise}
    />
  ));

  const items = [
    {
      key: "2",
      label: (
        <div className={styles.label}>
          <label>{props.head}</label>
          <label>{driveChecked.drive}</label>
        </div>
      ),
      children: <div className={styles.wrapper}>{text}</div>,
      showArrow: false,
    },
  ];

  const onChange = (key) => {
    // console.log(key);
  };
  function changeYear(data, id) {
    dispatch(changeDataDrive({ drive: data, id: id }));
    setChoise({ active_id: id });
  }
  return (
    <>
      <Collapse defaultActiveKey={["1"]} onChange={onChange} items={items} />
    </>
  );
}
