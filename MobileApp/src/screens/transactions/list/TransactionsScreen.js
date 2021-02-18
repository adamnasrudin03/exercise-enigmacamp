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
  Input,
} from 'native-base';

import {CommonHeader} from '../../../components/CommonHeader';
import styles from './styles';
import {Alert, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {showError, showErrorSearch} from '../../../utils/toast';
import {deleteById, findAllTransactions} from '../../../action/transactions';
import {SwipeListView} from 'react-native-swipe-list-view';

function RowTransaction({onPress, transaction}) {
  return (
    <ListItem
      thumbnail
      style={styles.transaction}
      onPress={() => onPress(transaction)}>
      <Left>
        <Icon style={styles.iconSize} name="shopping-bag" type="Entypo" />
      </Left>
      <Body>
        <Text>Rp.{transaction.amount}</Text>
        <Text note>{transaction.type}</Text>
        <Text note>{transaction.description}</Text>
      </Body>
      <Right>
        <Icon active name="arrow-right-circle" type="Feather" />
      </Right>
    </ListItem>
  );
}

class TransactionsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: '',
      total: 0,
      params: {
        page: 0,
        search: '',
        sort: 'asc',
      },
      active: false,
    };
  }

  componentDidMount() {
    this.reload();
  }

  componentDidUpdate(prevProps, prevState) {
    const {data, saveData, error, deletedData, deletedError} = this.props;

    if (prevProps.data !== data) {
      this.setState({
        data: [...this.state.data, ...data.list],
        total: data.total,
        search: this.state.params.search,
        params: {
          ...this.state.params,
          page: data.page,
        },
      });
    } else if (
      prevProps.saveData !== saveData ||
      prevProps.deletedData !== deletedData
    ) {
      this.onRefresh();
    } else if (error && prevProps.error !== error) {
      showError(error);
    } else if (deletedError && prevProps.deletedError !== deletedError) {
      showError(deletedError);
    }
  }

  reload({search, sort = 'asc', page = 0} = {}) {
    this.props.findAllTransactions({search: {type: search}, sort, page});
  }

  onRefresh = () => {
    const {params} = this.state;
    this.setState({data: [], total: 0, params: {...params, page: 0}}, () =>
      this.reload(this.state.params),
    );
  };

  onDelete = transaction => {
    Alert.alert('Confirmation', 'Delete this transaction ?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: () => this.props.deleteById(transaction.id)},
    ]);
  };

  onShowForm = transaction => {
    this.props.navigation.navigate(
      'Transaction',
      transaction ? {id: transaction.id} : null,
    );
  };

  onSummary = () => {
    this.props.navigation.navigate('TransactionSummary');
  };
  OnSearch = () => {
    const {search, params} = this.state;
    if (
      search.toUpperCase() === 'IN' ||
      search.toUpperCase() === 'OUT' ||
      search === ''
    ) {
      this.setState(
        {
          data: [],
          total: 0,
          params: {...params, search: search.toUpperCase(), page: 0},
        },
        () => this.reload(this.state.params),
      );
    } else {
      showErrorSearch();
    }
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
    const {data, search} = this.state;

    return (
      <Container>
        <CommonHeader navigation={navigation} title="Transactions" />
        <View style={styles.content}>
          <Item>
            <Input
              placeholder="Search"
              value={search}
              onChangeText={search => this.setState({search})}
            />
            <Button transparent onPress={this.OnSearch}>
              <Icon name="search" />
            </Button>
          </Item>
          <SwipeListView
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
            }
            data={data}
            renderItem={({item: transaction}) => (
              <RowTransaction
                onPress={this.onShowForm}
                transaction={transaction}
              />
            )}
            renderHiddenItem={data => (
              <View style={styles.hiddenTransaction}>
                <Button transparent onPress={() => this.onDelete(data.item)}>
                  <Icon
                    name="delete"
                    type="AntDesign"
                    style={styles.iconDelete}
                  />
                </Button>
              </View>
            )}
            leftOpenValue={75}
            keyExtractor={transaction => transaction.id.toString()}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
          />
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={styles.fab}
            position="bottomRight"
            onPress={() => this.setState({active: !this.state.active})}>
            <Icon name="options" type="SimpleLineIcons" />
            <Button onPress={this.onShowForm} title="Add Transaction">
              <Icon name="add-shopping-cart" type="MaterialIcons" />
            </Button>
            <Button onPress={this.onSummary}>
              <Icon
                name="file-document-outline"
                type="MaterialCommunityIcons"
                title="Report Summary"
              />
            </Button>
          </Fab>
        </View>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  saveData: state.savedTransaction.data,
  deletedData: state.deletedTransactionById.data,
  deletedError: state.deletedTransactionById.error,
  data: state.transactions.data,
  loading: state.transactions.loading || state.deletedTransactionById.loading,
  error: state.transactions.error,
});

const mapDispatchToProps = {
  deleteById,
  findAllTransactions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionsScreen);
