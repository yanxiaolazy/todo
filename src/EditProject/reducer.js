import * as actionTypes from "./actionTypes";

function addModuleItem(state, action) {
  const temp = state?.concat() || [];
 
  temp.push({moduleId: action.moduleId});

  return temp;
}

export default function reducer(state = {}, action) {
  switch (action.type) {
    case actionTypes.MODULE_ITEM:
      return {
        ...state, 
        modules: addModuleItem(state.modules, action)
      }
    case actionTypes.PROJECT_TITLE:
      return {...state, projectTitle: action.projectTitle}
    case actionTypes.RESET:
      return {}
    case actionTypes.INIT:
      return {...action.init}
    case actionTypes.RECORD_MODULE_ID:
      return {...state, moduleId: action.moduleId}
    default:
      return state;
  }
}