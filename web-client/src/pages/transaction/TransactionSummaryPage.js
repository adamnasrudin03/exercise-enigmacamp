import React, { Component } from "react";

import {
  Button,
  ButtonGroup,
  CircularProgress,
  withStyles,
} from "@material-ui/core";
import {
  AddCircle as AddIcon,
  ArrowBackIos as BackIcon,
  Cached as ReloadIcon,
} from "@material-ui/icons";

import Backdrop from "@material-ui/core/Backdrop";
import Page from "../../components/Page";
import styles from "./styles.js";
import { findAllSummary } from "../../actions/transactions";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";

class TransactionSummaryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      params: { sort: "asc" },
      error: {},
    };
  }

  componentDidMount() {
    this.reload();
  }

  componentDidUpdate(prevProps, prevState) {
    const { data, error } = this.props;

    if (prevProps.data !== data) {
      this.setState({ data: data });
    } else if (error && prevProps.error !== error) {
      this.setState({ error: error });
    }
  }

  reload = () => {
    this.props.findAllSummary();
  };
  onReload = () => {
    this.reload();
  };
  onAdd = () => {
    this.props.history.push("/transactions/add");
  };

  onColumnSortChange = (changeColumn, direction) => {
    const { params } = this.state;
    this.setState({
      params: { ...params, sort: direction === "descending" ? "desc" : "asc" },
    });
  };

  render() {
    const { classes, loading } = this.props;

    const { data, params, error } = this.state;

    const columns = [
      {
        name: "type",
        label: "Type",
        options: {
          sortDirection: params.sort,
        },
      },
      {
        name: "amount",
        label: "Amount",
        options: {
          sort: false,
        },
      },
      {
        name: "count",
        label: "Count",
        options: {
          sort: false,
        },
      },
    ];
    return (
      <Page error={error}>
        <div className={classes.buttonGroup}>
          <ButtonGroup
            variant="text"
            size="large"
            color="primary" aria-label="large outlined primary button group">
            <Button
              onClick={this.onAdd}
              title="Add Transaction"
              disabled={loading}
              startIcon={<AddIcon />}
            ></Button>
            <Button
              onClick={this.onReload}
              title="Reload"
              disabled={loading}
              startIcon={<ReloadIcon />}
            ></Button>
          </ButtonGroup>
        </div>
        <MUIDataTable
          title={"Transactions Summary List"}
          data={!loading ? data : []}
          columns={columns}
          options={{
            serverSide: false,
            filter: false,
            search: false,
            pagination: false,
            disableToolbarSelect: false,
            selectableRows: false,
            onColumnSortChange: this.onColumnSortChange,
            textLabels: {
              body: {
                noMatch: loading ? (
                  <Backdrop className={classes.backdrop} open={true}>
                    <CircularProgress color="primary" />
                  </Backdrop>
                ) : (
                  "SORRY NOT MATCHING RECORD FOUND"
                ),
              },
            },
          }}
        />

        <div className={classes.formField}>
          <Button
            className={classes.forBack}
            variant="contained"
            color="secondary"
            href="/web-client/transactions"
            disabled={loading}
            startIcon={<BackIcon />}
          >
            Back
          </Button>
        </div>
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.summaryTransaction.data,
  loading: state.summaryTransaction.loading,
  error: state.summaryTransaction.error,
});

const mapDispatchToProps = {
  findAllSummary,
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(TransactionSummaryPage)
);
