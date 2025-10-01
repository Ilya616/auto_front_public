import React from "react";
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
