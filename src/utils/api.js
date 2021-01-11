import { createApi } from "./ajax";

const _baseURL = '/api',
      uploadConfig = {
        params: {

        }
      },
      deleteFileConfig = {
        params: {

        }
      },
      deleteProjectConfig = {
        params: {

        }
      },
      deleteImageConfig = {
        params: {

        }
      },
      viewProjectConfig = {
        params: {

        }
      },
      deleteUserConfig = {
        params: {

        }
      };

export const loginApi = createApi(`${_baseURL}/login`, 'POST');
export const logoutApi = createApi(`${_baseURL}/logout`, 'POST')
export const uploadApi = createApi(`${_baseURL}/upload`, 'POST', uploadConfig);
export const deleteFileApi = createApi(`${_baseURL}/delete/file`, 'DELETE', deleteFileConfig);
export const deleteProjectApi = createApi(`${_baseURL}/delete/project`, 'DELETE', deleteProjectConfig);
export const deleteImageApi = createApi(`${_baseURL}/delete/image`, 'DELETE', deleteImageConfig);
export const viewProjectApi = createApi(`${_baseURL}/view/project`, 'GET', viewProjectConfig);
export const viewDateApi = createApi(`${_baseURL}/view/date`, 'GET');
export const newProjectApi = createApi(`${_baseURL}/new/project`, 'POST');
export const newUserApi = createApi(`${_baseURL}/new/user`, 'POST');
export const verifyUsernameApi = createApi(`${_baseURL}/verify/username`, 'POST');
export const verifyTokenApi = createApi(`${_baseURL}/verify/token`, 'POST');
export const deleteUserApi = createApi(`${_baseURL}/delete/user`, 'DELETE', deleteUserConfig);

