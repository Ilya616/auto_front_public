import React from "react";

export default function Prewiev(props) {
  return (
    <>
      <a href={props.link}>
        <img src={props.img} alt="" />
      </a>
    </>
  );
}
