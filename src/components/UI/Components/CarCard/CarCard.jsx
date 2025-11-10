import React from "react";
import styles from "./CarCard.module.scss";

import { Carousel } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
const VITE_BACK_STORAGE = import.meta.env.VITE_BACK_STORAGE;
export default function CarCard(props) {
  const contentStyle = {
    margin: 0,
    height: "230px",
    color: "#ccc",
    lineHeight: "160px",
    textAlign: "center",
    borderRadius: "20px",
    boxSizing: "border-box",
    overflow: "hidden",
  };
  return (
    <div className={styles.main}>
      <div className={styles.main__carusel}>
        <Carousel arrows infinite={false}>
          {props.dataPath.map((element) => (
            <div className={styles.carusel}>
              <h3 style={contentStyle}>
                <img
                  className={styles.carusel__img}
                  src={VITE_BACK_STORAGE + element.image}
                  alt="preview"
                />
              </h3>
            </div>
          ))}
        </Carousel>
        <br />
      </div>
      <div className={styles.content}>
        <div className={styles.content__prewiev}>
          <div className={styles.content__list}>
            <a href="#" className={styles.content__link}>
              {props.model}
            </a>
          </div>
          <div className={styles.content__wrap}>
            <h4 className={styles.content__text}>{props.age}</h4>
            <p className={styles.content__text}>{props.text}</p>
          </div>
          <div className={styles.content__priceWrap}>
            <span className={styles.content__price}>{props.price}</span>
          </div>
        </div>
        <div className={styles.spec}>
          {props.description.map((element, index) => (
            <span key={index}>{element}</span>
          ))}
        </div>
        <div className={styles.specifications}>
          <div className={styles.specifications__wrap}>
            {props.specifications.map((element, index) => (
              <span key={index}>{element}</span>
            ))}
          </div>
          <div className={styles.specifications__wrap}>
            {props.category.map((element, index) => (
              <span key={index}>{element}</span>
            ))}
          </div>
        </div>
        <div className={styles.differences}>
          {props.feature != null
            ? props.feature.map((element, index) => (
                <div key={index} className={styles.differences__wrap}>
                  {element}
                </div>
              ))
            : ""}
        </div>
        <div className={styles.wrapper}>
          <div className={styles.wrapper__main}>
            <div className={styles.diller}>
              <h4 className={styles.diller__content}>{props.user}</h4>
              <i className="fa-solid fa-circle-check"></i>
              <span>4.7</span>
              {props.sign ? (
                <div className={styles.customIcon}>
                  <i className="fa-solid fa-shield"></i>
                  <span>Проверенный дилер</span>
                </div>
              ) : (
                ""
              )}
            </div>

            <div className={styles.location}>
              <span className={styles.location__icon}>•</span>
              <span className={styles.location__text}>{props.location}</span>
            </div>
          </div>
          <div className={styles.wrapper__functional}>
            <div className={styles.wrapper__content}>
              <EllipsisOutlined />
            </div>
            <div className={styles.wrapper__content}>
              <i className="fa-solid fa-right-left"></i>
            </div>
            <div className={styles.wrapper__content}>
              <i className="fa-regular fa-heart"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
