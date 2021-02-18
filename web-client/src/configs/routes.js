
import { AboutPage } from '../pages/about';
import { ItemsPage, ItemPage } from '../pages/item';
import { StocksPage, StockPage, StockSummaryPage } from '../pages/stock';
import { TransactionsPage, TransactionPage, TransactionSummaryPage } from '../pages/transaction';
import { UnitsPage, UnitPage } from '../pages/unit';

import { ErrorsPage } from "../pages/error";


const routes = [
    {
        path: '/',
        component: TransactionsPage,
        exact: true
    },
    {
        path: '/items',
        component: ItemsPage
    },
    {
        path: '/items/add',
        component: ItemPage
    },
    {
        path: '/items/:id',
        component: ItemPage
    },
    {
        path: '/units',
        component: UnitsPage
    },
    {
        path: '/units/add',
        component: UnitPage
    },
    {
        path: '/units/:id',
        component: UnitPage
    },
    {
        path: '/stocks',
        component: StocksPage
    },
    {
        path: '/stocks/summary',
        component: StockSummaryPage
    },
    {
        path: '/stocks/add',
        component: StockPage
    },
    {
        path: '/stocks/:id',
        component: StockPage
    },
    {
        path: '/transactions',
        component: TransactionsPage
    },
    {
        path: '/transactions/summary',
        component: TransactionSummaryPage
    },
    {
        path: '/transactions/add',
        component: TransactionPage
    },
    {
        path: '/transactions/:id',
        component: TransactionPage
    },

    {
        path: '/about',
        component: AboutPage,

    },
    {
        path: '*',
        component: ErrorsPage,
        props: {
            code: 404
        }
    }
];

export default routes;