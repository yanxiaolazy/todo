import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { Spin } from "antd";

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
const modalRoot = document.body;


export default function ViewFile({filename, isOpen, onClose}) {
  const [fileBase64, setFileBase64] = useState(null),
        // [fileUrl, setFileURL] = useState(''),
        [fileSrc, setFileSrc] = useState(null),
        modalRef = useRef(),
        [spinning, setSpinning] = useState(true);

  useEffect(() => {
    if (filename) {
      const params = {
        tab: filename
      };
      let saveData = viewImage(setFileBase64);

      if (/\.(jpg|bmp|gif|ico|jpeg|png)$/i.test(filename)) {
        viewFileApi({params, responseType: 'arraybuffer'})()(saveData);
      }
    }
  }, [filename]);

  useEffect(() => {
    if (fileBase64 && /\.(jpg|bmp|gif|ico|jpeg|png)$/i.test(filename)) {
      setFileSrc(<div className={`${prefix}-image`}><img src={`${fileBase64}`} alt=''/></div>);
    } else {
      setFileSrc(<div className={`${prefix}-file`} ><a href={`http://localhost:5000/api/view/file?tab=${encodeURIComponent(filename)}`} download={`${filename}`} >下载 {filename}</a></div>);
    } 
  }, [fileBase64, filename]);

  useEffect(() => {
    if (modalRef.current) {
      window.addEventListener('click', handleMask);
    }
  }, [modalRef]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(setSpinning, 500, false);
    }
  }, [isOpen]);

  function handleMask(e) {
    const target = e.target;

    if (target.id == 'mask' || target.id == 'close') {
      onClose();
      setSpinning(true);
    }
  }
  
  return ReactDOM.createPortal(
    <div ref={modalRef} id='mask' className={`${prefix}`} style={{display: isOpen ? 'flex' : 'none'}} >
      <Spin {...{spinning}} />
      {!spinning && <>
        <div className={`${prefix}-tools`}>
          <span id='close'>X</span>
        </div>
        {fileSrc}
      </>}
    </div>,
    modalRoot
  );
}