import { FileOutlined, FileImageOutlined, FileZipOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export default function ShowFiles({
  lists, 
  admin,
  onView,
  onDelete
}) {
  const [isPass, setIsPass] = useState(true);
  const [isPending, setIsPending] = useState(true);

  function onClick() {
    setIsPending(false);
    setIsPass(false);
  }

  function onPass() {
    setIsPending(false);
    setIsPass(true);
  }
  function onReset() {
    setIsPending(true);
  }

  function onCheck(e) {
    const target = e.target;
    console.log(target.dataset['id'], target.checked)
  }
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
                <DisplayType dataId={params.file} className='checked-item' file={list.name} {...{onView}}/>
              </div>
              <div className='upload-info'>
                <span className='uploader'>上传人：{params.uploader}</span>
                <span className='upload-time'>上传时间：{`${dateString} ${timeString}`}</span>
              </div>
              <span className={`approval-status approval-status-${isPending ? 'pending' :  isPass ? 'pass' : 'not-pass'}`}>{isPending ? '待审核' : isPass ? '已通过': '未通过'}</span>
              <span className='delete' data-id={params.file} onClick={onDelete}>删除</span>
            </div>
          );
        })
      }
      {admin && <div>
        {/* <Button type='primary'  {...{onClick}}>不通过</Button>
        <Button type='primary' onClick={onPass}>通过</Button>
        <Button type='primary' onClick={onReset}>重置</Button> */}
      </div>}
    </div>
  );
}

const reg = {
  image: /.[jpg|png|jpeg|gif]$/,
  file: /.zip$/,

}

function DisplayType({file, dataId, className, onView}) {
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
      <span data-id={dataId} onClick={onView}>{file}</span>
    </div>
  )
} 
