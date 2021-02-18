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
import {showError} from './../../../utils/toast';
import {deleteById, findAllItems} from '../../../action/items';
import {SwipeListView} from 'react-native-swipe-list-view';

function RowItem({onPress, item}) {
  return (
    <ListItem thumbnail style={styles.item} onPress={() => onPress(item)}>
      <Left>
        <Icon name="tagso" type="AntDesign" />
      </Left>
      <Body>
        <Text>{item.name}</Text>
      </Body>
      <Right>
        <Icon active name="arrow-right-circle" type="Feather" />
      </Right>
    </ListItem>
  );
}

class ItemsScreen extends Component {
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
      error: null,
    };
  }

  componentDidMount() {
    this.reload(this.state.params);
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
    this.props.findAllItems({search: {name: search}, sort, page});
  }

  onRefresh = () => {
    const {params} = this.state;
    this.setState({data: [], total: 0, params: {...params, page: 0}}, () =>
      this.reload(this.state.params),
    );
  };

  onDelete = item => {
    Alert.alert('Confirmation', 'Delete this item ?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: () => this.props.deleteById(item.id)},
    ]);
  };

  onShowForm = item => {
    this.props.navigation.navigate('Item', item ? {id: item.id} : null);
  };
  OnSearch = () => {
    const {search, params} = this.state;
    this.setState(
      {data: [], total: 0, params: {...params, search: search, page: 0}},
      () => this.reload(this.state.params),
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
    const {data, search} = this.state;

    return (
      <Container>
        <CommonHeader navigation={navigation} title="Items" />
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
            renderItem={({item}) => (
              <RowItem onPress={this.onShowForm} item={item} />
            )}
            renderHiddenItem={data => (
              <View style={styles.hiddenItem}>
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
            keyExtractor={item => item.id.toString()}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
          />

          <Fab onPress={this.onShowForm}>
            <Icon name="add" />
          </Fab>
        </View>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  saveData: state.savedItem.data,
  deletedData: state.deletedItemById.data,
  deletedError: state.deletedItemById.error,
  data: state.items.data,
  loading: state.items.loading || state.deletedItemById.loading,
  error: state.items.error,
});

const mapDispatchToProps = {
  deleteById,
  findAllItems,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemsScreen);
