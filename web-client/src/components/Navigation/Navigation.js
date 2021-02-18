import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import {
    Divider,
    Drawer,
    Hidden,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
    HomeOutlined as HomeIcon,
    MoveToInboxOutlined as ItemIcon,
    StorageOutlined as UnitIcon,
    StoreMallDirectoryOutlined as StockIcon,
    LocalGroceryStoreOutlined as TransactionIcon,
    AssignmentIndOutlined as AboutIcon

} from '@material-ui/icons';

import styles from './styles.js';
const menus = [
    {
        path: '/',
        icon: HomeIcon,
        label: 'Home'
    },
    {
        path: '/items',
        icon: ItemIcon,
        label: 'Item'
    },
    {
        path: '/units',
        icon: UnitIcon,
        label: 'Unit'
    },
    {
        path: '/stocks',
        icon: StockIcon,
        label: 'Stock'
    },
    {
        path: '/transactions',
        icon: TransactionIcon,
        label: 'Transaction'
    }
]

class Navigation extends Component {

    render() {
        const { classes, theme, mobileOpen, handleDrawerToggle } = this.props;
        const drawer = (
            <div >
                <div className={classes.toolbar} />
                <Divider />
                <List>
                    {menus.map((menu, index) => (
                        <Link key={index} to={menu.path} className={classes.link} >
                            <ListItem button >
                                <ListItemIcon><menu.icon /></ListItemIcon>
                                <ListItemText primary={menu.label} />
                            </ListItem>
                        </Link>
                    ))}
                </List>
                <Divider />
                <List>

                    <Link to="/about" className={classes.link} >
                        <ListItem button>
                            <ListItemIcon>
                                <AboutIcon />
                            </ListItemIcon>
                            <ListItemText primary="About" />
                        </ListItem>

                    </Link>
                </List>
            </div >
        );

        return (
            <nav className={classes.drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer

                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        );
    }

}

Navigation.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    mobileOpen: PropTypes.bool.isRequired,
    handleDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(Navigation);

