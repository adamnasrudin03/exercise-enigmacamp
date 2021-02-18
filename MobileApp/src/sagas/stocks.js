import {
  SAVE_STOCK_REQUEST,
  SAVE_STOCK_SUCCESS,
  SAVE_STOCK_FAILURE,
  DELETE_STOCK_REQUEST,
  DELETE_STOCK_SUCCESS,
  DELETE_STOCK_FAILURE,
  FIND_STOCK_REQUEST,
  FIND_STOCK_SUCCESS,
  FIND_STOCK_FAILURE,
  FIND_STOCKS_REQUEST,
  FIND_STOCKS_SUCCESS,
  FIND_STOCKS_FAILURE,
  FIND_STOCKS_SUMMARY_REQUEST,
  FIND_STOCKS_SUMMARY_SUCCESS,
  FIND_STOCKS_SUMMARY_FAILURE,
} from '../action/constants';
import {commonAxios} from '../utils/apiUtils';
import {put, takeLatest} from 'redux-saga/effects';

function* findAll(action) {
  const {sort = 'asc', page = 0, size = 10} = action.params || {};
  try {
    const data = yield commonAxios.get('stocks', {
      params: {sort, page, size},
    });

    yield put({
      type: FIND_STOCKS_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: FIND_STOCKS_FAILURE,
      error: error,
    });
  }
}
function* findAllSummary(action) {
  const {sort = 'asc', page = 0, size = 10} = action.params || {};
  try {
    const data = yield commonAxios.get('stocks/summary', {
      params: {sort, page, size},
    });

    yield put({
      type: FIND_STOCKS_SUMMARY_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: FIND_STOCKS_SUMMARY_FAILURE,
      error: error,
    });
  }
}
function* findById(action) {
  try {
    const data = yield commonAxios.get(`stocks/${action.id}`);

    yield put({
      type: FIND_STOCK_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: FIND_STOCK_FAILURE,
      error: error,
    });
  }
}

function* deleteById(action) {
  try {
    const data = yield commonAxios.delete(`stocks/${action.id}`);

    yield put({
      type: DELETE_STOCK_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: DELETE_STOCK_FAILURE,
      error: error,
    });
  }
}
function* save(action) {
  const {id, item, quantity, unit} = action.data;
  try {
    const data = yield id
      ? commonAxios.put(`stocks/${id}`, {id, item, quantity, unit})
      : commonAxios.post(`stocks`, {
          item: {id: item.id},
          quantity,
          unit: {id: unit.id},
        });

    yield put({
      type: SAVE_STOCK_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: SAVE_STOCK_FAILURE,
      error: error,
    });
  }
}

export function* watchStockSummary() {
  yield takeLatest(FIND_STOCKS_SUMMARY_REQUEST, findAllSummary);
}
export function* watchStocks() {
  yield takeLatest(FIND_STOCKS_REQUEST, findAll);
}
export function* watchStock() {
  yield takeLatest(FIND_STOCK_REQUEST, findById);
}
export function* watchDeleteStock() {
  yield takeLatest(DELETE_STOCK_REQUEST, deleteById);
}
export function* watchSaveStock() {
  yield takeLatest(SAVE_STOCK_REQUEST, save);
}
