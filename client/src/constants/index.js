//STATUS
export const SUCCESS = '_SUCCESS';
export const FAIL = '_FAIL';
export const START = '_START';


export const API_CALL = 'API_CALL';
export const API_URL = 'http://localhost:3000';


//METHODS
export const methods = {
  get: 'GET',
  post: 'POST',
  put: 'PUT',
  delete: 'DELETE'
};

export const endpoints = {
  user: {
    index: '/users',
    filters: (url) => `/users?${url}`
  }
};

export const status = {};

export const user = {
  create: 'CREATE_USER',
  show: 'GET_SINGLE_USER',
  index: 'GET_USERS_LIST',
  update: 'UPDATE_USER',
  delete: 'DELETE_USER',
  filter: 'FILTER_USERS'
};
