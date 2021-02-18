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
import {showError} from '../../../utils/toast';
import {deleteById, findAllStocks} from '../../../action/stocks';
import {SwipeListView} from 'react-native-swipe-list-view';

function RowStock({onPress, stock}) {
  return (
    <ListItem thumbnail style={styles.stock} onPress={() => onPress(stock)}>
      <Left>
        <Icon name="shop" type="Entypo" />
      </Left>
      <Body>
        <Text>{stock.item.name}</Text>
        <Text note numberOfLines={1}>
          {stock.quantity}
        </Text>
        <Text note>{stock.unit.name}</Text>
      </Body>
      <Right>
        <Icon active name="arrow-right-circle" type="Feather" />
      </Right>
    </ListItem>
  );
}

class StocksScreen extends Component {
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

  reload({sort = 'asc', page = 0} = {}) {
    this.props.findAllStocks({sort, page});
  }

  onRefresh = () => {
    const {params} = this.state;
    this.setState({data: [], total: 0, params: {...params, page: 0}}, () =>
      this.reload(this.state.params),
    );
  };

  onDelete = stock => {
    Alert.alert('Confirmation', 'Delete this stock ?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: () => this.props.deleteById(stock.id)},
    ]);
  };

  onShowForm = stock => {
    this.props.navigation.navigate('Stock', stock ? {id: stock.id} : null);
  };
  OnSearch = () => {
    const {params} = this.state;
    this.setState(
      {
        data: [],
        total: 0,
        params: {...params, page: 0},
      },
      () => this.reload(this.state.params),
    );
  };
  onSummary = () => {
    this.props.navigation.navigate('StockSummary');
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
        <CommonHeader navigation={navigation} title="Stocks" />
        <View style={styles.content}>
          <SwipeListView
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
            }
            data={data}
            renderItem={({item: stock}) => (
              <RowStock onPress={this.onShowForm} stock={stock} />
            )}
            renderHiddenItem={data => (
              <View style={styles.hiddenStock}>
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
            keyExtractor={stock => stock.id.toString()}
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
              <Icon name="add" />
            </Button>
            <Button title="Report Summary" onPress={this.onSummary}>
              <Icon
                name="file-document-outline"
                type="MaterialCommunityIcons"
              />
            </Button>
          </Fab>
        </View>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  saveData: state.savedStock.data,
  deletedData: state.deletedStockById.data,
  deletedError: state.deletedStockById.error,
  data: state.stocks.data,
  loading: state.stocks.loading || state.deletedStockById.loading,
  error: state.stocks.error,
});

const mapDispatchToProps = {
  deleteById,
  findAllStocks,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StocksScreen);
