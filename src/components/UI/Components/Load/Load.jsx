import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { changeDataPhoto } from "../../../../store/createCard";

export default function Load() {
  const count = useSelector((state) => state.createCard.value);

  const dispatch = useDispatch();
  const { Dragger } = Upload;
  const props = {
    name: "file",
    multiple: true,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        // dispatch(changeDataPhoto());
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
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
