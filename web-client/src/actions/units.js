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
    FIND_UNITS_FAILURE
} from './constant';

import { commonAxios } from '../utils/apiUtils'


function deleteUnitSucces(data) {
    return {
        type: DELETE_UNIT_SUCCESS,
        data: data
    }
};
function deleteUnitFailure(error) {
    return {
        type: DELETE_UNIT_FAILURE,
        error: error
    }
};

export const deleteById = (id) =>
    (dispatch) => {
        dispatch({
            type: DELETE_UNIT_REQUEST
        });

        commonAxios.delete(`units/${id}`)
            .then(data => {
                dispatch(deleteUnitSucces(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(deleteUnitFailure(error));
            });
    };





function saveUnitSucces(data) {
    return {
        type: SAVE_UNIT_SUCCESS,
        data: data
    }
};
function saveUnitFailure(error) {
    return {
        type: SAVE_UNIT_FAILURE,
        error: error
    }
};

export const save = ({ id, name, description } = {}) =>
    (dispatch) => {
        dispatch({
            type: SAVE_UNIT_REQUEST
        });
        const request = id ?
            commonAxios.put(`units/${id}`, { id, name, description }) :
            commonAxios.post(`units`, { name, description });

        request
            .then(data => {
                dispatch(saveUnitSucces(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(saveUnitFailure(error));
            });
    };





function findUnitSucces(data) {
    return {
        type: FIND_UNIT_SUCCESS,
        data: data
    }
};
function findUnitFailure(error) {
    return {
        type: FIND_UNIT_FAILURE,
        error: error
    }
};
export const findById = (id) =>
    (dispatch) => {
        dispatch({
            type: FIND_UNIT_REQUEST
        });

        commonAxios.get(`units/${id}`)
            .then(data => {
                dispatch(findUnitSucces(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(findUnitFailure(error));
            });
    };





function findUnitsSucces(data) {
    return {
        type: FIND_UNITS_SUCCESS,
        data: data
    }
};
function findUnitsFailure(error) {
    return {
        type: FIND_UNITS_FAILURE,
        error: error
    }
};
export const findAll = ({ search = {}, sort = 'asc', page = 0, size = 10 } = {}) =>
    (dispatch) => {
        dispatch({
            type: FIND_UNITS_REQUEST
        });

        commonAxios.get('units', {
            params: { ...search, sort, page, size }
        })
            .then(data => {
                dispatch(findUnitsSucces(data));
            })
            .catch(error => {
                dispatch(findUnitsFailure(error));
            });
    };


