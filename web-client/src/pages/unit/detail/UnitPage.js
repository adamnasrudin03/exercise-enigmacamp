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
import { save, findById } from "../../../actions/units";
import { connect } from "react-redux";
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';


class UnitPage extends React.Component {
    constructor(props) {
        super(props);

        const { match } = this.props;

        this.state = {
            form: {
                id: match.params.id,
                name: "",
                description: ""
            },
            error: {},
            alertShow: false,
            errorMessage: ""
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
            history.push('/units');
        }
    }

    onChange = event => {
        const { name, description, value } = event.target;
        const { form } = this.state;

        this.setState({ form: { ...form, [name]: value, [description]: value } });
    };

    hideAlert = () => {
        this.setState({ alertShow: false })
    }

    onSubmit = event => {
        event.preventDefault();
        const { form } = this.state;
        if ((form.name === "" || form.description === "") || (form.name === "" || form.description === "")) {
            this.setState({
                alertShow: true,
                errorMessage: " name and description is not empty "
            });

        } else {
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
                                variant="contained" color="secondary" href="/web-client/units"
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
    saveData: state.saveUnit.data,
    saveError: state.saveUnit.error,
    data: state.findUnitById.data,
    loading: state.findUnitById.loading || state.saveUnit.loading,
    error: state.findUnitById.error
});

const mapDispatchToProps = {
    save,
    findById
};

export default withStyles(styles, { withTheme: true })(
    connect(mapStateToProps, mapDispatchToProps)(UnitPage)
);