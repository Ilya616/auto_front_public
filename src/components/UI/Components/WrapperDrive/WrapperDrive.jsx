import React from "react";
import styles from "./WrapperDrive.module.scss";
import { Collapse } from "antd";

export default function WrapperDrive() {
  const text = `
    бензин дизель
`;
  const items = [
    {
      key: "2",
      label: "Двигатель",
      children: <p>{text}</p>,
      showArrow: false,
    },
  ];
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <>
      <Collapse defaultActiveKey={["1"]} onChange={onChange} items={items} />
    </>
  );
}
