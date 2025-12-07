import React, { useEffect, useState } from "react";
import styles from "./CardHeader.module.scss";
import { EllipsisOutlined, MessageOutlined } from "@ant-design/icons";
import { Carousel, Flex, Spin } from "antd";
import { useParams } from "react-router";
import { request } from "../Libs/request";
import { Ielement } from "../../types/types";
import { ExceptionMap } from "antd/es/result";

let VITE_BACK_API = import.meta.env.VITE_BACK_API;
const VITE_BACK_STORAGE = import.meta.env.VITE_BACK_STORAGE;

const CardHeader = () => {
  const [data, setData] = useState({
    bodywork: {},
    category: {},
    color: {},
    description: "",
    drive: {},
    engine: {},
    mark: {},
    model: {},
    modification: {},
    price: "",
    transmission: {},
    user: {},
  });
  const [loader, setLoader] = useState(false);
  let params: any = useParams();
  useEffect(() => {
    setLoader(true);

    request({
      method: "post",
      url: VITE_BACK_API + "/graphql",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      data: JSON.stringify({
        query: `
          query GetCard {
            card(id:${params.card_id}){
              id
              category{
                type
              }
              drive{
                drive
              }
              mark{
                name
              }
              model{
                model
              }
              price
              engine{
                type
              }
              transmission{
                transmission
              }
              bodywork{
                bodywork
              }
              color{
                title
              }
              modification{
                title
              }
              user{
                avatar
                name
                location
              }
              description
              images{
                image
              }
            }
          }`,
      }),
      callback: (response: any) => {
        setData(response.data.data.card);
        setLoader(false);
      },
      error: (error: any) => {},
    });
  }, []);

  const contentStyle: React.CSSProperties = {
    margin: 0,
    height: "500px",
    lineHeight: "160px",
    textAlign: "center",
  };
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  const contentSlider: object = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };

  const content = <div style={contentSlider} />;
  return (
    <>
      {loader ? (
        <Flex gap="middle">
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        </Flex>
      ) : (
        <div className={styles.main}>
          <div className={styles.prewiev}>
            <div className={styles.state}>
              <h1 className={styles.state__text}>
                {data.mark.name + " " + data.model.model}
              </h1>
              <ul className={styles.state__list}>
                <li className={styles.state__option}>16 сентября</li>
                <li className={styles.state__option}>№ {data.id}</li>
              </ul>
            </div>
            <div className={styles.price}>
              <div className={styles.mode}>
                <div className={styles.mode__content}>
                  <EllipsisOutlined className={styles.mode__icon} />
                </div>
                <div className={styles.mode__content}>
                  <i
                    className={"fa-solid fa-right-left " + styles.mode__icon}
                  ></i>
                </div>
                <div className={styles.mode__content}>
                  <i className={"fa-regular fa-heart " + styles.mode__icon}></i>
                </div>
              </div>
              <h2 className={styles.price}></h2>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.user}>
              <div className={styles.user__avatar}>
                <img
                  src={VITE_BACK_STORAGE + data.user.avatar}
                  alt=""
                  className={styles.avatar}
                />
              </div>
              <div className={styles.user__info}>
                <p className={styles.user__text}>{data.user.name}</p>
                <p className={styles.user__text}>{data.user.location}</p>
              </div>
            </div>
            <div className={styles.settings}>
              <div className={styles.settings__wrapp}>
                <MessageOutlined />
                <button className={styles.btn}>Написать</button>
              </div>
              <div className={styles.settings__wrapp}>
                <button className={styles.btn__border}>Показать телефон</button>
              </div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.specifications}>
              <h2 className={styles.specifications__text}>Харктеристики</h2>
              <div className={styles.specification}>
                <span>Модификация</span>
                <span>{data.modification.title}</span>
              </div>
              <div className={styles.specification}>
                <span>Двигатель</span>
                <span>{data.engine.type}</span>
              </div>
              <div className={styles.specification}>
                <span>Коробка</span>
                <span>{data.transmission.transmission}</span>
              </div>
              <div className={styles.specification}>
                <span>Привод</span>
                <span>{data.drive.drive}</span>
              </div>
              <div className={styles.specification}>
                <span>Кузов</span>
                <span>{data.bodywork.bodywork}</span>
              </div>
              <div className={styles.specification}>
                <span>Цвет</span>
                <span>{data.color.title}</span>
              </div>
            </div>
            <div className={styles.slider}>
              <Carousel afterChange={onChange}>
                {data.images != undefined
                  ? data.images.map((image) => (
                      <div className={styles.carusel}>
                        <h3 style={contentStyle}>
                          <img
                            className={styles.carusel__img}
                            src={VITE_BACK_STORAGE + image.image}
                            alt="preview"
                          />
                        </h3>
                      </div>
                    ))
                  : ""}
              </Carousel>
            </div>
          </div>
          <div className={styles.description}>
            <h2 className={styles.head}>Комментарий</h2>
            <p className={styles.text}>{data.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CardHeader;
