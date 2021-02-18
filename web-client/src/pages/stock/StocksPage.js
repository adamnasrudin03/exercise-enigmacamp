import React, { Component } from "react";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  withStyles,
} from "@material-ui/core";
import {
  FileCopy as SummaryIcon,
  AddCircle as AddIcon,
  Cached as ReloadIcon,
} from "@material-ui/icons";

import Backdrop from "@material-ui/core/Backdrop";
import Page from "../../components/Page";
import styles from "./styles.js";
import { deleteById, findAll } from "../../actions/stocks";
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
        size: 5,
        page: 0,
      },
      error: {},
    };
  }

  componentDidMount() {
    this.reload();
  }

  componentDidUpdate(prevProps, prevState) {
    const { deleteData, deleteError, data, error } = this.props;
    const { params } = this.state;

    if (prevProps.data !== data) {
      this.setState({ data: data.list, total: data.total });
    } else if (
      prevState.params !== params ||
      prevProps.deleteData !== deleteData
    ) {
      this.reload();
    } else if (deleteError && prevProps.deleteError !== deleteError) {
      this.setState({ error: deleteError });
    } else if (error && prevProps.error !== error) {
      this.setState({ error: error });
    }
  }

  reload = () => {
    this.props.findAll(this.state.params);
  };
  onReload = () => {
    this.reload();
  };
  onAdd = () => {
    this.props.history.push("/stocks/add");
  };

  onRowsDelete = (rowsDeleted) => {
    const { list } = this.props.data;
    const { params, data } = this.state;

    const e = list[rowsDeleted.data[0].index];
    this.props.deleteById(e.id);

    if (data.length === 1) {
      this.setState({ params: { ...params, page: params.page - 1 } });
    }

    return false;
  };

  onRowClick = (rowData) => {
    this.props.history.push(`/stocks/${rowData[0]}`);
  };

  onColumnSortChange = (changeColumn, direction) => {
    const { params } = this.state;
    this.setState({
      params: { ...params, sort: direction === "descending" ? "desc" : "asc" },
    });
  };

  onChangeRowsPerPage = (numberOfRows) => {
    const { params } = this.state;
    this.setState({ params: { ...params, size: numberOfRows } });
  };

  onChangePage = (currentPage) => {
    const { params } = this.state;
    this.setState({ params: { ...params, page: currentPage } });
  };

  onSummary = () => {
    this.props.history.push("/stocks/summary");
  };

  render() {
    const { classes, loading } = this.props;

    const { data, total, params, error } = this.state;

    const columns = [
      {
        name: "id",
        label: "ID",
        options: {
          sortDirection: params.sort,
        },
      },
      {
        name: "item.name",
        label: "Name",
        options: {
          sort: false,
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
        name: "unit.name",
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
              onClick={this.onSummary}
              title="Report Summary"
              disabled={loading}
              startIcon={<SummaryIcon />}
            ></Button>
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
          title={"Stocks List"}
          data={!loading ? data : []}
          columns={columns}
          options={{
            serverSide: true,
            selectableRows: "single",
            page: params.page,
            count: total,
            rowsPerPage: params.size,
            rowsPerPageOptions: [5, 10, 15, 25, 50, 100],
            filter: false,
            search: false,
            onRowClick: this.onRowClick,
            onRowsDelete: this.onRowsDelete,
            onChangeRowsPerPage: this.onChangeRowsPerPage,
            onChangePage: this.onChangePage,
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
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  deleteData: state.deleteStockById.data,
  deleteError: state.deleteStockById.error,
  data: state.findStocks.data,
  loading: state.findStocks.loading || state.deleteStockById.loading,
  error: state.findStocks.error,
});

const mapDispatchToProps = {
  deleteById,
  findAll,
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(StocksPage)
);
