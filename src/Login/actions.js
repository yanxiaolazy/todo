import { LOGIN_STATUS, USER_LOGIN, LOADING } from "./actionTypes";

export function setLoginStatus(status) {
  return {
    type: LOGIN_STATUS,
    status
  }
}

export function setUserValue(user) {
  return {
    type: USER_LOGIN,
    user
  }
}

export function setLoading(loading) {
  return {
    type: LOADING,
    loading
  }
}