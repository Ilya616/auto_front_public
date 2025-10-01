import React, { useState } from "react";
import { Select, Space } from "antd";

export default function CategorySelect() {
  const [content, setContent] = useState("");
  return (
    <>
      <input type="text" placeholder="Кузов" />
    </>
  );
}
