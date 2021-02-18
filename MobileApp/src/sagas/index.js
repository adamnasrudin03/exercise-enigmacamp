import {all, fork} from 'redux-saga/effects';
import {watchLogin} from './login';
import {watchItems, watchItem, watchDeleteItem, watchSaveItem} from './items';
import {watchUnits, watchUnit, watchDeleteUnit, watchSaveUnit} from './units';
import {
  watchStockSummary,
  watchStocks,
  watchStock,
  watchDeleteStock,
  watchSaveStock,
} from './stocks';
import {
  watchTransactionSummary,
  watchTransactions,
  watchTransaction,
  watchDeleteTransaction,
  watchSaveTransaction,
} from './transactions';

export default function* rootSaga() {
  yield all([
    fork(watchLogin),
    fork(watchItems),
    fork(watchItem),
    fork(watchDeleteItem),
    fork(watchSaveItem),
    fork(watchUnits),
    fork(watchUnit),
    fork(watchDeleteUnit),
    fork(watchSaveUnit),
    fork(watchStockSummary),
    fork(watchStocks),
    fork(watchStock),
    fork(watchDeleteStock),
    fork(watchSaveStock),
    fork(watchTransactionSummary),
    fork(watchTransactions),
    fork(watchTransaction),
    fork(watchDeleteTransaction),
    fork(watchSaveTransaction),
  ]);
}
