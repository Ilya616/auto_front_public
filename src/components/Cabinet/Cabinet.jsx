import React, { useState } from "react";
import { request } from "../Libs/request";
let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function Cabinet() {
  let token = sessionStorage.getItem("token");
  console.log(token);

  const [input, setInput] = useState("");
  function func(evt) {
    evt.preventDefault();
    console.log(evt.target[0].value);
  }
  return (
    <form onSubmit={func}>
      <input type="text" name="input1" />

      <button>отправить</button>
    </form>
  );
}
