import {combineReducers} from 'redux';
import {login} from './login';
import {savedItem, deletedItemById, itemById, items} from './items';
import {savedUnit, deletedUnitById, unitById, units} from './units';
import {
  savedStock,
  deletedStockById,
  stockById,
  stocks,
  stocksSummary,
} from './stocks';
import {
  savedTransaction,
  deletedTransactionById,
  transactionById,
  transactions,
  transactionsSummary,
} from './transactions';

export default combineReducers({
  login,
  savedItem,
  deletedItemById,
  itemById,
  items,
  savedUnit,
  deletedUnitById,
  unitById,
  units,
  savedStock,
  deletedStockById,
  stockById,
  stocks,
  stocksSummary,
  savedTransaction,
  deletedTransactionById,
  transactionById,
  transactions,
  transactionsSummary,
});
