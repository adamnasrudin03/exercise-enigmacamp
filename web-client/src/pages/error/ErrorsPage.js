import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from "@material-ui/core";
import { ArrowBackIos as BackIcon } from "@material-ui/icons";
import Page from '../../components/Page';

class ErrorsPage extends Component {


    render() {
        return (
            <Page>

                <div>
                    <img src="errorImage.svg" alt="Error page" />
                    <h1> {this.props.code} Page Not Found</h1>

                    <Button
                        variant="contained"
                        color="primary"
                        href="/"
                        startIcon={<BackIcon />}
                    >
                        Back
                     </Button>
                </div>

            </Page>
        );
    }

}
ErrorsPage.propTypes = {
    code: PropTypes.number.isRequired
};

export default ErrorsPage;