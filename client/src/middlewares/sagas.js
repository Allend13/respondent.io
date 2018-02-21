import { put, all, call, select } from 'redux-saga/effects';
import axios from 'axios';
import { history } from '../history';
import {
  START, SUCCESS, API_CALL, API_URL, methods, user, FAIL, endpoints
} from '../constants';
import { makeAction } from '../actions';
import { watchApiCall } from './watchers';
import { handleResponse } from './sagaHandlers';
import store from '../store';

export const apiRequest = ({ method, entity, url, payload }) => {
  return axios({
    method: method,
    url: url,
    data: method !== methods.get && payload,
    params: method === methods.get && payload,
    headers: {
      'Content-Type': 'application/json',
    }
  });
};

//HANDLERS
export function* handleApiCall(action) {
  // получаем все входные данные из экшена
  const { entity, payload } = action;
  // даем отмашку, что начался запрос
  yield put(makeAction(entity + START, payload));
  try {
    //при успешном запросе отрабатываем обработку данных по имени сущности
    const response = yield call(apiRequest, action);
    // даем отмашку об успешном запросе и возвращаем полученную и обработанную дату
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