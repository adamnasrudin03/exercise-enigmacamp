import { combineReducers } from 'redux';
import { saveItem, deleteItemById, findItemById, findItems } from './items';
import { saveUnit, deleteUnitById, findUnits, findUnitById } from './units';
import { summaryStock, saveStock, deleteStockById, findStocks, findStockById } from './stocks';
import {  summaryTransaction, saveTransaction, deleteTransactionById, findTransactions, findTransactionById } from './transactions';

export default combineReducers({
    saveItem, deleteItemById, findItemById, findItems,
    saveUnit, findUnitById, deleteUnitById, findUnits,
    summaryStock, saveStock, deleteStockById, findStocks, findStockById,
    summaryTransaction, saveTransaction, deleteTransactionById, findTransactions, findTransactionById
});