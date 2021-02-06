function getKeyValue(key) {
  return sessionStorage.getItem(key);
}

function setKeyValue(key, value) {
  sessionStorage.setItem(key, value);
}
function romoveKeyValue(key) {
  sessionStorage.removeItem(key);
}
//user
export function getUser() {
  let username = getKeyValue('todo-login');

  try {
    username = JSON.parse(username).username;
  } catch (error) { 
    console.log(error)
  }

  return username;
}
export function setLogin(value) {
  setKeyValue('todo-login', JSON.stringify(value));
}

//admin
export function getAdmin() {
  const login = getKeyValue('todo-login');
  //未登录状态时，没有 `admin`
  return JSON.parse(login)?.admin;
}

export function setAdmin(value) {
  const key = 'todo-login';
  const login = getKeyValue(key);

  if (!login) return;

  setKeyValue(key, JSON.stringify({...JSON.parse(login), admin: value}));
}

//token
export function getToken() {
  return getKeyValue('todo-token');
}
export function setToken(value) {
  setKeyValue('todo-token', value);
}
export function removeToken() {
  romoveKeyValue('todo-token');
}
