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
} from "./constant";

import { commonAxios } from "../utils/apiUtils";

function deleteTransactionSucces(data) {
  return {
    type: DELETE_TRANSACTION_SUCCESS,
    data: data,
  };
}
function deleteTransactionFailure(error) {
  return {
    type: DELETE_TRANSACTION_FAILURE,
    error: error,
  };
}

export const deleteById = (id) => (dispatch) => {
  dispatch({
    type: DELETE_TRANSACTION_REQUEST,
  });

  commonAxios
    .delete(`transactions/${id}`)
    .then((data) => {
      dispatch(deleteTransactionSucces(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(deleteTransactionFailure(error));
    });
};

function saveTransactionSucces(data) {
  return {
    type: SAVE_TRANSACTION_SUCCESS,
    data: data,
  };
}
function saveTransactionFailure(error) {
  return {
    type: SAVE_TRANSACTION_FAILURE,
    error: error,
  };
}

export const save = ({ id, amount, type, description } = {}) => (dispatch) => {
  dispatch({
    type: SAVE_TRANSACTION_REQUEST,
  });

  const request = id
    ? commonAxios.put(`transactions/${id}`, { id, amount, type, description })
    : commonAxios.post(`transactions`, { amount, type, description });

  request
    .then((data) => data)
    .then((data) => {
      dispatch(saveTransactionSucces(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(saveTransactionFailure(error));
    });
};

function findTransactionSucces(data) {
  return {
    type: FIND_TRANSACTION_SUCCESS,
    data: data,
  };
}
function findTransactionFailure(error) {
  return {
    type: FIND_TRANSACTION_FAILURE,
    error: error,
  };
}
export const findById = (id) => (dispatch) => {
  dispatch({
    type: FIND_TRANSACTION_REQUEST,
  });

  commonAxios
    .get(`transactions/${id}`)
    .then((data) => {
      dispatch(findTransactionSucces(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(findTransactionFailure(error));
    });
};

function findTransactionsSucces(data) {
  return {
    type: FIND_TRANSACTIONS_SUCCESS,
    data: data,
  };
}
function findTransactionsFailure(error) {
  return {
    type: FIND_TRANSACTIONS_FAILURE,
    error: error,
  };
}
export const findAll = ({
  search = {},
  sort = "asc",
  page = 0,
  size = 10,
} = {}) => (dispatch) => {
  dispatch({
    type: FIND_TRANSACTIONS_REQUEST,
  });

  commonAxios
    .get("transactions", {
      params: { ...search, sort, page, size },
    })
    .then((data) => {
      dispatch(findTransactionsSucces(data));
    })
    .catch((error) => {
      dispatch(findTransactionsFailure(error));
    });
};

function findTransactionsSummarySucces(data) {
  return {
    type: FIND_TRANSACTIONS_SUMMARY_SUCCESS,
    data: data,
  };
}
function findTransactionsSummaryFailure(error) {
  return {
    type: FIND_TRANSACTIONS_SUMMARY_FAILURE,
    error: error,
  };
}
export const findAllSummary = ({ sort = "asc" } = {}) => (dispatch) => {
  dispatch({
    type: FIND_TRANSACTIONS_SUMMARY_REQUEST,
  });

  commonAxios
    .get("transactions/summary", {
      params: { sort },
    })
    .then((data) => {
      dispatch(findTransactionsSummarySucces(data));
    })
    .catch((error) => {
      dispatch(findTransactionsSummaryFailure(error));
    });
};
