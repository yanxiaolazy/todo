import { useEffect, useState, useRef } from "react";
import { Button, Input } from "antd";
import './style.css';
import ModuleItem from "../../ModuleItem";

export default function EditProject({
  moduleItems,
  title,
  addModuleItem,
  onAddProjectTitle,
  onPublish,
  stateStore
}) {
  const [projectTitle, setProjectTitle] = useState(null);
  const [isDisplay, setIsDisplay] = useState(false);
  const projectNameRef = useRef(null);

  useEffect(() => {
    if (projectNameRef?.current) {
      const input = projectNameRef.current;
      input.focus();
    }
  }, []);

  useEffect(() =>{
    if (isDisplay) {
      onAddProjectTitle(projectTitle);
    }
  }, [isDisplay, projectTitle, onAddProjectTitle]);

  function handleProjectTitleChange(e) {
    setProjectTitle(e.target.value);
  }
  function handleProjectNameModify(e) {
    setIsDisplay(prev => !prev);
  }

  function handlePublish() {
    onPublish(stateStore);
  }
  
  return(
    <div className='edit-project animate-bottom'>
      <Button type='primary' htmlType='button' onClick={addModuleItem}>Add Module</Button>
      <div className='add-title'>
        {isDisplay ? 
        <div className='add-title-display'>
          <span>{title}</span>
        </div> :
        <Input 
          className='add-title-input' 
          name='projectTitle' 
          value={projectTitle} 
          ref={projectNameRef} 
          onChange={handleProjectTitleChange}
          placeholder='添加待办项目标题'
        />}
        <span onClick={handleProjectNameModify}>{isDisplay ? '修改' : '保存'}</span>
      </div>
      <div className='add-modules'>
        {
          moduleItems && moduleItems.map(item => {
            return (
              <ModuleItem key={item.moduleId} moduleId={item.moduleId}/>
            );
          })
        }
        <div className='edit-project-btns'>
          <Button type='primary' htmlType='button' onClick={handlePublish}>publish</Button>
          <Button type='primary' htmlType='button' onClick={addModuleItem}>Add Module</Button>
        </div>
      </div>
    </div>
  );
}

