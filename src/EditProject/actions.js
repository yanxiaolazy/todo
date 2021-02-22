import * as actionTypes from "./actionTypes";

export function addProjectTitle(projectTitle) {
  return {
    type: actionTypes.PROJECT_TITLE,
    projectTitle
  }
}

export function addModuleItem(moduleId) {
  return {
    type: actionTypes.MODULE_ITEM,
    moduleId  
  }
}

export function reset() {
  return {
    type: actionTypes.RESET
  }
}

export function init(init) {
  return {
    type: actionTypes.INIT,
    init
  }
}

export function recordModuleId(moduleId) {
  return {
    type: actionTypes.RECORD_MODULE_ID,
    moduleId
  }
}

export function deleteModule(moduleId) {
  return {
    type: actionTypes.DELETE_MODULE,
    moduleId
  }
}