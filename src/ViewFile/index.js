import { Modal } from "antd";
import { useState, useEffect } from "react";
import { viewFileApi } from "../utils/api";
import "./style.css";

function viewImage(setFileBase64) {
  return response => {
    setFileBase64(`data:image/png;base64,${btoa(new Uint8Array(response).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`);
  }
}

function downloadFile(setFileURL) {
  return response => {
    const blob = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    const URL = window.URL.createObjectURL(blob);
    setFileURL(URL);
    window.URL.revokeObjectURL(blob);
  }
}

const prefix = 'view-file';

export default function ViewFile({filename, isOpen, onClick}) {
  const [fileBase64, setFileBase64] = useState(null),
        [fileUrl, setFileURL] = useState(''),
        [styleWidth, setStyleWidth] = useState(520),
        [fileSrc, setFileSrc] = useState(null)

  useEffect(() => {
    if (filename) {
      const params = {
        tab: filename
      };
      let saveData = viewImage(setFileBase64);

      if (!/\.(jpg|bmp|gif|ico|jpeg|png)$/.test(filename)) {
        saveData = downloadFile(setFileURL);
      }
      viewFileApi({params, responseType: 'arraybuffer'})()(saveData, () => {});
    }
  }, [filename]);

  useEffect(() => {
    if (fileBase64 && /\.(jpg|bmp|gif|ico|jpeg|png)$/.test(filename)) {
      setFileSrc(<div className={`${prefix}-image`}><img src={`${fileBase64}`} alt=''/></div>);
      setStyleWidth(900);
    } else if (fileUrl) {
      setFileSrc(<div className={`${prefix}-file`}><a href={fileUrl} download={`${filename}`} target='__blank'>下载 {filename}</a></div>);
      setStyleWidth(520);
    } else {
      setFileSrc(<div><h3>不支持的格式</h3></div>);
      setStyleWidth(520);
    }
  }, [fileBase64, filename, fileUrl]);

  return(
    <Modal 
      className={`${prefix} ${prefix}-${styleWidth}`}
      visible={isOpen}
      onOk={onClick}
      maskClosable
      onCancel={onClick}
    >
      {fileSrc}
    </Modal>
  );
}