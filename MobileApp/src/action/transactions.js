import {
  SAVE_TRANSACTION_REQUEST,
  DELETE_TRANSACTION_REQUEST,
  FIND_TRANSACTION_REQUEST,
  FIND_TRANSACTIONS_REQUEST,
  FIND_TRANSACTIONS_SUMMARY_REQUEST,
} from './constants';

export function save(data) {
  return {
    type: SAVE_TRANSACTION_REQUEST,
    data: data,
  };
}

export function deleteById(id) {
  return {
    type: DELETE_TRANSACTION_REQUEST,
    id: id,
  };
}

export function findById(id) {
  return {
    type: FIND_TRANSACTION_REQUEST,
    id: id,
  };
}

export function findAllTransactions(params) {
  return {
    type: FIND_TRANSACTIONS_REQUEST,
    params: params,
  };
}

export function findAllSummary(params) {
  return {
    type: FIND_TRANSACTIONS_SUMMARY_REQUEST,
    params: params,
  };
}
