import * as actionTypes from "./actionTypes";

export function addProjectTitle(projectTitle) {
  return {
    type: actionTypes.PROJECT_TITLE,
    projectTitle
  }
}

export function addModuleItem(moduleId, moduleItem) {
  return {
    type: actionTypes.MODULE_ITEM,
    moduleId,
    moduleItem
  }
}