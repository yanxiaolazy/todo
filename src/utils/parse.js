import Cookies from "js-cookie";

function getKeyValue(key) {
  return Cookies.get(key);
}

function setKeyValue(key, value) {
  Cookies.set(key, value);
}
function romoveKeyValue(key) {
  Cookies.remove(key);
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

export function removeLogin() {
  romoveKeyValue('todo-login');
}

//admin
export function getAdmin() {
  const login = getKeyValue('todo-login');
  //未登录状态时，没有 `admin`
  return typeof login === 'undefined' || JSON.parse(login)?.admin;
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

//email
export function setEmail(email) {
  const key = 'todo-login';
  const login = getKeyValue(key);

  if (!login) return;

  setKeyValue(key, JSON.stringify({...JSON.parse(login), email}));
}
