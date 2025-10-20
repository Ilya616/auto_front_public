import React from "react";
import styles from "./CreateCardLayout.module.scss";
import Button from "../../UI/Components/Button/Button";
import { Link } from "react-router";
import logo from "../../../../public/2.svg";
import Footer from "../../Footer/Footer";

export default function CreateCardLayout(props) {
  return (
    <div className={styles.main}>
      <div className={styles.navigate}>
        <div className={styles.logo}>
          <img src={logo} alt="logotip" className={styles.logo__img} />
        </div>
        <div className={styles.btn}>
          <Link to="/lk">Закрыть</Link>
        </div>
      </div>
      <div className={styles.content}>{props.children}</div>
      <Footer
        span={"ООО 'Сервисы размещения объявлений'"}
        links={["Пользовательское соглашение", "Правила рекомендаций"]}
        authorOfProgect={"python41"}
      />
    </div>
  );
}
