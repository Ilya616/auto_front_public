import React, { useEffect, useState } from "react";
import { LOCATION } from "../Libs/location";
import LocationLink from "../UI/Components/LocationLink/LocationLink";
import styles from "./Location.module.scss";
import { position } from "../Libs/position";

export default function Location() {
  let [sity, setSity] = useState();

  useEffect(() => {
    position(setSity);
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.main__nav}>
        {LOCATION.map((element) =>
          LOCATION.length > 1 ? (
            <div key={element.id}>
              <a className={styles.main__link} href="#">
                {element.title}
              </a>
              <i
                id="arrowList"
                className={"fa-solid fa-greater-than " + styles.main__icon}
              ></i>
            </div>
          ) : (
            <a href="#" key={element.id} className={styles.main__link}>
              {element.title}
            </a>
          )
        )}
      </div>

      <LocationLink>{sity}</LocationLink>
    </div>
  );
}
