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
    temp.push({
      text: payload.text, 
      username: payload.username, 
      lastTime: payload.lastTime,
      todoStatus: payload.todoStatus,
      id: action.id
    });
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
        text:action.payload.text,
        id: action.id,
        username: action.payload.username,
        lastTime: action.payload.lastTime,
        todoStatus: action.payload.todoStatus
      }]
    });
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
      f.textList.forEach(m => {
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

