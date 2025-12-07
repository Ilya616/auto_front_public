import React, { useState } from "react";
import styles from "./CreateModificCollapse.module.scss";
import { Collapse, Radio } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeDataMode } from "../../../store/createCard";

export default function CreateModificCollapse(props) {
  const dispatch = useDispatch();
  const modeChecked = useSelector(
    (state) => state.createCard.value.modification
  );
  const [value, setValue] = useState(1);

  const text = props.data.map((card, index) => ({
    value: card.id,
    label: card.title,
  }));

  const items = [
    {
      key: "2",
      label: (
        <div className={styles.label}>
          <label>{props.head}</label>
          <label>{modeChecked.mode}</label>
        </div>
      ),
      children: (
        <div className={styles.wrapper}>
          <Radio.Group
            name="radiogroup"
            defaultValue={1}
            options={text}
            onChange={change}
          />
        </div>
      ),
      showArrow: false,
    },
  ];
  function change(evt) {
    dispatch(
      changeDataMode({
        id: props.data[evt.target.value - 1].id,
        mode: props.data[evt.target.value - 1].title,
      })
    );
  }

  return <Collapse defaultActiveKey={["1"]} items={items} />;
}
