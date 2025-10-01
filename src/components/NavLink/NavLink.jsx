import React from "react";
import styles from "./NavLink.module.scss";
import { Route, Routes } from "react-router";

export default function NavLink(props) {
  return (
    <a className={styles.link} to={props.link}>
      {props.content}
    </a>
  );
}
