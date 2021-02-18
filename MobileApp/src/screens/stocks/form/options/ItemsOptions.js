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

import {CommonHeader} from '../../../../components/CommonHeader';
import styles from '../styles';
import {RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {showError} from '../../../../utils/toast';
import {findAllItems} from '../../../../action/items';
import {FlatList} from 'react-native-gesture-handler';

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

class ItemsOptions extends Component {
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
    const {data, error} = this.props;

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
    } else if (error && prevProps.error !== error) {
      showError(error);
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

  onShowForm = item => {
    this.props.route.params.callBackValue(item);

    this.props.navigation.goBack();
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
        <CommonHeader navigation={navigation} title="Items Options" />
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
          <FlatList
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
            }
            data={data}
            renderItem={({item}) => (
              <RowItem item={item} onPress={this.onShowForm} />
            )}
            keyExtractor={item => item.id.toString()}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
          />
        </View>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  data: state.items.data,
  loading: state.items.loading,
  error: state.items.error,
});

const mapDispatchToProps = {
  findAllItems,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemsOptions);
