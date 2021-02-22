import * as actionTypes from "./actionTypes";

export function addTextModule(moduleId, id) {
  return {
    type: actionTypes.ADD_TEXT_MODULE,
    moduleId,
    id
  }
}

export function addModuleTitle(moduleId, moduleTitle) {
  return {
    type: actionTypes.MODULE_TITLE,
    moduleId,
    moduleTitle
  }
}

export function reset() {
  return {
    type: actionTypes.RESET
  }
}

export function deleteTextModule(moduleId, id) {
  return {
    type: actionTypes.DELETE_TEXT_MODULE,
    moduleId,
    id
  }
}

export function init(init) {
  return {
    type: actionTypes.INIT,
    init
  }
}

export function recordId(moduleId, id) {
  return {
    type: actionTypes.RECORD_ID,
    moduleId,
    id
  }
}

export function deleteModule(moduleId) {
  return {
    type: actionTypes.DELETE_MODULE,
    moduleId
  }
}
