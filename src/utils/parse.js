export function getKeyValue(key) {
  return sessionStorage.getItem(key);
}

export function setKeyValue(key, value) {
  sessionStorage.setItem(key, value);
}

export function getUser(key) {
  let token = sessionStorage.getItem(key);

  try {
    token = JSON.parse(token).username;
  } catch (error) { 
    console.log(error)
  }

  return token;
}

export function setUser(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}