import {
  SAVE_UNIT_REQUEST,
  DELETE_UNIT_REQUEST,
  FIND_UNIT_REQUEST,
  FIND_UNITS_REQUEST,
} from './constants';

export function save(data) {
  return {
    type: SAVE_UNIT_REQUEST,
    data: data,
  };
}

export function deleteById(id) {
  return {
    type: DELETE_UNIT_REQUEST,
    id: id,
  };
}

export function findById(id) {
  return {
    type: FIND_UNIT_REQUEST,
    id: id,
  };
}

export function findAllUnits(params) {
  return {
    type: FIND_UNITS_REQUEST,
    params: params,
  };
}
