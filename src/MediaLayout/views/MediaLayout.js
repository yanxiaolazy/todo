import { useEffect, useState } from "react";
import { Image } from "antd";
import { FileOutlined } from "@ant-design/icons";

import MediaTable from "../../components/MediaTable";
import ContainerLayer from "../../components/ContainerLayer";
import { viewAllMediaApi, viewFileApi } from "../../utils/api";

import './style.css';

const prefix = 'media-layout';

function viewImage(file, setFileURL) {
  return response => {
    setFileURL(prev => {
      const temp = prev.concat();
      temp.push({[`${file}`]: `data:image/png;base64,${btoa(new Uint8Array(response).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`});
      return temp;
    });
  }
}

function downloadFile(file, setFileURL) {
  return response => {
    const blob = new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    const URL = window.URL.createObjectURL(blob);
    setFileURL(prev => {
      const temp = prev.concat();
      temp.push({[`${file}`]: URL});
      return temp;
    });
    window.URL.revokeObjectURL(blob);
  }
}

export default function MediaLayout() {
  const [spinning, setSpinning] = useState(false),
        [loading, setLoading] = useState(true),
        [results, setResults] = useState(null),
        [fileUrl, setFileURL] = useState([]),
        [deleteFlag, setDeleteFlag] = useState(false),
        [total, setTotal] = useState(0),
        [current, setCurrent] = useState(1),
        [isEmpty, setIsEmpty] = useState(true)

  useEffect(() => {
    viewAllMediaApi()()(viewAllMediaResolve, viewAllMediaReject);
  }, [deleteFlag]);

  useEffect(() => {
    if (results && initFileUrl()) {
      results.forEach(file => {
        let saveData = viewImage(file, setFileURL);

        if (!/\.(jpg|bmp|gif|ico|jpeg|png)$/.test(file)) {
          saveData = downloadFile(file, setFileURL);
        }
        viewFileApi({params: {tab: file}, responseType: 'arraybuffer'})()(saveData, () => {});      
      });
    }
  }, [results]);

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
      setResults(data);
      setTotal(total);
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

        setResults(data);
        setCurrent(page);
        setTimeout(setLoading, 500, false);
      },
      function (reject) {
        setTimeout(setLoading, 500, false);
      }
    );
  }

  function fileComonent(url, filename) {
    if (/\.(jpg|bmp|gif|ico|jpeg|png)/.test(filename)) {
      return(<Image src={url} className={`${prefix}-image`} />);
    } else {
      return(<a href={url} className={`${prefix}-file`} download={`${filename}`} target='__blank'><FileOutlined /></a>);
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
        {...{prefix, setSpinning, setDeleteFlag, total, current}} 
        onChange={pageChange}
        fileDatas={fileUrl}
        component={fileComonent} 
      />
    </ContainerLayer>
  );
}

