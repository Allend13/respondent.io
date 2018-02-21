import { takeEvery, put, call } from 'redux-saga/effects';
import {
  START,
  FAIL,
  SUCCESS,
  API_CALL,
  API_URL,
  methods,
  user,
  endpoints,
} from '../../constants';
import { handleApiCall } from '../sagas';


export function* watchApiCall() {
  yield takeEvery(API_CALL, handleApiCall);
}
