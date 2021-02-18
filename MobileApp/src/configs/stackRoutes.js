import {LoginScreen} from '../screens/login';
import {MainScreen} from '../screens/main';

import {ItemScreen} from '../screens/items';
import {UnitScreen} from '../screens/units';
import {
  ItemsOptions,
  UnitsOptions,
  StockScreen,
  StockSumScreen,
} from '../screens/stocks';
import {TransactionScreen, TransactionSumScreen} from '../screens/transactions';

export const stackRoutes = [
  {
    name: 'Login',
    component: LoginScreen,
  },
  {
    name: 'Main',
    component: MainScreen,
  },
  {
    name: 'Item',
    component: ItemScreen,
  },
  {
    name: 'ItemsOptions',
    component: ItemsOptions,
  },
  {
    name: 'Unit',
    component: UnitScreen,
  },
  {
    name: 'UnitsOptions',
    component: UnitsOptions,
  },
  {
    name: 'Stock',
    component: StockScreen,
  },
  {
    name: 'StockSummary',
    component: StockSumScreen,
  },
  {
    name: 'Transaction',
    component: TransactionScreen,
  },
  {
    name: 'TransactionSummary',
    component: TransactionSumScreen,
  },
];

export default stackRoutes;
