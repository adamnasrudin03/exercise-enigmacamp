import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Header from '../Header';
import Navigation from '../Navigation';
import styles from './styles.js';

import PropTypes from 'prop-types';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

class Page extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false,
            alertShow: false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { error } = this.props;
        if (prevProps.error !== error) {
            this.setState({ alertShow: true })
        }
    }

    handleDrawerToggle = () => {
        this.setState({ drawerOpen: !this.state.drawerOpen })
    }
    hideAlert = () => {
        this.setState({ alertShow: false })
    }
    render() {
        const { classes, children, error } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <Header title='Inventory Logistic Bootcamp'  className={classes.title} onMenuCLick={this.handleDrawerToggle} />
                <Navigation mobileOpen={this.state.drawerOpen}
                    handleDrawerToggle={this.handleDrawerToggle} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {children}

                    <Snackbar open={this.state.alertShow}
                        autoHideDuration={3000}
                        onClose={this.hideAlert}>

                        <Alert onClose={this.hideAlert}
                            elevation={6} variant="filled"
                            severity="error">
                            {error?.message}
                        </Alert>

                    </Snackbar>
                </main>
            </div>

        );
    }

}
Page.propTypes = {
    error: PropTypes.object
};
export default withStyles(styles, { withTheme: true })(Page);