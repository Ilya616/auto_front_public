import React, { useEffect, useState } from "react";
import styles from "./ListBrend.module.scss";
import Brend from "../UI/Components/Brend/Brend";
import logo from "/Brends/audi.webp";
import { BRENDS } from "../Libs/brends";
import {request} from "../Libs/request";

let VITE_BACK_API = import.meta.env.VITE_BACK_API;


export default function ListBrend() {

  let [marks , setmarks] = useState([])
  useEffect(()=>{
    request({
      method: "get",
      url: VITE_BACK_API + "/marks",
      callback: (response) => {
        setmarks(response.data.data);
      },
    });
  },[]);
  


  return (
    <div className={styles.brends}>

      {marks.map((element) => (
        <Brend
          key={element.id}
          img={element.img}
          title={element.name}
          length="1"
        />
      ))}


      {BRENDS.map((element) => (
        <Brend
          key={element.id}
          img={element.img}
          title={element.title}
          length={element.length}
        />
      ))}
      <div className={styles.btn}>
        <a className={styles.btn__link} href="#">
          Все марки
        </a>
      </div>
    </div>
  );
}
