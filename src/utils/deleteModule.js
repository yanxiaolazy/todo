export default function deleteModule(state, action) {
  const temp = state.concat();

  for(let key in temp) {
    if (temp[key].moduleId === action.moduleId) {
      state.splice(key, 1);
    }
  }

  return state.concat();  
}