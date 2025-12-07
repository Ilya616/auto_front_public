import React, { useCallback, useEffect } from "react";
import { useState } from "react";

import Header from "@components/Header/Header";
import Navigate from "@components/Navigate/Navigate";
import Location from "@components/Location/Location";
import CarFilterPrewiew from "@components/CarFilterPrewiew/CarFilterPrewiew";
import CarFilter from "@components/CarFilter/CarFilter";
import CarIcons from "@components/CarIcons/CarIcons";
import ListBrend from "@components/ListBrend/ListBrend";
import CarList from "@components/ListCar/CarList";
import { Pagination } from "antd";
import Footer from "@components/Footer/Footer";
import RecomendationList from "../../RecomendationList/RecomendationList";
import { request } from "../../Libs/request";
import { useNavigate } from "react-router";

const VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function IndexLayout(props) {
  const [recomendation, setRecomendation] = useState([]);
  const [process, setProcess] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      requestRecommendation();
      return;
    }
  }, [process]);

  const requestRecommendation = useCallback(() => {
    request({
      url: VITE_BACK_API + "/graphql",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: JSON.stringify({
        query: `
            mutation GetRecomendation{
              getRecomendation(
                token: "${sessionStorage.getItem("token")}"
              )
            }
          `,
      }),
      callback: (res) => {
        let data = JSON.parse(res.data.data.getRecomendation);

        if (data.status == "processing") {
          setTimeout(() => {
            setProcess(!process);
          }, 30000);
        }
        if (data.status == "complete") {
          setRecomendation(data.data);
        }
      },
      error: (error) => {},
    });
  }, []);
  function onChange(evt) {
    props.updateList(evt);
  }

  return (
    <>
      <Header />
      <Navigate />
      <div className="center">
        <Location />
        <div className="board-center">
          <CarFilterPrewiew />
          <CarFilter />
          <CarIcons cars={props.cars} />
          <hr />
          <ListBrend />
          <CarList />
          <div>{props.children}</div>
          <Pagination onChange={onChange} defaultCurrent={1} total={100} />
        </div>
        <h2>Рекомендации</h2>
        <div className="flex-position">
          {recomendation != undefined
            ? recomendation.map((card, index) => (
                <RecomendationList
                  key={index}
                  price={card.price}
                  title={card.modelName}
                  age={card.modelAge}
                  mileage={card.mileage}
                  images={card.dataImg}
                />
              ))
            : ""}
        </div>
        <hr />
        <Footer
          span={"ООО 'Сервисы размещения объявлений'"}
          links={["Пользовательское соглашение", "Правила рекомендаций"]}
          authorOfProgect={"python41"}
        />
      </div>
    </>
  );
}
