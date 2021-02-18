import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../action/constants';

const defaultState = {
  data: {username: null, token: null},
  loading: false,
  error: null,
};

export function login(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
