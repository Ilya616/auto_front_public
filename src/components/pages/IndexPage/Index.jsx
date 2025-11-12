import React, { useEffect, useState } from "react";
import IndexLayout from "../../Layouts/IndexLayout/IndexLayout";
import CarCard from "@uiComponents/CarCard/CarCard";
import { request } from "../../Libs/request";
import { SettingOutlined, RollbackOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { setUser } from "../../../store/userMake";
import { CARS } from "../../Libs/Cars";
import { useDispatch } from "react-redux";
import { deleteDataPhoto } from "../../../store/createCard";
let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function Index() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState([]);
  const contentStyle = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };
  const content = <div style={contentStyle} />;
  useEffect(() => {
    dispatch(deleteDataPhoto([]));
    request({
      url: VITE_BACK_API + "/get-card",
      method: "get",
      callback: (response) => {
        setData(response.data.data);
        console.log(response.data.data);
        setLoader(false);
      },
      error: (error) => {
        console.log(error);
      },
    });
    if (sessionStorage.getItem("token")) {
      request({
        method: "POST",
        url: VITE_BACK_API + "/check-user",
        data: { token: sessionStorage.getItem("token") },
        callback: (response) => {
          dispatch(setUser(response.data));
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }, []);
  return (
    <>
      <IndexLayout cars={CARS}>
        {!loader ? (
          <>
            {data.map((element) => (
              <CarCard
                key={element.id}
                dataPath={element.dataImg}
                model={element.modelName}
                age={element.modelAge}
                text={element.availability}
                price={element.price}
                description={element.description}
                specifications={element.specifications}
                category={element.category}
                feature={null}
                sign={element.sign}
                location={element.location}
                user={element.user}
              />
            ))}
          </>
        ) : (
          //           CARS.map((element) => (
          //   <CarCard
          //     key={element.id}
          //     dataPath={element.dataImg}
          //     model={element.modelName}
          //     age={element.modelAge}
          //     text={element.text}
          //     price={element.price}
          //     description={element.description}
          //     specifications={element.specifications}
          //     category={element.category}
          //     feature={element.feature}
          //     sign={element.sign}
          //     location={element.location}
          //   />
          // ))

          <>
            <Flex gap="middle">
              <Spin tip="Loading" size="large">
                {content}
              </Spin>
            </Flex>
          </>
        )}
      </IndexLayout>
    </>
  );
}
