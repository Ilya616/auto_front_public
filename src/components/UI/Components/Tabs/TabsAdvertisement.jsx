import React, { useState } from "react";
import styles from "./TabsAdvertisement.module.scss";
import { Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeDataCategory } from "../../../../store/createCard";

export default function TabsAdvertisement(props) {
  const data = useSelector((state) => state.createCard.value.category);

  const dispatch = useDispatch();
  const onChange = (key) => {
    console.log(key);
    dispatch(changeDataCategory(key));
  };
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
  return <Tabs defaultActiveKey="Легковые" items={items} onChange={onChange} />;
}
