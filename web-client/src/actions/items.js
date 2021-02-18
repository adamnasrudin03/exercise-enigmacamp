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
} from "./constant";

import { commonAxios } from "../utils/apiUtils";

function deleteItemSucces(data) {
  return {
    type: DELETE_ITEM_SUCCESS,
    data: data,
  };
}
function deleteItemFailure(error) {
  return {
    type: DELETE_ITEM_FAILURE,
    error: error,
  };
}

export const deleteById = (id) => (dispatch) => {
  dispatch({
    type: DELETE_ITEM_REQUEST,
  });

  commonAxios
    .delete(`items/${id}`)
    .then((data) => {
      dispatch(deleteItemSucces(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(deleteItemFailure(error));
    });
};

function saveItemSucces(data) {
  return {
    type: SAVE_ITEM_SUCCESS,
    data: data,
  };
}
function saveItemFailure(error) {
  return {
    type: SAVE_ITEM_FAILURE,
    error: error,
  };
}

export const save = ({ id, name } = {}) => (dispatch) => {
  dispatch({
    type: SAVE_ITEM_REQUEST,
  });
  const request = id
    ? commonAxios.put(`items/${id}`, { id, name })
    : commonAxios.post(`items`, { name });

  request
    .then((data) => {
      dispatch(saveItemSucces(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(saveItemFailure(error));
    });
};

function findItemSucces(data) {
  return {
    type: FIND_ITEM_SUCCESS,
    data: data,
  };
}
function findItemFailure(error) {
  return {
    type: FIND_ITEM_FAILURE,
    error: error,
  };
}
export const findById = (id) => (dispatch) => {
  dispatch({
    type: FIND_ITEM_REQUEST,
  });

  commonAxios
    .get(`items/${id}`)
    .then((data) => {
      dispatch(findItemSucces(data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(findItemFailure(error));
    });
};

function findItemsSucces(data) {
  return {
    type: FIND_ITEMS_SUCCESS,
    data: data,
  };
}
function findItemsFailure(error) {
  return {
    type: FIND_ITEMS_FAILURE,
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
    type: FIND_ITEMS_REQUEST,
  });

  commonAxios
    .get("items", {
      params: { ...search, sort, page, size },
    })
    .then((data) => {
      dispatch(findItemsSucces(data));
    })
    .catch((error) => {
      dispatch(findItemsFailure(error));
    });
};
