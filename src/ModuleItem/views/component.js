import { useState, useEffect } from "react";
import { Input, Card} from "antd";
import './style.css';
import ShowFiles from "../../ShowFiles";
import FileModule from "../../FileModule";
import TextModule from "../../TextModule";

const prefix = 'module-item';

export default function ModuleItem({
  id,
  moduleId,
  title,
  textModules, 
  onClick,
  onSaveModuleTitle
}) {
  const [isDisplay, setIsDisplay] = useState(false);
  const [moduleTitle, setModuleTitle] = useState(null);

  useEffect(() => {
    if (title) {
      setIsDisplay(true);
      setModuleTitle(title);
    }
  }, [title]);

  function handleModuleTitleChange(e) {
    setModuleTitle(e.target.value);
  }
  function handleModuleTitleModify(e) {
    setIsDisplay(prev => !prev);
    onSaveModuleTitle(moduleTitle)
  }

  function handleClick(e) {
    onClick(e, id);
  }

  return(
    <Card key='module-item' className={`${prefix} animate-bottom`}>
      <div className='add-title'>
        {isDisplay ? 
        <div className={`${prefix}-title add-title-display`}>
          <span>{title}</span>
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
      <div className={`${prefix}-add-module-btns`} onClick={handleClick}>
        <span id='add-text'>Add Text</span>
        <span id='add-file'>Add File</span>
      </div>
      <div className={`${prefix}-content`}>
        <FileModule {...{moduleId}}/>
        <ShowFiles {...{moduleId}} />
        {textModules?.map(module => (<TextModule key={module.id} {...{moduleId}} id={module.id}/>))}
      </div>
    </Card>
  );
}


