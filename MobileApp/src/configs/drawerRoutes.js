import {HomeScreen} from '../screens/home';
import {ItemsScreen} from '../screens/items';
import {UnitsScreen} from '../screens/units';
import {StocksScreen} from '../screens/stocks';
import {TransactionsScreen} from '../screens/transactions';

export const drawerRoutes = [
  {
    name: 'Home',
    component: HomeScreen,
  },
  {
    name: 'Items',
    component: ItemsScreen,
  },
  {
    name: 'Units',
    component: UnitsScreen,
  },
  {
    name: 'Stocks',
    component: StocksScreen,
  },
  {
    name: 'Transactions',
    component: TransactionsScreen,
  },
];

export default drawerRoutes;
