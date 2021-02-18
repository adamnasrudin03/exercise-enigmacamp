import React, { Component } from "react";

import {
  Button,
  ButtonGroup,
  CircularProgress,
  withStyles,
} from "@material-ui/core";
import {
  AddCircle as AddIcon,
  Cached as ReloadIcon,
  ArrowBackIos as BackIcon,
} from "@material-ui/icons";

import Backdrop from "@material-ui/core/Backdrop";
import Page from "../../components/Page";
import styles from "./styles.js";
import { findAllSummary } from "../../actions/stocks";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";

class StocksPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      total: 0,
      params: {
        sort: "asc",
      },
      error: {},
    };
  }

  componentDidMount() {
    this.reload();
  }

  componentDidUpdate(prevProps, prevState) {
    const { data, error } = this.props;

    if (prevProps.data !== data) {
      this.setState({ data: data, total: data.total });
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
    this.props.history.push("/stocks/add");
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
        name: "name",
        label: "Name",
        options: {
          sortDirection: params.sort,
        },
      },
      {
        name: "quantity",
        label: "Quantity",
        options: {
          sort: false,
        },
      },
      {
        name: "description",
        label: "Unit",
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
              title="Add Stock"
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
          title={"Stocks  Summary List"}
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
            href="/web-client/stocks"
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
  data: state.summaryStock.data,
  loading: state.summaryStock.loading,
  error: state.summaryStock.error,
});

const mapDispatchToProps = {
  findAllSummary,
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(StocksPage)
);
