import {
  SAVE_ITEM_REQUEST,
  SAVE_ITEM_SUCCESS,
  SAVE_ITEM_FAILURE,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  FIND_ITEM_REQUEST,
  FIND_ITEM_SUCCESS,
  FIND_ITEM_FAILURE,
  FIND_ITEMS_REQUEST,
  FIND_ITEMS_SUCCESS,
  FIND_ITEMS_FAILURE,
} from './../action/constants';
import {commonAxios} from '../utils/apiUtils';
import {put, takeLatest} from 'redux-saga/effects';

function* findAll(action) {
  const {search = {}, sort = 'asc', page = 0, size = 10} = action.params || {};
  try {
    const data = yield commonAxios.get('items', {
      params: {...search, sort, page, size},
    });

    yield put({
      type: FIND_ITEMS_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: FIND_ITEMS_FAILURE,
      error: error,
    });
  }
}
function* findById(action) {
  try {
    const data = yield commonAxios.get(`items/${action.id}`);

    yield put({
      type: FIND_ITEM_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: FIND_ITEM_FAILURE,
      error: error,
    });
  }
}

function* deleteById(action) {
  try {
    const data = yield commonAxios.delete(`items/${action.id}`);

    yield put({
      type: DELETE_ITEM_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: DELETE_ITEM_FAILURE,
      error: error,
    });
  }
}
function* save(action) {
  const {id, name} = action.data;
  try {
    const data = yield id
      ? commonAxios.put(`items/${id}`, {id, name})
      : commonAxios.post(`items`, {name});

    yield put({
      type: SAVE_ITEM_SUCCESS,
      data: data,
    });
  } catch (error) {
    yield put({
      type: SAVE_ITEM_FAILURE,
      error: error,
    });
  }
}

export function* watchItems() {
  yield takeLatest(FIND_ITEMS_REQUEST, findAll);
}
export function* watchItem() {
  yield takeLatest(FIND_ITEM_REQUEST, findById);
}
export function* watchDeleteItem() {
  yield takeLatest(DELETE_ITEM_REQUEST, deleteById);
}
export function* watchSaveItem() {
  yield takeLatest(SAVE_ITEM_REQUEST, save);
}
