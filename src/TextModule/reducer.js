import * as actionTypes from "./actionTypes";

function addText(state, action) {
  const temp = state.concat();
  let isNew = true;

  temp.forEach(f => {
    if (f.id === action.id) {
      f.text = action.text;
      isNew = false;
    }
  });

  if (isNew) {
    temp.push({text:action.text, id: action.id});
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
        text:action.text,
        id: action.id
      }]
    });
  }
  console.log('temp --- ', temp)
  return temp;
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_VALUE:
      return addTextModule(state, action)
    default:
      return state
  }
}