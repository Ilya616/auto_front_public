import styles from "./RecomendationList.module.scss";
import React from "react";
import { Carousel } from "antd";
import { Iimage, Irecomendation } from "../../types/types";

const VITE_BACK_STORAGE: string = import.meta.env.VITE_BACK_STORAGE;

const RecomendationList: React.FC = (props: Irecomendation) => {
  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "150px",
    lineHeight: "160px",
    textAlign: "center",
  };
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <div className={styles.main}>
      <div className={styles.main__card}>
        <div className={styles.card__slider}>
          <Carousel afterChange={onChange}>
            {props.images != undefined
              ? props.images.map((element: Iimage) => (
                  <div className={styles.card}>
                    <h3 style={contentStyle}>
                      <img
                        className={styles.card__img}
                        src={VITE_BACK_STORAGE + element.image}
                        alt=""
                      />
                    </h3>
                  </div>
                ))
              : ""}
          </Carousel>
          <div className={styles.card__content}>
            <p className={styles.card__head}>{props.price}</p>
            <p className={styles.card__text}>{props.title}</p>
            <div className={styles.content}>
              <span className={styles.content__text}>{props.age}</span>
              <span className={styles.content__text}>/</span>
              <span className={styles.content__text}>{props.mileage}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecomendationList;
