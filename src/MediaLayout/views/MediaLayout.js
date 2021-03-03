import { useEffect, useState } from "react";
import { Image } from "antd";
import { FileOutlined } from "@ant-design/icons";

import MediaTable from "../../components/MediaTable";
import ContainerLayer from "../../components/ContainerLayer";

import { viewAllMediaApi, viewFileApi } from "../../utils/api";
import { baseURL } from "../../utils/config";

import './style.css';

const prefix = 'media-layout';

function viewImage(filename, setFileURL) {
  return response => {
    setFileURL(prev => {
      const temp = [...prev];
      temp.push({[`${filename}`]: `data:image/png;base64,${btoa(new Uint8Array(response).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`});
      return temp;
    });
  }
}

function downloadFile(filename, setFileURL) {
  return response => {
    const blob = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    const URL = window.URL.createObjectURL(blob);
    setFileURL(prev => {
      const temp = prev.concat();
      temp.push({[`${filename}`]: URL});
      return temp;
    });
    window.URL.revokeObjectURL(blob);
  }
}

export default function MediaLayout() {
  const [spinning, setSpinning] = useState(false),
        [loading, setLoading] = useState(true),
        [allFiles, setAllFiles] = useState(null),
        [fileUrl, setFileURL] = useState([]),
        [deleteFlag, setDeleteFlag] = useState(false),
        [fileNumber, setFileNumber] = useState(0),
        [current, setCurrent] = useState(1),
        [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    viewAllMediaApi()()(viewAllMediaResolve, viewAllMediaReject);
  }, [deleteFlag]);

  useEffect(() => {
    if (allFiles && initFileUrl()) {
      allFiles.forEach(filename => {
        let saveData = viewImage(filename, setFileURL);

        if (/\.(jpg|bmp|gif|ico|jpeg|png)$/i.test(filename)) {
          viewFileApi({params: {tab: filename}, responseType: 'arraybuffer'})()(saveData);
        } else {
          setFileURL([{[`${filename}`]: filename}]);
        }     
      });
    }
  }, [allFiles]);

  useEffect(() => {
    if (fileUrl.length != 0) {
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }
  }, [fileUrl]);

  function viewAllMediaResolve(response) {
    if (response) {
      const {params: {data, total}} = response;
      setAllFiles(data);
      setFileNumber(total);
    }
  
    setTimeout(setLoading, 500, false);
  }

  function viewAllMediaReject() {
    setTimeout(setLoading, 500, false);
  }

  function initFileUrl() {
    setFileURL([]);

    return true;
  }

  function pageChange(page, pageSize) {
    viewAllMediaApi({params: {page, pageSize}})()(
      function (response) {
        const {params: {data}} = response;

        setAllFiles(data);
        setCurrent(page);
        setTimeout(setLoading, 500, false);
      },
      function (reject) {
        setTimeout(setLoading, 500, false);
      }
    );
  }

  function fileComonent(filename, url) {
    if (/\.(jpg|bmp|gif|ico|jpeg|png)/i.test(filename)) {
      return(<Image src={url} className={`${prefix}-image`} />);
    } else {
      return(<a href={`${baseURL}/api/view/file?tab=${encodeURIComponent(filename)}`} className={`${prefix}-file`} download={`${filename}`}><FileOutlined /></a>);
    }
  }

  return(
    <ContainerLayer 
      className={prefix}
      title='Media'
      h1Content='Media'
      {...{loading, spinning, isEmpty}}
    >
      <MediaTable
        {...{prefix, setSpinning, setDeleteFlag, current}} 
        onChange={pageChange}
        fileDatas={fileUrl}
        component={fileComonent} 
        total={fileNumber}
      />
    </ContainerLayer>
  );
}

