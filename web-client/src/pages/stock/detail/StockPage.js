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

import Autocomplete from '@material-ui/lab/Autocomplete';
import { findAll as findItems } from "../../../actions/items";
import { findAll as findUnits } from "../../../actions/units";
import { save, findById } from "../../../actions/stocks";
import { connect } from "react-redux";
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';

class StockPage extends React.Component {
    constructor(props) {
        super(props);

        const { match } = this.props;

        this.state = {
            form: {
                id: match.params.id,
                item: null,
                quantity: 0,
                unit: null
            },
            itemOptions: [],
            unitOptions: [],
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
        const { itemsData, unitsData, data, error, saveError, saveData, history } = this.props;

        if (prevProps.itemsData !== itemsData) {
            this.setState({ itemOptions: itemsData.list });
        } else if (prevProps.unitsData !== unitsData) {
            this.setState({ unitOptions: unitsData.list });
        } else if (prevProps.data !== data) {
            this.setState({ form: data });
        } else if (prevProps.error !== error) {
            this.setState({ error: error });
        } else if (prevProps.saveError !== saveError) {
            this.setState({ error: saveError });
        } else if (saveData && prevProps.saveData !== saveData) {
            history.push('/stocks');
        }
    }


    onItemChange = (event, value) => {
        const { form } = this.state;
        this.setState({ form: { ...form, item: value } })
    };
    onItemOpen = (event) => {
        this.props.findItems();
    };
    onItemTextChange = (event) => {
        const { value } = event.target;
        if (value) {
            this.props.findItems({ search: { name: value } });
        } else {
            this.setState({ itemOptions: [] });
        }
    }


    onUnitChange = (event, value) => {
        const { form } = this.state;
        this.setState({ form: { ...form, unit: value } })
    };
    onUnitOpen = (event) => {
        this.props.findUnits();
    };
    onUnitTextChange = (event) => {
        const { value } = event.target;
        if (value) {
            this.props.findUnits({ search: { name: value } });
        } else {
            this.setState({ unitOptions: [] });
        }
    }


    onChange = (event) => {
        const { value } = event.target;
        const { form } = this.state;

        this.setState({ form: { ...form, quantity: value } });
    };

    hideAlert = () => {
        this.setState({ alertShow: false })
    }

    onSubmit = (event) => {
        event.preventDefault();
        const { form } = this.state;
        if (((form.quantity === "" || form.quantity === 0) && (form.item === null || form.unit === null))
            || (form.quantity === "" || form.quantity === 0) || (form.item === null || form.unit === null)) {

            this.setState({
                alertShow: true,
                errorMessage: "Please complete the data completely and correctly,cannot be empty and contain 0. "
            });
        } else if ((form.quantity <= 0) || (form.quantity > 9223372036854775807)) {
            this.setState({
                alertShow: true,
                errorMessage: "Please complete the data completely and correctly,cannot be empty and contain 0,"
                    + "enter data quantity less than 9223372036854775807."
            });
        } else {
            this.props.save(this.state.form);
            console.log(this.state.form);
        }
    };

    render() {
        const { classes, loading, saveError, unitsLoading, itemsLoading } = this.props;
        const { form, error, unitOptions, itemOptions } = this.state;
        const errorData = saveError?.data || {};

        return (
            <Page error={error}>
                {!loading ?
                    <div className={classes.container}>
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
                                <Autocomplete
                                    autoHighlight
                                    options={!itemsLoading ? itemOptions : []}
                                    value={form.item} onChange={this.onItemChange}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    getOptionLabel={(option) => option.name}
                                    loading={itemsLoading}
                                    onOpen={this.onItemOpen}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params} label="Item" variant="outlined"
                                            disabled={itemsLoading}
                                            onChange={this.onItemTextChange}
                                            inputProps={{
                                                ...params.inputProps, autoComplete: 'new-password'
                                            }}

                                        />
                                    )}
                                />
                            </div>
                            <div className={classes.formField}>
                                <TextField
                                    id="quantity"
                                    name="quantity"
                                    label="Quantity"
                                    value={form.quantity}
                                    type="number"
                                    fullWidth
                                    error={errorData.quantity}
                                    helperText={errorData.quantity ? errorData.quantity[0] : null}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className={classes.formField}>
                                <Autocomplete
                                    autoHighlight
                                    options={!unitsLoading ? unitOptions : []}
                                    value={form.unit} onChange={this.onUnitChange}
                                    getOptionSelected={(option, value) => option.id === value.id}
                                    getOptionLabel={(option) => option.name}
                                    loading={unitsLoading}

                                    onOpen={this.onUnitOpen}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params} label="Unit" variant="outlined"
                                            disabled={itemsLoading}
                                            onChange={this.onUnitTextChange}
                                            inputProps={{
                                                ...params.inputProps, autoComplete: 'new-password'
                                            }}

                                        />
                                    )}
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

                            <div className={classes.formField}>

                                <Button
                                    className={classes.formBack}
                                    variant="contained"
                                    color="secondary"
                                    href="/web-client/stocks"
                                    disabled={loading}
                                    startIcon={<BackIcon />}
                                >
                                    Back
                              </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<SaveIcon />}
                                    type="submit"
                                    disabled={loading}
                                    className={classes.formButton}
                                >
                                    Save
                              </Button>
                            </div>
                        </form>
                    </div> :
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
    saveData: state.saveStock.data,
    saveError: state.saveStock.error,
    data: state.findStockById.data,
    loading: state.findStockById.loading || state.saveStock.loading,
    error: state.findStockById.error,

    itemsData: state.findItems.data,
    itemsLoading: state.findItems.loading,
    itemsError: state.findItems.error,

    unitsData: state.findUnits.data,
    unitsLoading: state.findUnits.loading,
    unitsError: state.findUnits.error
});

const mapDispatchToProps = {
    findItems,
    findUnits,
    save,
    findById
};

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps)(StockPage)
);