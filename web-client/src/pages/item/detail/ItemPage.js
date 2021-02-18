import React from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import Page from "../../../components/Page";
import { Save as SaveIcon, ArrowBackIos as BackIcon } from "@material-ui/icons";
import {
    Button,
    TextField,
    CircularProgress,
    Backdrop
} from "@material-ui/core";
import { save, findById } from "../../../actions/items";
import { connect } from "react-redux";
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';


class ItemPage extends React.Component {
    constructor(props) {
        super(props);

        const { match } = this.props;

        this.state = {
            form: {
                id: match.params.id,
                name: ""
            },
            alertShow: false,
            errorMessage: "",
            error: {}
        };
    }

    componentDidMount() {
        const { form } = this.state;
        if (form.id) {
            this.props.findById(form.id);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { data, error, saveError, saveData, history } = this.props;

        if (prevProps.data !== data) {
            this.setState({ form: data });
        } else if (prevProps.error !== error) {
            this.setState({ error: error });
        } else if (error && prevProps.saveError !== saveError) {
            this.setState({ error: saveError });
        } else if (saveData && prevProps.saveData !== saveData) {
            history.push('/items');
        }
    }

    onChange = event => {
        const { name, value } = event.target;
        const { form } = this.state;

        this.setState({ form: { ...form, [name]: value } });
    };

    hideAlert = () => {
        this.setState({ alertShow: false })
    }

    onSubmit = event => {
        event.preventDefault();
        const { form } = this.state;
        if (form.name === "" ) {
            this.setState({
                alertShow: true,
                errorMessage: " name is not empty "
            });

        } else if (form.name.length <  3) {
            this.setState({
                alertShow: true,
                errorMessage: " name is minimum 3 character "
            });
        }else {
            this.props.save(this.state.form);
        }
    };

    render() {
        const { classes, loading, saveError } = this.props;
        const { form, error } = this.state;
        const errorData = saveError?.data || {};
        return (
            <Page error={error}>
                {!loading ?

                    <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
                        {form.id && (
                            <div className={classes.formField}>
                                <TextField
                                    id="id"
                                    name="id"
                                    label="ID"
                                    value={form.id}
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                />
                            </div>
                        )}
                        <div className={classes.formField}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name"
                                value={form.name}
                                fullWidth
                                error={errorData.name}
                                helperText={errorData.name ? errorData.name[0] : null}
                                onChange={this.onChange}
                            />
                        </div>

                        <Snackbar open={this.state.alertShow}
                            autoHideDuration={6000}
                            onClose={this.hideAlert}>
                            <Alert onClose={this.hideAlert}
                                elevation={6} variant="filled"
                                severity="error">
                                {this.state.errorMessage}
                            </Alert>
                        </Snackbar>

                        <div >
                            <Button
                                className={classes.formBack}
                                variant="contained" color="secondary" href="/web-client/items"
                                disabled={loading}
                                startIcon={<BackIcon />}
                            >
                                Back
                              </Button>
                            <Button
                                className={classes.formButton}
                                variant="contained" color="primary"
                                type="submit" disabled={loading}
                                startIcon={<SaveIcon />}
                            >
                                Save
                              </Button>
                        </div>
                    </form> :
                    <Backdrop
                        className={classes.backdrop}
                        open={true}
                    >
                        <CircularProgress color="primary" />
                    </Backdrop>
                }
            </Page>
        );
    }
}

const mapStateToProps = state => ({
    saveData: state.saveItem.data,
    saveError: state.saveItem.error,
    data: state.findItemById.data,
    loading: state.findItemById.loading || state.saveItem.loading,
    error: state.findItemById.error
});

const mapDispatchToProps = {
    save,
    findById
};

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps)(ItemPage)
);