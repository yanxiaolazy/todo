// import { useRouteMatch } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, notification, Select, } from "antd";

import ViewFile from "../../ViewFile";
import useGetProjectData from "../../components/useGetProjectData";
import ContainerLayer from "../../components/ContainerLayer";

import { actions as fileModuleActions } from "../../FileModule";
import { actions as textModuleActions } from "../../TextModule";
import { actions as moduleItemActions } from "../../ModuleItem";
import { actions as editProjectActions } from "../../EditProject";
import { getAdmin } from "../../utils/parse";
import { updateProjectApi } from "../../utils/api";
import './style.css';

const prefix = 'view-project';

const resolve = function (dispatch, history, setSpinning) {
  return response => {
    setTimeout(() => {
      //reset 'project'
      dispatch(editProjectActions.reset());
      //reset 'moduleItem'
      dispatch(moduleItemActions.reset());
      //reset 'fileModule'
      dispatch(fileModuleActions.reset());
      //reset 'textModule'
      dispatch(textModuleActions.reset());
      setSpinning(false);
    }, 500);
    //router 跳转
    history.push('/view');
  }
}

export default function ViewProject() {
  const [modalOpen, setModalOpen] = useState(false),
        [filename, setFilename] = useState(''),
        [isAdmin] = useState(getAdmin()),
        [modules, setModules] = useState(null),
        match = useRouteMatch(),
        history = useHistory(), 
        dispatch = useDispatch(),
        {loading, project, moduleItem, fileModule, textModule} = useGetProjectData(),
        [spinning, setSpinning] = useState(false)

  const onCheck = useCallback((moduleId, id, type) => {

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
    };
  }, [dispatch]);

  useEffect(() =>{
    if (project.modules) {
      const tempModules = project.modules.map(m => {
        const item = moduleItem.filter(f => f.moduleId === m.moduleId)[0];
        const file = fileModule.filter(f => f.moduleId === m.moduleId)[0];
        const text = textModule.filter(f => f.moduleId === m.moduleId)[0];

        return(
          <div key={m.moduleId} className={`${prefix}-module`}>
            <h3 className={`${prefix}-module-title`}>{item?.moduleTitle}</h3>
            {
              file?.fileList.map((list, index) => {
                const {response: {params}} = list;
                const time = new Date(parseInt(params.uploadTime)),
                timeString = time.toLocaleTimeString(),
                dateString = time.toLocaleDateString();
                const status = params.todoStatus === 'pending' ? '待审核' : params.todoStatus === '已通过' ? '已通过': '未通过';
                return(
                  <div key={index} className={`${prefix}-module-file`}>
                    <div className={`${prefix}-image`}>
                      <span onClick={handleModalOpen} data-filename={params.file}>{params.file}</span>
                    </div>
                    <span className='uploader'>上传人：{params.uploader}</span>
                    <span className='upload-time'>上传时间：{`${dateString} ${timeString}`}</span>
                    <span className={`approval-status approval-status-${params.todoStatus === 'pending' ? 'pending' : params.todoStatus === '已通过'  ? 'pass' : 'not-pass'}`}>{status}</span>
                    {isAdmin && 
                      <span>
                        <Select 
                          placeholder='审核' 
                          showArrow={false} 
                          style={{width: 100}}
                          onSelect={onCheck(m.moduleId, params.file, 'file')}
                          value={params.todoStatus === '已通过' ? 'completed' : params.todoStatus === '未通过' ? '未通过' : ''}
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
            {text?.textList && <div className={`${prefix}-module-text`}>
              {
                text.textList.map((list, index) => {
                  const time = new Date(parseInt(list.lastTime)),
                  timeString = time.toLocaleTimeString(),
                  dateString = time.toLocaleDateString();
                  const status = list.todoStatus === 'pending' ? '待审核' : list.todoStatus === '已通过' ? '已通过': '未通过';
                  return(
                    <React.Fragment key={index}>
                      <div dangerouslySetInnerHTML={{__html: list.text}}/>
                      <div className='upload-info text-module-info'>
                        <span className='uploader'>编辑者：{list.username}</span>
                        <span className='upload-time'>最后一次更改时间：{`${dateString} ${timeString}`}</span>
                        <span className={`approval-status approval-status-${list.todoStatus === 'pending' ? 'pending' :  list.todoStatus === '已通过' ? 'pass' : 'not-pass'}`}>{status}</span>
                        {isAdmin && 
                          <span>
                            <Select 
                              placeholder='审核' 
                              showArrow={false} 
                              style={{width: 100}}
                              onSelect={onCheck(m.moduleId, list.id, 'text')}
                              value={list.todoStatus === '已通过' ? 'completed' : list.todoStatus === '未通过' ? '未通过' : ''}
                            >
                              <Select.Option value='completed'>通过</Select.Option>
                              <Select.Option value='incompleted'>不通过</Select.Option>
                            </Select>
                          </span>
                        }
                      </div>
                    </React.Fragment>
                  )
                })
              }
            </div>}
          </div>
        );
      });
      setModules(tempModules);
    }
  }, [project, moduleItem, fileModule, textModule, isAdmin, onCheck]);

  function handleEditClick() {
    history.push(`/view/${match.params.projectId}/edit`)
  }

  function handleModalOpen(e) {
    setModalOpen(prev => !prev);
    setFilename(e?.target.dataset.filename);
  }

  function onUpdate() {
    const editProject ={
      projectTitle: project.projectTitle,
      moduleId: project.moduleId,
      project,
      moduleItem,
      fileModule,
      textModule
    };

    const params = {};
    if (match.params.projectId) {
      params.id = match.params.projectId;
      setSpinning(true);
      updateProjectApi({params})({data: {...editProject}})(resolve(dispatch, history, setSpinning));
    } else {
      notification.warning({message: '提交错误', placement: 'topLeft'});
    }
  }

  return(
    <ContainerLayer 
      className={prefix}
      title='View Project'
      h1Content='View'
      {...{loading, spinning}}
    >
      <h2 className={`${prefix}-title`}>{project.projectTitle}</h2>
      <div className={`${prefix}-edit`}>
        <span onClick={handleEditClick}>Edit</span>
      </div>
      {isAdmin && <div className={`${prefix}-publish`}>
        <Button type='primary' htmlType='button' onClick={onUpdate}>update</Button>  
      </div>}
      {modules}
      {isAdmin && <div className={`${prefix}-publish`}>
        <Button type='primary' htmlType='button' onClick={onUpdate}>update</Button>  
      </div>}
      <ViewFile {...{filename}} isOpen={modalOpen} onClose={handleModalOpen}/>
    </ContainerLayer>
  );
}
