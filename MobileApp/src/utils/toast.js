import {Toast} from 'native-base';

export function showError(error) {
  Toast.show({
    text: error.message,
    buttonText: 'Ok',
    type: 'danger',
    duration: 1000,
  });
}
export function showErrorNotBlank(value) {
  Toast.show({
    text: 'Input Not Valid, data not Empty.',
    buttonText: 'Ok',
    type: 'danger',
    duration: 5000,
  });
}
export function showErrorNumber(value) {
  Toast.show({
    text: 'Input Not Valid, data must be NUMBER.',
    buttonText: 'Ok',
    type: 'danger',
    duration: 5000,
  });
}

export function showErrorNumberOfZero(value) {
  Toast.show({
    text:
      'The data you entered is = [ ' +
      value +
      ' ]. Data it cannot must be more than zero.',
    buttonText: 'Ok',
    type: 'danger',
    duration: 5000,
  });
}
export function showErrorNumberOf(value) {
  Toast.show({
    text:
      'The data you entered is = [ ' +
      value +
      ' ]. Data it cannot be has a value of > 9223372036854775807 .',
    buttonText: 'Ok',
    type: 'danger',
    duration: 5000,
  });
}
export function showErrorSearch(value) {
  Toast.show({
    text: 'Only search by type (in / out)',
    buttonText: 'Ok',
    type: 'danger',
    duration: 5000,
  });
}
