import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import styles from './styles.js';


class Header extends Component {


    render() {
        const { classes, onMenuCLick, title } = this.props;

        return (

            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        id="menu-button"
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={onMenuCLick}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                       className={classes.titleHeader}
                        variant="h6" id="title-label" noWrap>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>

        );
    }

}
Header.propTypes = {
    title: PropTypes.string,
    onMenuCLick: PropTypes.func
};
export default withStyles(styles, { withTheme: true })(Header);

