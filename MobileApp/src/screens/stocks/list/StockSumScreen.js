import React, {Component} from 'react';
import {
  Body,
  Button,
  Container,
  Left,
  ListItem,
  Icon,
  Item,
  Fab,
  Right,
  Text,
  View,
} from 'native-base';

import {CommonHeader} from '../../../components/CommonHeader';
import styles from './styles';
import {RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {showError} from '../../../utils/toast';
import {findAllSummary} from '../../../action/stocks';
import {SwipeListView} from 'react-native-swipe-list-view';

function RowStockSummary({summary}) {
  return (
    <ListItem thumbnail>
      <Body>
        <Text>{summary.name}</Text>
        <Text note numberOfLines={1}>
          {summary.quantity}
        </Text>
      </Body>
      <Right>
        <Text> {summary.description}</Text>
      </Right>
    </ListItem>
  );
}

class StockSumScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      total: 0,
      params: {
        page: 0,
        sort: 'asc',
      },
    };
  }

  componentDidMount() {
    this.reload();
  }

  componentDidUpdate(prevProps, prevState) {
    const {data, error} = this.props;

    if (prevProps.data !== data) {
      this.setState({
        data: [...this.state.data, ...data],
        total: data.total,

        params: {
          ...this.state.params,
          page: data.page,
        },
      });
    } else if (error && prevProps.error !== error) {
      showError(error);
    }
  }

  reload({sort = 'asc', page = 0} = {}) {
    this.props.findAllSummary({sort, page});
  }

  onRefresh = () => {
    const {params} = this.state;
    this.setState({data: [], total: 0, params: {...params, page: 0}}, () =>
      this.reload(this.state.params),
    );
  };

  onEndReached = () => {
    const {data, total, params} = this.state;
    if (data.length < total) {
      this.reload({
        ...params,
        page: params.page + 1,
      });
    }
  };

  render() {
    const {navigation, loading} = this.props;
    const {data} = this.state;

    return (
      <Container>
        <CommonHeader navigation={navigation} title="Stocks Summary" />
        <View style={styles.content}>
          <SwipeListView
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
            }
            data={data}
            renderItem={({item: summary}) => (
              <RowStockSummary summary={summary} />
            )}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
          />
        </View>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  data: state.stocksSummary.data,
  loading: state.stocksSummary.loading,
  error: state.stocksSummary.error,
});

const mapDispatchToProps = {
  findAllSummary,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StockSumScreen);
