import * as actionTypes from "./actionTypes";

function addText(state, action) {
  const temp = state.concat();
  let isNew = true;
  const payload = action.payload;

  temp.forEach(f => {
    if (f.id === action.id) {
      f.text = payload.text;
      f.username = payload.username;
      f.lastTime = payload.lastTime;
      f.todoStatus = payload.todoStatus;
      isNew = false;
    }
  });

  if (isNew) {
    temp.push({...{payload}, id: action.id});
  }

  return temp;
}

function addTextModule(state, action) {
  const temp = state.concat();
  let isNew = true;

  temp.forEach(f => {
    if (f.moduleId === action.moduleId) {
      f.textList = addText(f.textList, action);
      isNew = false;
    }
  });

  if (isNew) {
    temp.push({
      moduleId: action.moduleId, 
      textList: [{
        text:action.text,
        id: action.id
      }]
    });
  }

  return temp;
}

function update(state, action) {
  const temp = state.concat();
  let isNew = true;
  const keys = Object.keys(action).filter(f => f !== 'type').filter(f => f !== 'moduleId')

  temp.forEach(f => {
    if (f.id === action.id) {
      keys.forEach(key => f[key] = action[key]);
      isNew = false;
    }
  });

  if (isNew) {
    temp.push({username:action.username, lastTime: action.lastTime, id: action.id});
  }

  return temp;
}

function addInfo(state, action) {
  const temp = state.concat();
  let isNew = true;

  temp.forEach(f => {
    if (f.moduleId === action.moduleId) {
      f.textList = update(f.textList, action);
      isNew = false;
    }
  });

  if (isNew) {
    temp.push({
      moduleId: action.moduleId,
      textList: [{
        id: action.id,
        username: action.username,
        lastTime: action.lastTime
      }]
    })
  }
  return temp;
}

function deleteText(state, action) {
  const temp = state.concat();
  
  temp.forEach(f => {
    if (f.moduleId === action.moduleId) {
      f.textList = f.textList.filter(text => text.id !== action.id)
    }
  });

  return temp;
}

function addStatus(state, action) {
  const temp = state.concat();

  temp.forEach(f => {
    if (f.moduleId === action.moduleId) {

    }
  });

  return temp;
}

function changeTodoStatus(state, action) {
  const temp = state.concat();

  temp.forEach(f => {
    if (f.moduleId === action.moduleId) {
      f.textList.map(m => {
        if (m.id === action.id) {
          m.todoStatus = action.status
        }
      });
    }
  });

  return temp;
}


export default function reducer(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_VALUE:
      return addTextModule(state, action)
    case actionTypes.RESET:
      return []
    case actionTypes.ADD_INFO:
      return addInfo(state, action)
    case actionTypes.INIT:
      return action.init
    case actionTypes.DELETE:
      return deleteText(state, action)
    case actionTypes.ADD_STATUS:
      return addStatus(state, action)
    case actionTypes.CHANGE_TODO_STATUS:
      return changeTodoStatus(state, action)
    default:
      return state
  }
}