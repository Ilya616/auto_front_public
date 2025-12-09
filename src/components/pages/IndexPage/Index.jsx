import React, { memo, useCallback, useEffect, useState } from "react";
import IndexLayout from "../../Layouts/IndexLayout/IndexLayout";
import CarCard from "@uiComponents/CarCard/CarCard";
import OnlineChat from "@uiComponents/OnlineChat/OnlineChat";
import { request } from "../../Libs/request";
import { SettingOutlined, RollbackOutlined } from "@ant-design/icons";
import { Flex, Spin } from "antd";
import { setUser } from "../../../store/userMake";
import { CARS } from "../../Libs/Cars";
import { useDispatch } from "react-redux";
import { deleteDataPhoto } from "../../../store/createCard";
import SellerChat from "../../UI/Components/SellerChat/SellerChat";
import { useLazyQuery } from '@apollo/client/react';
import { GET_ROLES, GET_USER } from "../../../graphql/queries";
import SellerChatButton from "../../UI/Components/SellerChat/SellerChatButton";
let VITE_BACK_API = import.meta.env.VITE_BACK_API;

function Index() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState();
  const contentStyle = {
    padding: 50,
    background: "rgba(0, 0, 0, 0.05)",
    borderRadius: 4,
  };
  const content = <div style={contentStyle} />;
  const updateList = useCallback(async (list = 1) => {
    request({
      url: VITE_BACK_API + "/graphql",
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      data: JSON.stringify({
        query: `
          query GetCards {
            cards(page: ${list}, per_page: 10){
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
              location
              mileage
              year
              availability
              images{
                image
              }
            }
          }
        `,
      }),
      callback: (response) => {
        setData(response.data.data.cards);
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
  useEffect(() => {
    dispatch(deleteDataPhoto([]));
    setLoader(true);
    updateList();
  }, []);
  return (
    <>
      <IndexLayout updateList={updateList} cars={data}>
        {!loader ? (
          <>
            {data != undefined
              ? data.map((element, index) => (
                  <CarCard
                    id={element.id}
                    key={index}
                    dataPath={element.images}
                    model={element.model}
                    mark={element.mark}
                    age={element.year}
                    text={element.availability}
                    price={element.price}
                    description={[element.color.title]}
                    specifications={[
                      element.modification.title,
                      element.engine.type,
                      element.drive.drive + " привод",
                    ]}
                    category={[
                      element.bodywork.bodywork,
                      element.transmission.transmission,
                    ]}
                    feature={null}
                    sign={element.sign}
                    location={element.location}
                    user={element.user}
                    mileage={element.mileage}
                  />
                ))
              : ""}
          </>
        ) : (
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

export default memo(Index);
