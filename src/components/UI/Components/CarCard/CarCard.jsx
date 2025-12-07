import React, { useEffect } from "react";
import styles from "./CarCard.module.scss";

import { Carousel } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import { request } from "../../../Libs/request";
import { Link } from "react-router";
const VITE_BACK_STORAGE = import.meta.env.VITE_BACK_STORAGE;
const VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function CarCard(props) {
  const contentStyle = {
    margin: 0,
    height: "170px",
    color: "#ccc",
    lineHeight: "160px",
    textAlign: "center",
    borderRadius: "20px",
    boxSizing: "border-box",
    overflow: "hidden",
  };

  function getCard() {
    let objectData = {
      method: "post",
      url: VITE_BACK_API + "/graphql",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: null,
      callback: (responsee) => {
        console.log(responsee.data);
      },
      error: (error) => {
        console.log(error);
      },
    };
    if (sessionStorage.getItem("token")) {
      objectData.data = JSON.stringify({
        query: `
            mutation SetRecomendation{
              setRecomendation(
                data: "${props.id}"
                token: "${sessionStorage.getItem("token")}"
              )
            }
          `,
      });
    } else {
      objectData.data = JSON.stringify({
        query: `
            mutation SetRecomendation{
              setRecomendation(
                data: "${props.id}"
                token: "null"
              )
            }
          `,
      });
    }
    request(objectData);
  }
  return (
    <Link to={"/card/" + props.id} className={styles.link}>
      <div className={styles.main} onClick={getCard}>
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
              <p className={styles.content__link}>
                {props.mark.name + " " + props.model.model}
              </p>
            </div>
            <div className={styles.content__wrap}>
              <h4 className={styles.content__head}>{props.age}</h4>
              <p className={styles.content__text}>{props.text}</p>
              <p className={styles.content__text}>{props.mileage} км</p>
            </div>
            <div className={styles.content__priceWrap}>
              <span className={styles.content__price}>{props.price}</span>
            </div>
          </div>
          <div className={styles.parameters}>
            {props.description.map((element, index) => (
              <span className={styles.parameters__text} key={index}>
                {element}
              </span>
            ))}
          </div>
          <div className={styles.specifications}>
            <div className={styles.specifications__wrap}>
              {props.specifications.map((element, index) => (
                <span className={styles.specifications__text} key={index}>
                  {element}
                </span>
              ))}
            </div>
            <div className={styles.specifications__wrap}>
              {props.category.map((element, index) => (
                <span className={styles.specifications__text} key={index}>
                  {element}
                </span>
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
                <h4 className={styles.diller__content}>{props.user.name}</h4>
                {props.user.name == null ? (
                  ""
                ) : (
                  <>
                    <i className="fa-solid fa-circle-check"></i>
                    <span>4.7</span>
                  </>
                )}
                {props.sign ? (
                  <div className={styles.customIcon}>
                    <i
                      className={
                        "fa-solid fa-shield" + " " + styles.customIcon__icon
                      }
                    ></i>
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
    </Link>
  );
}
