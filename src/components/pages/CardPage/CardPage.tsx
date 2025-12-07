import React from "react";
import styles from "./CardPage.module.scss";
import DefaultLayout from "../../Layouts/DefaultLayout/DefaultLayout";
import CardHeader from "../../CardHeader/CardHeader";

const CardPage = () => {
  return (
    <DefaultLayout>
      <CardHeader />
    </DefaultLayout>
  );
};

export default CardPage;
