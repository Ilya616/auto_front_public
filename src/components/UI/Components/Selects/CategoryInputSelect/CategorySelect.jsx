import React, { useRef, useState } from "react";
import styles from "./CategorySelect.module.scss";
import { TreeSelect } from "antd";

export default function CategorySelect(props) {
  const [value, setValue] = useState();

  const onChange = (newValue) => {
    setValue(newValue);
  };

  const onPopupScroll = (e) => {
    console.log("onPopupScroll", e);
  };
  const treeData = [
    {
      value: "parent 1",
      title: "parent 1",
      name: "name",
      children: [
        {
          value: "parent 1-0",
          title: "parent 1-0",
          name: "name",
          children: [
            {
              value: "leaf1",
              title: "leaf1",
              name: "name",
            },
            {
              value: "leaf2",
              title: "leaf2",
            },
            {
              value: "leaf3",
              title: "leaf3",
            },
            {
              value: "leaf4",
              title: "leaf4",
            },
            {
              value: "leaf5",
              title: "leaf5",
            },
            {
              value: "leaf6",
              title: "leaf6",
            },
          ],
        },
      ],
    },
  ];
  return (
    <>
      <input
        type="hidden"
        name={props.name}
        value={value}
        onChange={onChange}
      />
      <TreeSelect
        showSearch
        style={{ width: "100%" }}
        value={value}
        styles={{
          popup: { root: { maxHeight: 400, overflow: "auto" } },
        }}
        placeholder={props.value}
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
        treeData={treeData}
        onPopupScroll={onPopupScroll}
      ></TreeSelect>
    </>
  );
}
