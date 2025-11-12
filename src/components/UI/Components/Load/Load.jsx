import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const { Dragger } = Upload;

import { useSelector, useDispatch } from "react-redux";
import { changeDataPhoto, deleteDataPhoto } from "../../../../store/createCard";
import { request } from "../../../Libs/request";
let VITE_BACK_API = import.meta.env.VITE_BACK_API;

export default function Load() {
  const data = useSelector((state) => state.createCard.value.photo);
  const dispatch = useDispatch();
  const props = {
    name: "file",
    multiple: true,
    action: VITE_BACK_API + "/download",
    onChange(info) {
      const { status } = info.file;
      console.log(info.file.status);
      if (status !== "uploading") {
        // console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        dispatch(changeDataPhoto(info.file.response));
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
      if (info.file.status == "removed") {
        let dataArray = data.filter((path) => path != info.file.response);

        dispatch(deleteDataPhoto(dataArray));
        request({
          method: "post",
          url: VITE_BACK_API + "/unload",
          data: { path: info.file.response },
          callback: (response) => {
            console.log(response);
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Выберите или перетащите фото</p>
    </Dragger>
  );
}
