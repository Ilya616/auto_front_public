import React from "react";
import { useState } from "react";

import Header from "../../Header/Header";
import Navigate from "../../Navigate/Navigate";
import Location from "../../Location/Location";
import CarFilterPrewiew from "../../CarFilterPrewiew/CarFilterPrewiew";
import CarFilter from "../../CarFilter/CarFilter";
import CarIcons from "../../CarIcons/CarIcons";
import ListBrend from "../../ListBrend/ListBrend";
import CarList from "../../ListCar/CarList";
import { Pagination } from "antd";
import Footer from "../../Footer/Footer";

export default function DefaultLayout(props) {
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
          <Pagination defaultCurrent={1} total={99} />
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
