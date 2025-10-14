import React from "react";

import Header from "../../Header/Header";
import Navigate from "../../Navigate/Navigate";
import { Pagination } from "antd";
import Footer from "../../Footer/Footer";
import styles from "./DefaultLayout.module.scss";

export default function DefaultLayout(props) {
  return (
    <div>
      <Header />
      <Navigate />
      <div className="center">
        <div className={styles.wrapper}>{props.children}</div>

        <hr />
        <Footer
          span={"ООО 'Сервисы размещения объявлений'"}
          links={["Пользовательское соглашение", "Правила рекомендаций"]}
          authorOfProgect={"python41"}
        />
      </div>
    </div>
  );
}
