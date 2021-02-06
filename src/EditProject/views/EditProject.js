import { useEffect, useState, useRef } from "react";
import { Button, Empty, Input, Skeleton } from "antd";
import ModuleItem from "../../ModuleItem";
import useGetProjectData from "../../components/useGetProjectData";
import Helmet from "../../components/Helmet";
import './style.css';

const prefix = 'edit-project';

export default function EditProject({
  isEdit,
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

  function handleProjectTitleChange(e) {
    setProjectTitle(e.target.value);
  }
  function handleProjectNameModify(e) {
    setIsDisplay(prev => !prev);
  }

  function handlePublish() {
    onPublish(stateStore);
  }

  function handleAddModuleClick() {
    addModuleItem(initModuleId);
  }
  //作为编辑组件判定
  if (isEdit && loading) {
    return(<Skeleton active round loading paragraph={{rows: 8}} className={`${prefix}-skeleton`}/>);
  }

  if (isEdit && !project.projectTitle) {
    return(<Empty className={`${prefix}`}/>);
  }

  return(
    <div className={`${prefix} animate-bottom`}>
      <Helmet title='Edit Project' />
      <h1 className='todo-title'>Edit</h1>
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
  );
}

