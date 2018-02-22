import { put, all, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';
import { history } from '../history';
import {
  START, SUCCESS, API_CALL, API_URL, methods, user, FAIL, endpoints
} from '../constants';
import { makeAction } from '../actions';
import { watchApiCall } from './watchers';
import { handleResponse } from './sagaHandlers';
import { users } from '../fixtures/users';

export const apiRequest = ({ method, entity, url, payload }) => {
  // return axios({
  //   method: method,
  //   url: url,
  //   data: method !== methods.get && payload,
  //   params: method === methods.get && payload,
  //   headers: {
  //     'Content-Type': 'application/json',
  //   }
  // });
  return { data: users };
};

//HANDLERS
export function* handleApiCall(action) {
  const { entity, payload } = action;

  yield put(makeAction(entity + START, payload));
  yield delay(1000);
  try {

    const response = yield call(apiRequest, action);
    const result = yield handleResponse(entity, response);
    yield put(makeAction(entity + SUCCESS, result));
  } catch (error) {
    yield put(makeAction(entity + FAIL, error));
  }
}


// single entry point
export function* rootSaga() {
  yield all([
    watchApiCall(),
  ]);
}