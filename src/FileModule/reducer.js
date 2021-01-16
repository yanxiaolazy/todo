import * as actionTypes from "./actionTypes";

function updateFile(state, action) {
    // 之所以这里是个`?.`操作符，是因为，点击'modal'会先生成一个`moduleId` 此时为`undefined`

  const temp = state?.concat() || [];
  let isNew = true;

  temp.forEach(f => {
    if (f.id === action.id) {
      f.text = action.text;
    }
  });

  if (isNew) {
    temp.push({id: action.id, file: action.file});
  }

  return temp;
}

function addFileModule(state, action) {
  const temp = state.concat();
  let isNew = true;

  temp.forEach(f => {
    if (f.moduleId === action.moduleId) {
      f.fileList= updateFile(f.fileList, action);
      isNew = false;
    }
  });

  if (isNew) {
    temp.push({
      moduleId: action.moduleId,
      fileList: [
        {
          id: action.id,
          file: action.file
        }
      ]
    })
  }
  return temp;
}

function updateModalStatus(state, action) {
  const temp = state.concat();
  let isNew = true;

  temp.forEach(f => {
    if (f.moduleId === action.moduleId) {
      f.isOpenModal = action.isOpenModal;
      isNew = false;
    }
  });

  if (isNew) {
    temp.push({moduleId: action.moduleId, isOpenModal: action.isOpenModal});
  }
  return temp;
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case actionTypes.ADD_FILE:
      return addFileModule(state, action)
    case actionTypes.IS_OPEN_MODAL:
      return updateModalStatus(state, action)
    default:
      return state
  }
}