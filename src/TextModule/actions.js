import * as actionTypes from "./actionTypes";

export function addValue(moduleId, id, payload) {
  return {
    type: actionTypes.ADD_VALUE,
    moduleId,
    id,
    payload
  }
}

export function reset() {
  return {
    type: actionTypes.RESET
  }
}

export function addInfo(moduleId, id, username, lastTime) {
  return {
    type: actionTypes.ADD_INFO,
    moduleId,
    id,
    username,
    lastTime
  }
}

export function init(init) {
  return {
    type: actionTypes.INIT,
    init
  }
}

export function deleteText(moduleId, id) {
  return {
    type: actionTypes.DELETE,
    moduleId,
    id
  }
}

export function addStatus(moduleId, id, todoStatus) {
  return {
    type: actionTypes.ADD_STATUS,
    moduleId,
    id,
    todoStatus
  }
}

export function changeTodoStatus(moduleId, id, status) {
  return {
    type: actionTypes.CHANGE_TODO_STATUS,
    moduleId,
    id,
    status
  }
}
