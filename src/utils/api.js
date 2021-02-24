import { createApi } from "./ajax";
import { baseConfig } from "./ajax";

const _baseURL = '/api';
const _config = {
  timeout: 5000
}

export const loginApi = createApi(`${_baseURL}/login`, 'POST');
export const logoutApi = createApi(`${_baseURL}/logout`, 'POST');

export const deleteFileApi = createApi(`${_baseURL}/delete/file`, 'DELETE');
export const deleteProjectApi = createApi(`${_baseURL}/delete/project`, 'DELETE');
export const deleteUserApi = createApi(`${_baseURL}/delete/user`, 'DELETE');

export const viewProjectApi = createApi(`${_baseURL}/view/project`, 'GET');
export const viewDateApi = createApi(`${_baseURL}/view/date`, 'GET');
export const viewFileApi = createApi(`${_baseURL}/view/file`, 'GET', _config);
export const viewUsersApi = createApi(`${_baseURL}/view/users`, 'GET');
export const viewAllMediaApi = createApi(`${_baseURL}/view/media`, 'GET');

export const newProjectApi = createApi(`${_baseURL}/new/project`, 'POST');
export const newUserApi = createApi(`${_baseURL}/new/user`, 'POST');

export const updateProjectApi = createApi(`${_baseURL}/update/project`, 'POST');
export const updateUserApi = createApi(`${_baseURL}/update/user`, 'POST');

export const verifyUsernameApi = createApi(`${_baseURL}/verify/username`, 'POST');
export const verifyTokenApi = createApi(`${_baseURL}/verify/token`, 'POST');

export const uploadApi = `${baseConfig.baseURL}${_baseURL}/upload`;


