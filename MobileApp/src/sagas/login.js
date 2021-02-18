import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../action/constants';
import {commonAxios} from '../utils/apiUtils';
import {put, takeLatest} from 'redux-saga/effects';

function* login(action) {
  const {username, password} = action.data;
  try {
    const data = yield commonAxios.post('auth/signin', {username, password});

    yield put({
      type: LOGIN_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: LOGIN_FAILURE,
      error: error,
    });
  }
}
export function* watchLogin() {
  yield takeLatest(LOGIN_REQUEST, login);
}
