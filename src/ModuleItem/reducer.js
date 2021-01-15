import * as actionTypes from "./actionTypes";

function addList(state, action, module) {
  // 之所以这里是个`?.`操作符，是因为，如果先添加标题会先生成一个`moduleId` 此时为`undefined`
  const temp = state?.concat() || [];
  let isNew = true;

  temp.forEach(f => {
    if (f.id === action.id) {
      f.list = action[module];
      isNew = false;
    }
  });

  if (isNew) {
    temp.push({id: action.id, list: action[module]});
  }

  return temp;
}

function addModule(state, action) {
  const temp = state.concat();
  const keys = Object.keys(action)
              .filter(f => f !== 'type')
              .filter(f => f !== 'moduleId')
              .filter(f => f !== 'id');

  let isNew = true;

  temp.forEach(f => {
    if (f.moduleId === action.moduleId) {
      f[keys[0]] = addList(f[keys[0]], action, keys[0]);
      isNew = false;
    }
  });

  if (isNew) {
    temp.push({
      moduleId: action.moduleId, 
      [keys[0]]: new Array({
        id: action.id, 
        list: action[keys[0]]
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
export default function reducer(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_FILE_MODULE:
      return addModule(state, action)
    case actionTypes.ADD_TEXT_MODULE:
      return addModule(state, action)
    case actionTypes.MODULE_TITLE:
      return addModuleTitle(state, action)
    default:
      return state
  }
}