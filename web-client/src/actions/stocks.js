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
    FIND_STOCKS_SUMMARY_FAILURE
} from './constant';

import { commonAxios } from '../utils/apiUtils'




function saveStockSucces(data) {
    return {
        type: SAVE_STOCK_SUCCESS,
        data: data
    }
};
function saveStockFailure(error) {
    return {
        type: SAVE_STOCK_FAILURE,
        error: error
    }
};

export const save = ({ id, item, quantity, unit } = {}) =>
    (dispatch) => {
        dispatch({
            type: SAVE_STOCK_REQUEST
        });
        const request = id ?
            commonAxios.put(`stocks/${id}`, { id, item, quantity, unit }) :
            commonAxios.post(`stocks`, { item: { id: item.id }, quantity, unit: { id: unit.id } });

        request
            .then(data => {
                dispatch(saveStockSucces(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(saveStockFailure(error));
            });
    };

export const deleteById = (id) =>
    (dispatch) => {
        dispatch({
            type: DELETE_STOCK_REQUEST
        });

        commonAxios.delete(`stocks/${id}`)
            .then(data => data)
            .then(data => {
                dispatch(deleteStockSucces(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(deleteStockFailure(error));
            });
    };
function deleteStockSucces(data) {
    return {
        type: DELETE_STOCK_SUCCESS,
        data: data
    }
};
function deleteStockFailure(error) {
    return {
        type: DELETE_STOCK_FAILURE,
        error: error
    }
};


export const findById = (id) =>
    (dispatch) => {
        dispatch({
            type: FIND_STOCK_REQUEST
        });
        commonAxios.get(`stocks/${id}`)
            .then(data => {
                dispatch(findStockSucces(data));
            })
            .catch(error => {
                console.log(error);
                dispatch(findStockFailure(error));
            });
    };

function findStockSucces(data) {
    return {
        type: FIND_STOCK_SUCCESS,
        data: data
    }
};
function findStockFailure(error) {
    return {
        type: FIND_STOCK_FAILURE,
        error: error
    }
};

export const findAll = ({ sort = 'asc', page = 0, size = 10 } = {}) =>
    (dispatch) => {
        dispatch({
            type: FIND_STOCKS_REQUEST
        });

        commonAxios.get('stocks', {
            params: { sort, page, size }
        })
            .then(data => {
                dispatch(findStocksSucces(data));
            })
            .catch(error => {
                dispatch(findStocksFailure(error));
            });
    };

function findStocksSucces(data) {
    return {
        type: FIND_STOCKS_SUCCESS,
        data: data
    }
};
function findStocksFailure(error) {
    return {
        type: FIND_STOCKS_FAILURE,
        error: error
    }
};



export const findAllSummary = ({  sort = 'asc'} = {}) =>
    (dispatch) => {
        dispatch({
            type: FIND_STOCKS_SUMMARY_REQUEST
        });

        commonAxios.get('stocks/summary', {
            params: { sort }
        })
            .then(data => {
                dispatch(findSummarySucces(data));
            })
            .catch(error => {
                dispatch(findSummaryFailure(error));
            });
    };

function findSummarySucces(data) {
    return {
        type: FIND_STOCKS_SUMMARY_SUCCESS,
        data: data
    }
};
function findSummaryFailure(error) {
    return {
        type: FIND_STOCKS_SUMMARY_FAILURE,
        error: error
    }
};
