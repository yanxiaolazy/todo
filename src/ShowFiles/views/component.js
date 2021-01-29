import { FileOutlined, FileImageOutlined, FileZipOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export default function ShowFiles({
  lists, 
  onDelete
}) {
  return(
    <div className='show-module'>
      {
        lists?.map(list => {
          const {response} = list;
          if (!response) return [];
          const {params} = response;
          if (!params) return []; 
          const time = new Date(parseInt(params.uploadTime)),
                timeString = time.toLocaleTimeString(),
                dateString = time.toLocaleDateString();
          return(
            <div className='show-module-container' key={list.uid}>
              <div className='checked'>
                <DisplayType dataId={params.file} className='checked-item' file={list.name}/>
              </div>
              <div className='upload-info'>
                <span className='uploader'>上传人：{params.uploader}</span>
                <span className='upload-time'>上传时间：{`${dateString} ${timeString}`}</span>
              </div>
              <span className={`approval-status approval-status-${params.todoStatus === 'pending' ? 'pending' :  params.todoStatus === '已通过' ? 'pass' : 'not-pass'}`}>{params.todoStatus === 'pending' ? '待审核' : params.todoStatus === '已通过' ? '已通过': '未通过'}</span>
              <span className='delete' data-id={params.file} onClick={onDelete}>删除</span>
            </div>
          );
        })
      }
    </div>
  );
}

const reg = {
  image: /.[jpg|png|jpeg|gif]$/,
  file: /.zip$/,

}

function DisplayType({file, dataId, className}) {
  const [type, setType] = useState(null);

  useEffect(() => {
    if (reg.image.test(file)) {
      setType(<FileImageOutlined />);
    } else if (reg.file.test(file)) {
      setType(<FileZipOutlined />);
    } else {
      setType(<FileOutlined />);
    }
  }, [file]);

  return (
    <div {...{className}}>
      {type}
      <span data-id={dataId}>{file}</span>
    </div>
  )
} 
