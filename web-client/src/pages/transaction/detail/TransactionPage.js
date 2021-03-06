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
import { save, findById, findAll } from "../../../actions/transactions";
import { connect } from "react-redux";
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';


class TransactionPage extends React.Component {
    constructor(props) {
        super(props);

        const { match } = this.props;

        this.state = {
            form: {
                id: match.params.id,
                amount: "",
                type: "IN",
                description: ""
            },
            error: {},
            alertShow: false,
            errorMessage: "",
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
        } else if (prevProps.saveError !== saveError) {
            this.setState({ error: saveError });
        } else if (saveData && prevProps.saveData !== saveData) {
            history.push('/transactions');
        }
    }

    onChange = (event) => {
        const { name, description, value } = event.target;
        const { form } = this.state;

        this.setState({ form: { ...form, [name]: value, [description]: value } });
    };

    onTypeOpen = (event) => {
        this.props.findAll();
    };

    hideAlert = () => {
        this.setState({ alertShow: false })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { form } = this.state;
        if (((form.amount === "" || form.amount === 0) && (form.type === "" || form.description === ""))
            || (form.type === "" || form.amount === 0) || (form.description === "" || form.amount === "")) {
            this.setState({
                alertShow: true,
                errorMessage: "Please complete the data completely and correctly,cannot be empty and contain 0."
            });

        } else if (((form.amount === "" || form.amount === 0) || (form.type === "" || form.description === ""))
            || (form.type === "" || form.description === "")) {
            this.setState({
                alertShow: true,
                errorMessage: "Please complete the data completely and correctly,cannot be empty and contain 0."
            });
        } else if ((form.amount <= 0) || (form.amount > 9223372036854775807)) {
            this.setState({
                alertShow: true,
                errorMessage: "Please complete the data completely and correctly,cannot be empty and contain 0,"
                    + "enter data amount less than 9223372036854775807."
            });
        } else {
            this.props.save(this.state.form);
        };
    };

    render() {
        const { classes, loading, saveError } = this.props;
        const { form, error } = this.state;
        const errorData = saveError?.data || {};
        const typeTransaction = [
            {
                label: "INCOME",
                value: "IN",
            },
            {
                label: "OUTCOME",
                value: "OUT",
            }
        ];
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
                                id="type"
                                name="type"
                                label="Type"
                                select
                                value={form.type}
                                fullWidth
                                onChange={this.onChange}
                                SelectProps={{
                                    native: true
                                }}
                            >
                                {typeTransaction.map(option => (
                                    <option key={option.value} value={option.value} placeholder="Type">
                                        {option.label}
                                    </option>
                                ))}


                            </TextField>
                        </div>
                        <div className={classes.formField}>
                            <TextField
                                id="amount"
                                name="amount"
                                label="Amount"
                                type="number"
                                value={form.amount}
                                fullWidth
                                error={errorData.amount}
                                helperText={errorData.amount ? errorData.amount[0] : null}
                                onChange={this.onChange}

                            />
                        </div>

                        <div className={classes.formField}>
                            <TextField
                                id="description"
                                name="description"
                                label="Description"
                                value={form.description}
                                fullWidth
                                error={errorData.description}
                                helperText={errorData.description ? errorData.description[0] : null}
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
                                variant="contained" color="secondary" href="/web-client/transactions"
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
    saveData: state.saveTransaction.data,
    saveError: state.saveTransaction.error,
    data: state.findTransactionById.data,
    loading: state.findTransactionById.loading || state.saveTransaction.loading,
    error: state.findTransactionById.error
});

const mapDispatchToProps = {
    save,
    findById, findAll
};

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps)(TransactionPage)
);