import { Pagination } from "antd";

import { deleteFileApi } from "../utils/api";

const deleteFileResolve = (setDeleteFlag, setSpinning) => response => {
  if (response.code == 200) {
    setDeleteFlag(prev => !prev);
  }
  setTimeout(setSpinning, 500, false);
}

const deleteFileReject = setSpinning => () => {
  setTimeout(setSpinning, 500, false);
}

function MediaView({
  prefix,
  fileDatas,
  setSpinning,
  setDeleteFlag,
  component
}) {

  function onDelete(filename) {
    return () => {
      setSpinning(true);
      deleteFileApi({params: {tab: filename}})()(deleteFileResolve(setDeleteFlag, setSpinning), deleteFileReject(setSpinning));
    }
  }

  return(
    <div className={`${prefix}-media-view-layout`}>
      <ul className={`${prefix}-titles`}>
        <li>File</li>
        <li>Filename</li>
      </ul>
      {
        fileDatas.map((file, index) => {
          const entries = Object.entries(file)[0];

          return(
            <div className={`${prefix}-media-view`} key={index}>
              <div className={`${prefix}-media-view-item`}>{component(entries[1], entries[0])}</div>
              <span>{entries[0]}</span>
              <span onClick={onDelete(entries[0])} className={`${prefix}-media-view-delete`}>Delete</span>
            </div>
          );
        })
      }
    </div>
  );
}

export default function MediaTable({
  prefix,
  total,
  current,
  fileDatas,
  setSpinning,
  setDeleteFlag,
  component,
  onChange
}) {
  return(
    <div className={`${prefix}-items`}>
      <MediaView
        {...{
          prefix, 
          setSpinning, 
          setDeleteFlag, 
          fileDatas, 
          component
        }} 
      />
      <Pagination
        defaultCurrent={1}
        defaultPageSize={20}
        showSizeChanger={false}
        showQuickJumper
        hideOnSingPage
        {...{total, current, onChange}}
      />
    </div>
  );
}
