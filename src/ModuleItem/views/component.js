import { useEffect, useState } from "react";
import { Input, Card} from "antd";
import './style.css';

function getFileBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onload = () =>resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

async function showFiles(fileList, saveFiles) {
  const files = fileList.concat();
  if (!files) return;

  let temps =  files.map(async file => {
    const {name,originFileObj, response} = file;

    if (!name || !originFileObj || !response) return;

    const imgSrc = await getFileBase64(originFileObj),
          {params} = response;

    if (!params) return null;
    const time = new Date(params.uploadTime).toLocaleDateString();
    return(
      <div key={params.uploadTime}>
        <span><a href={`./${name}`}><img width={50} src={imgSrc}/></a></span>
        <div>
          <span>上传时间：{time}</span>
          <span>上传人：{params.uploader}</span></div>
      </div>
    );
  });

  temps = await Promise.all(temps);
  saveFiles(temps);
}

export default function AddItem({
  id,
  textModules, 
  fileModule,
  onClick,
  fileList,
  onSaveModuleTitle
}) {
  const [isDisplay, setIsDisplay] = useState(false);
  const [moduleTitle, setModuleTitle] = useState(null);
  const [fileViews, setFileViews] = useState(null);

  useEffect(() => {
    if (fileList) {
      showFiles(fileList, setFileViews)
    }
  }, [fileList]);

  function handleModuleTitleChange(e) {
    setModuleTitle(e.target.value);
  }
  function handleModuleTitleModify(e) {
    setIsDisplay(prev => !prev);
    onSaveModuleTitle(moduleTitle)
  }

  return(
    <Card key='module-item' {...{id}} className='module-item animate-bottom'>
      <div className='add-title'>
        {isDisplay ? 
        <div className='add-title-display module-title'>
          <span>{moduleTitle}</span>
        </div> :
        <Input 
          className='add-title-input' 
          name='moduleTitle' 
          value={moduleTitle} 
          onChange={handleModuleTitleChange}
          placeholder='添加待办模块标题'
        />}
        <span onClick={handleModuleTitleModify}>{isDisplay ? '修改' : '保存'}</span>
      </div>
      <div className='add-module-btns' {...{onClick}}>
        <span id='add-text'>Add Text</span>
        <span id='add-file'>Add File</span>
      </div>
      <div className='module-content'>
        {/* <FileModule {...{id}}/> */}
        {fileViews?.map(file => file)}
        {fileModule}
        {textModules?.map(module => module.list)}
      </div>
    </Card>
  );
}


