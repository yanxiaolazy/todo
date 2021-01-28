// import { useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions as editProjectActions } from "../../EditProject";
import { actions as moduleItemActions } from "../../ModuleItem";
import { actions as fileModuleActions } from "../../FileModule";
import { actions as textModuleActions } from "../../TextModule";
import ViewFile from "../../ViewFile";
import { viewProjectApi } from "../../utils/api";
import './style.css';
import { Select } from "antd";

const resolveViewProject = (fn) => {
  return response => {
    if (typeof fn !== 'function') return;
    fn(response);
  }
}
const rejectViewProject = () => {};

export default function ViewProject() {
  const [projectData, setProjectData] = useState(null),
        [allValues, setAllValues] = useState(null),
        [modalOpen, setModalOpen] = useState(false),
        [filename, setFilename] = useState(''),
        match = useRouteMatch(),
        history = useHistory(), 
        dispatch = useDispatch();

  useEffect(() => {
    //eslint-next
    const params = {id: match.params.projectId};
    viewProjectApi({params})()(resolveViewProject(setProjectData), rejectViewProject);
  }, [match]);

  useEffect(() => {
    if (projectData) {
      const parseData = JSON.parse(projectData.params.project);
      setAllValues(parseData);
    }
  }, [projectData]);

  if (!allValues) {
    return(<div></div>);
  }

  const prefix = 'view-project';
  const {project, moduleItem, fileModule, textModule} = allValues;
  let modules;

  function handleEditClick() {
    dispatch(editProjectActions.init(project));
    dispatch(moduleItemActions.init(moduleItem));
    dispatch(fileModuleActions.init(fileModule));
    dispatch(textModuleActions.init(textModule));
    history.push(`/view/${match.params.projectId}/edit`)
  }

  function handleModalOpen(e) {
    setModalOpen(prev => !prev);
    setFilename(e.target.dataset.filename)
  }
  function onCheck(moduleId, id, type) {

    return value =>{
      let status = '待审核'
      if (value === 'completed') {
        status = '已通过';
      } else {
        status = '未通过';
      }
      if (type === 'text') {
        dispatch(textModuleActions.changeTodoStatus(moduleId, id, status));
      } else {
        dispatch(fileModuleActions.changeTodoStatus(moduleId, id, status));
      }
    }
  }
  const isPass = true, admin = true;

  if (project) {
    modules = project.modules.map(m => {
      const item = moduleItem.filter(f => f.moduleId === m.moduleId)[0];
      const file = fileModule.filter(f => f.moduleId === m.moduleId)[0];
      const text = textModule.filter(f => f.moduleId === m.moduleId)[0];

      return(
        <div key={m.moduleId} className={`${prefix}-module`}>
          <h3 className={`${prefix}-module-title`}>{item.moduleTitle}</h3>
          {
            file?.fileList.map((list, index) => {
              const {response: {params}} = list;
              const time = new Date(parseInt(params.uploadTime)),
              timeString = time.toLocaleTimeString(),
              dateString = time.toLocaleDateString();
              const status = params.todoStatus === 'pending' ? '待审核' : isPass ? '已通过': '未通过';
              return(
                <div key={index} className={`${prefix}-module-file`}>
                  <div>
                    <span onClick={handleModalOpen} data-filename={params.file}>{params.file}</span>
                  </div>
                  <span className='uploader'>上传人：{params.uploader}</span>
                  <span className='upload-time'>上传时间：{`${dateString} ${timeString}`}</span>
                  <span className={`approval-status approval-status-${params.todoStatus === 'pending' ? 'pending' :  isPass ? 'pass' : 'not-pass'}`}>{status}</span>
                  {admin && 
                    <span>
                      <Select 
                        data-moduleId={m.moduleId} 
                        data-type={params.file} 
                        placeholder='审核' 
                        showArrow={false} 
                        style={{width: 100}}
                        onSelect={onCheck(m.moduleId, params.file, 'file')}
                      >
                        <Select.Option value='completed'>通过</Select.Option>
                        <Select.Option value='incompleted'>不通过</Select.Option>
                      </Select>
                    </span>
                  }
                </div>
              );
            })
          }
          <div className={`${prefix}-module-text`}>
            {
              text?.textList.map((list, index) => {
                const time = new Date(parseInt(list.lastTime)),
                timeString = time.toLocaleTimeString(),
                dateString = time.toLocaleDateString();
                const status = list.todoStatus === 'pending' ? '待审核' : isPass ? '已通过': '未通过';
                return(
                  <React.Fragment key={index}>
                    {/* <input type='checkbox' data-moduleId={m.moduleId} data-type={list.id} onClick={onCheck}/> */}
                    <div dangerouslySetInnerHTML={{__html: list.text}}/>
                    <div className='upload-info text-module-info'>
                      <span className='uploader'>编辑者：{list.username}</span>
                      <span className='upload-time'>最后一次更改时间：{`${dateString} ${timeString}`}</span>
                      <span className={`approval-status approval-status-${list.todoStatus === 'pending' ? 'pending' :  isPass ? 'pass' : 'not-pass'}`}>{status}</span>
                      {admin && 
                        <span>
                          <Select 
                            data-moduleId={m.moduleId} 
                            data-type={list.id} 
                            placeholder='审核' 
                            showArrow={false} 
                            style={{width: 100}}
                            onSelect={onCheck(m.moduleId, list.id, 'text')}
                          >
                            <Select.Option value='通过'>通过</Select.Option>
                            <Select.Option value='不通过'>不通过</Select.Option>
                          </Select>
                        </span>
                      }
                    </div>
                  </React.Fragment>
                )
              })
            }
          </div>
        </div>
      );
    });
  }

  return(
    <div className={`animate-bottom ${prefix}`}>
      <h2 className={`${prefix}-title`}>{project.projectTitle}</h2>
      <div className={`${prefix}-edit`}>
        <span onClick={handleEditClick}>Edit</span>
      </div>
      {modules}
      <ViewFile {...{filename}} isOpen={modalOpen} onClick={handleModalOpen}/>
    </div>
  );
}
