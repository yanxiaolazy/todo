import * as actionTypes from "./actionTypes";
import deleteModule from "../utils/deleteModule";

function addList(state, id) {
  // 之所以这里是个`?.`操作符，是因为，如果先添加标题会先生成一个`moduleId` 此时为`undefined`
  const temp = state?.concat() || [];

  temp.push({id});

  return temp;
}

function addModule(state, action) {
  const temp = state.concat();

  let isNew = true;

  temp.forEach(f => {
    if (f.moduleId === action.moduleId) {
      f.textModule = addList(f.textModule, action.id);
      isNew = false;
    }
  });

  if (isNew) {
    temp.push({
      moduleId: action.moduleId, 
      textModule: new Array({
        id: action.id, 
      })
    });
  }

  return temp;
}

function addModuleTitle(state, action) {
  const temp = state.concat();
  let isNew = true;

  temp.forEach(f => {
    if (f.moduleId === action.moduleId) {
      f.moduleTitle = action.moduleTitle;
      isNew = false;
    }
  })

  if (isNew) {
    temp.push({moduleId: action.moduleId, moduleTitle: action.moduleTitle});
  }

  return temp;
}

function deleteTextModule(state, action) {
  const temp = state.concat();

  temp.forEach(f => {
    if (f.moduleId === action.moduleId) {
      f.textModule = f.textModule.filter(text => text.id !== action.id);
    }
  });

  return temp;
}

function recordId(state, action) {
  const temp = state.concat();
  let isNew = true;

  temp.forEach(f => {
    if (f.moduleId === action.moduleId) {
      f.id = action.id;
      isNew = false;
    }
  });

  if (isNew) {
    temp.push({moduleId: action.moduleId, id: action.id});
  }
  return temp;
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_TEXT_MODULE:
      return addModule(state, action)
    case actionTypes.MODULE_TITLE:
      return addModuleTitle(state, action)
    case actionTypes.RESET:
      return []
    case actionTypes.DELETE_TEXT_MODULE:
      return deleteTextModule(state, action)
    case actionTypes.INIT:
      return action.init
    case actionTypes.RECORD_ID:
      return recordId(state, action)
    case actionTypes.DELETE_MODULE:
      return deleteModule(state, action)
    default:
      return state
  }
}