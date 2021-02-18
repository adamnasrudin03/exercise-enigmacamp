import {LOGIN_REQUEST} from './constants';

export function loginData(data) {
  return {
    type: LOGIN_REQUEST,
    data: data,
  };
}
