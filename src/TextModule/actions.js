import * as actionTypes from "./actionTypes";

export function addValue(moduleId, id, value) {
  return {
    type: actionTypes.ADD_VALUE,
    moduleId,
    id,
    text: value
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
