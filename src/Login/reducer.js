import { LOADING, LOGIN_STATUS, USER_LOGIN } from "./actionTypes";

export default function loginReducer(state = {loading: false}, action) {
  switch (action.type) {
    case LOGIN_STATUS:
      return {...state, loginStatus: action.status}
    case USER_LOGIN:
      return {
        ...state, 
        ...{
          username: action.user?.username,
          password: action.user?.password,
          email: action.user?.email,
          remember: action.user?.remember
        }
      }
    case LOADING:
      return {...state, loading: action.loading}
    default:
      return state
  }
}