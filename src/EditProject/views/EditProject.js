import { Button, Input } from "antd";
import { useEffect, useState, useRef } from "react";
import './style.css';

export default function AddProject({
  moduleItems,
  addModuleItem,
  onAddProjectTitle,
  onPublish
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

  return(
    <div className='add-project'>
      <Button type='primary' htmlType='button' onClick={addModuleItem}>Add Module</Button>
      <div className='add-title'>
        {isDisplay ? 
        <div className='add-title-display'>
          <span>{projectTitle}</span>
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
            return (item.moduleItem);
          })
        }
        <div>
          <Button type='primary' htmlType='button' onClick={onPublish}>publish</Button>
        </div>
      </div>
    </div>
  );
}

