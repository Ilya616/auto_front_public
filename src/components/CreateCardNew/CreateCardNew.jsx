import React, { useEffect, useState } from "react";
import styles from "./CreateCardNew.module.scss";
import { request } from "../Libs/request";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import CreateCardMarksModel from "../CreateCardMarksModel/CreateCardMarksModel";
import { useNavigate } from "react-router";
let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function CreateCardNew() {
  const [loader, setLoader] = useState(false);
  const [auto, setAuto] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    setLoader(true);
    let token = sessionStorage.getItem("token");
    request({
      method: "GET",
      url: VITE_BACK_API + "/get-field-cars",
      headers: `Authorization: Bearer ${token}`,
      callback: (response) => {
        setAuto(response.data);
        setLoader(false);
      },
      error: (error) => {
        sessionStorage.removeItem("token");
        navigate(`/auth-new`);
        console.log(error);
      },
    });
  }, []);

  return (
    <>
      {loader ? (
        <div className={styles.loader}>
          <Flex align="center" gap="middle">
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
            />
          </Flex>
        </div>
      ) : (
        <CreateCardMarksModel marks={auto} />
      )}
    </>
  );
}
