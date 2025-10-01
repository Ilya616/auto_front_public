import React from "react";

import Header from "../../Header/Header";
import Navigate from "../../Navigate/Navigate";
import { Pagination } from "antd";
import Footer from "../../Footer/Footer";

export default function NewsLayout(props) {
  return (
    <>
      <Header />
      <Navigate />
      <div className="center">
        <div>{props.children}</div>
        <Pagination defaultCurrent={1} total={99} />
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
