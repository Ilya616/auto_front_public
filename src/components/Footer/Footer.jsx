import React from "react";
import styles from "./Footer.module.scss";
import { COMPANY } from "../Libs/company";

export default function Footer(props) {
  return (
    <div className={styles.footerMain}>
      <div className={styles.footerMain__wrapper}>
        <div className={styles.wrapper}>
          <span>{props.span}</span>
          {props.links.map((element, index) => (
            <a className={styles.wrapper__link} key={index} href="#">
              {element}
            </a>
          ))}
        </div>
        <div className={styles.wrapper}>
          {COMPANY.map((element) => (
            <img key={element.id} src={element.img} alt="" />
          ))}
        </div>
      </div>
      <div className={styles.icons}>
        <div className={styles.icons__wrap}>
          <i className="fa-brands fa-github"></i>
          <i className="fa-brands fa-laravel"></i>
          <i className="fa-brands fa-react"></i>
        </div>
        <div className={styles.icons__content}>
          <span>Проект компании: {props.authorOfProgect} и одной гордой птицы</span>
        </div>
      </div>
    </div>
  );
}
