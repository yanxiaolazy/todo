import { useEffect, useState, useRef } from "react";
import { Button, Input } from "antd";
import ModuleItem from "../../ModuleItem";
import useGetProjectData from "../../components/useGetProjectData";
import ContainerLayer from "../../components/ContainerLayer";
import './style.css';

const prefix = 'edit-project';

export default function EditProject({
  initModuleId,
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
  const {loading, project} = useGetProjectData();
  const [isEmpty, setIsEmpty] = useState(true),
        [spinning, setSpinning] = useState(false)

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

  useEffect(() => {
    if (title) {
      setProjectTitle(title);
      setIsDisplay(true);
    }
  }, [title]);

  useEffect(() => {
    if (project.projectTitle) {
      setIsEmpty(false);
    }
  }, [project])

  function handleProjectTitleChange(e) {
    setProjectTitle(e.target.value);
  }
  function handleProjectNameModify(e) {
    setIsDisplay(prev => !prev);
  }

  function handlePublish() {
    setSpinning(true);
    onPublish(stateStore, setSpinning);
  }

  function handleAddModuleClick() {
    addModuleItem(initModuleId);
  }

  return(
    <ContainerLayer 
      className={prefix}
      title='Edit Project'
      h1Content='Edit'
      {...{loading, isEmpty, spinning}}
    >
      <div className='animate-bottom'>
        <div className={`${prefix}-btns`}>
          <Button type='primary' htmlType='button' onClick={handleAddModuleClick}>Add Module</Button>
          <Button type='primary' htmlType='button' onClick={handlePublish}>publish</Button>
        </div>
        <div className={`add-title`}>
          {isDisplay ? 
          <div className={`add-title-display`}>
            <span>{title}</span>
          </div> :
          <Input 
            className={`add-title-input`} 
            name='projectTitle' 
            value={projectTitle} 
            ref={projectNameRef} 
            onChange={handleProjectTitleChange}
            placeholder='添加待办项目标题'
          />}
          <span onClick={handleProjectNameModify}>{isDisplay ? '修改' : '保存'}</span>
        </div>
        <div className={`${prefix}-add-modules`}>
          {
            moduleItems && moduleItems.map(item => {
              return (
                <ModuleItem key={item.moduleId} moduleId={item.moduleId}/>
              );
            })
          }
          <div className={`${prefix}-btns`}>
            <Button type='primary' htmlType='button' onClick={handleAddModuleClick}>Add Module</Button>
            <Button type='primary' htmlType='button' onClick={handlePublish}>publish</Button>
          </div>
        </div>
      </div>
    </ContainerLayer>
  );
}

