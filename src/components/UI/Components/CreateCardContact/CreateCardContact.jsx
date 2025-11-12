import React from "react";
import styles from "./CreateCardContact.module.scss";
import { Input, Select, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeDataUser } from "../../../../store/createCard";

export default function CreateCardContact(props) {
  const data = useSelector((state) => state.createCard.value);
  let dispatch = useDispatch();
  const option = [
    { value: "1", label: "c 00:00" },
    { value: "2", label: "c 01:00" },
    { value: "3", label: "c 02:00" },
  ];
  const optionNext = [
    { value: "1", label: "до 00:00" },
    { value: "2", label: "до 01:00" },
    { value: "3", label: "до 02:00" },
  ];
  return (
    <div>
      <Input
        className={styles.input}
        placeholder="Как к вам обращаться"
        value={data.user.name}
        onChange={(evt) => {
          dispatch(
            changeDataUser({ id: data.user.id, name: evt.target.value })
          );
        }}
      />
      <div className={styles.main}>
        <Input className={styles.form} placeholder="Номер телефона" />
        <Select
          className={styles.form__select}
          defaultValue="c 00:00"
          style={{ width: 120 }}
          options={option}
        />
        <Select
          className={styles.form__select}
          defaultValue="до 00:00"
          style={{ width: 120 }}
          options={optionNext}
        />
      </div>
    </div>
  );
}
