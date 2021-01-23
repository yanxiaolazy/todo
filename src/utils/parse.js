export function getAdmin(key) {
  let token = sessionStorage.getItem(key);

  try {
    token = JSON.parse(token).params.admin;
  } catch (error) { 
    console.log(error)
  }

  return token;
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