import {
  SAVE_TRANSACTION_REQUEST,
  SAVE_TRANSACTION_SUCCESS,
  SAVE_TRANSACTION_FAILURE,
  DELETE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_SUCCESS,
  DELETE_TRANSACTION_FAILURE,
  FIND_TRANSACTION_REQUEST,
  FIND_TRANSACTION_SUCCESS,
  FIND_TRANSACTION_FAILURE,
  FIND_TRANSACTIONS_REQUEST,
  FIND_TRANSACTIONS_SUCCESS,
  FIND_TRANSACTIONS_FAILURE,
  FIND_TRANSACTIONS_SUMMARY_REQUEST,
  FIND_TRANSACTIONS_SUMMARY_SUCCESS,
  FIND_TRANSACTIONS_SUMMARY_FAILURE,
} from '../action/constants';
import {commonAxios} from '../utils/apiUtils';
import {put, takeLatest} from 'redux-saga/effects';

function* findAll(action) {
  const {search = {}, sort = 'asc', page = 0, size = 10} = action.params || {};
  try {
    const data = yield commonAxios.get('transactions', {
      params: {...search, sort, page, size},
    });

    yield put({
      type: FIND_TRANSACTIONS_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: FIND_TRANSACTIONS_FAILURE,
      error: error,
    });
  }
}
function* findAllSummary(action) {
  const {search = {}, sort = 'asc', page = 0, size = 10} = action.params || {};
  try {
    const data = yield commonAxios.get('transactions/summary', {
      params: {...search, sort, page, size},
    });

    yield put({
      type: FIND_TRANSACTIONS_SUMMARY_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: FIND_TRANSACTIONS_SUMMARY_FAILURE,
      error: error,
    });
  }
}
function* findById(action) {
  try {
    const data = yield commonAxios.get(`transactions/${action.id}`);

    yield put({
      type: FIND_TRANSACTION_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: FIND_TRANSACTION_FAILURE,
      error: error,
    });
  }
}

function* deleteById(action) {
  try {
    const data = yield commonAxios.delete(`transactions/${action.id}`);

    yield put({
      type: DELETE_TRANSACTION_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: DELETE_TRANSACTION_FAILURE,
      error: error,
    });
  }
}
function* save(action) {
  const {id, amount, type, description} = action.data;
  try {
    const data = yield id
      ? commonAxios.put(`transactions/${id}`, {id, amount, type, description})
      : commonAxios.post(`transactions`, {amount, type, description});

    yield put({
      type: SAVE_TRANSACTION_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: SAVE_TRANSACTION_FAILURE,
      error: error,
    });
  }
}

export function* watchTransactionSummary() {
  yield takeLatest(FIND_TRANSACTIONS_SUMMARY_REQUEST, findAllSummary);
}
export function* watchTransactions() {
  yield takeLatest(FIND_TRANSACTIONS_REQUEST, findAll);
}
export function* watchTransaction() {
  yield takeLatest(FIND_TRANSACTION_REQUEST, findById);
}
export function* watchDeleteTransaction() {
  yield takeLatest(DELETE_TRANSACTION_REQUEST, deleteById);
}
export function* watchSaveTransaction() {
  yield takeLatest(SAVE_TRANSACTION_REQUEST, save);
}
