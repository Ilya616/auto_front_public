import React, { useEffect, useLayoutEffect, useRef } from "react";
import styles from "./ModalInfo.module.scss";
import { createPortal } from "react-dom";

export default function ModalInfo(props) {
  let dialogEl = useRef();
  useLayoutEffect(() => {
    if (props.open) {
      dialogEl.current.showModal();
    } else {
      dialogEl.current.close();
    }
  }, [props.open]);
  return (
    <dialog ref={dialogEl} className={styles.dialog}>
      {props.children}
    </dialog>
  );
}
