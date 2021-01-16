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