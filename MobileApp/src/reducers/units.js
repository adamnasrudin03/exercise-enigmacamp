import {
  SAVE_UNIT_REQUEST,
  SAVE_UNIT_SUCCESS,
  SAVE_UNIT_FAILURE,
  DELETE_UNIT_REQUEST,
  DELETE_UNIT_SUCCESS,
  DELETE_UNIT_FAILURE,
  FIND_UNIT_REQUEST,
  FIND_UNIT_SUCCESS,
  FIND_UNIT_FAILURE,
  FIND_UNITS_REQUEST,
  FIND_UNITS_SUCCESS,
  FIND_UNITS_FAILURE,
} from '../action/constants';

const defaultState = {data: null, loading: false, error: null};

export function savedUnit(state = defaultState, action) {
  switch (action.type) {
    case SAVE_UNIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SAVE_UNIT_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case SAVE_UNIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function deletedUnitById(state = defaultState, action) {
  switch (action.type) {
    case DELETE_UNIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case DELETE_UNIT_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case DELETE_UNIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export function unitById(state = defaultState, action) {
  switch (action.type) {
    case FIND_UNIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FIND_UNIT_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case FIND_UNIT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
export function units(state = defaultState, action) {
  switch (action.type) {
    case FIND_UNITS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FIND_UNITS_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case FIND_UNITS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
