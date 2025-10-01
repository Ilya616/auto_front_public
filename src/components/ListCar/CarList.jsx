import React from "react";
import { Segmented } from "antd";
import {
  AppstoreOutlined,
  BarsOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import styles from "./CarList.module.scss";

export default function CarList() {
  return (
    <div className={styles.prewiev}>
      <div className={styles.prewiev__content}>
        <i className={"fa-solid fa-up-down " + styles.prewiev__icon}></i>
        <a className={styles.prewiev__link} href="#">
          По актуальности
        </a>
      </div>
      <div className={styles.prewiev__icons}>
        <Segmented
          options={[
            { label: "", value: "List", icon: <AppstoreOutlined /> },
            { label: "", value: "Kanban", icon: <MenuUnfoldOutlined /> },
            {
              label: "",
              value: "Print",
              icon: <BarsOutlined />,
            },
          ]}
        />
      </div>
    </div>
  );
}
