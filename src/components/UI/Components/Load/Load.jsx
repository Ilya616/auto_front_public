import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

import { useSelector, useDispatch } from "react-redux";
import { changeDataPhoto } from "../../../../store/createCard";
import { request } from "../../../Libs/request";
let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function Load() {
  function onChange(evt) {
    request({
      method: "POST",
      url: VITE_BACK_API + "/download",
      data: evt.file,
      headers: { "Content-Type": "multipart/form-data" },
      callback: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  return (
    <Dragger onChange={onChange}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
}
