import * as actionTypes from "./actionTypes";

export function addTextModule(moduleId, id, textModule) {
  return {
    type: actionTypes.ADD_TEXT_MODULE,
    moduleId,
    id,
    textModule
  }
}

export function addFileModule(moduleId, id, fileModule) {
  return {
    type: actionTypes.ADD_FILE_MODULE,
    moduleId,
    id,
    fileModule
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