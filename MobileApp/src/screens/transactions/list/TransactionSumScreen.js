import React, {Component} from 'react';
import {
  Body,
  Container,
  Left,
  ListItem,
  Icon,
  Text,
  View,
  Right,
} from 'native-base';

import {CommonHeader} from '../../../components/CommonHeader';
import styles from './styles';
import {RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {showError} from '../../../utils/toast';
import {findAllSummary} from '../../../action/transactions';
import {SwipeListView} from 'react-native-swipe-list-view';

function RowTransactionSum({summary}) {
  return (
    <ListItem thumbnail>
      <Left>
        <Icon style={styles.iconSize} name="shopping-bag" type="Entypo" />
      </Left>
      <Body>
        <Text>Rp.{summary.amount}</Text>
        <Text note numberOfLines={1}>
          {summary.type}
        </Text>
      </Body>
      <Right>
        <Text>From : {summary.count}</Text>
      </Right>
    </ListItem>
  );
}

class TransactionSumScreen extends Component {
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
    this.reload(this.state.params);
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
        <CommonHeader navigation={navigation} title="Transaction Summary" />
        <View style={styles.content}>
          <SwipeListView
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
            }
            data={data}
            renderItem={({item: summary}) => (
              <RowTransactionSum summary={summary} />
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
  data: state.transactionsSummary.data,
  loading: state.transactionsSummary.loading,
  error: state.transactionsSummary.error,
});

const mapDispatchToProps = {
  findAllSummary,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionSumScreen);
