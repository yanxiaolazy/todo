import * as actionTypes from "./actionTypes";

function addModuleItem(state, action) {
  const temp = state?.concat() || [];
  let isNew = true;

  temp.forEach(f => {
    if (f.moduleId === action.moduleId) {
      f.moduleItem = action.moduleItem;
      isNew = false;
    }
  })

  if (isNew) {
    temp.push({moduleId: action.moduleId, moduleItem: action.moduleItem})
  }

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
    default:
      return state;
  }
}