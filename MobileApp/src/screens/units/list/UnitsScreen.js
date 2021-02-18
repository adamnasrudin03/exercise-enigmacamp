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
import {deleteById, findAllUnits} from '../../../action/units';
import {SwipeListView} from 'react-native-swipe-list-view';

function RowUnit({onPress, unit}) {
  return (
    <ListItem thumbnail style={styles.unit} onPress={() => onPress(unit)}>
      <Left>
        <Icon name="unity" type="MaterialCommunityIcons" />
      </Left>
      <Body>
        <Text>{unit.name}</Text>
      </Body>
      <Right>
        <Icon active name="arrow-right-circle" type="Feather" />
      </Right>
    </ListItem>
  );
}

class UnitsScreen extends Component {
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
    this.props.findAllUnits({search: {name: search}, sort, page});
  }

  onRefresh = () => {
    const {params} = this.state;
    this.setState({data: [], total: 0, params: {...params, page: 0}}, () =>
      this.reload(this.state.params),
    );
  };

  onDelete = unit => {
    Alert.alert('Confirmation', 'Delete this unit ?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: () => this.props.deleteById(unit.id)},
    ]);
  };

  onShowForm = unit => {
    this.props.navigation.navigate('Unit', unit ? {id: unit.id} : null);
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
        <CommonHeader navigation={navigation} title="Units" />
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
            renderItem={({item: unit}) => (
              <RowUnit onPress={this.onShowForm} unit={unit} />
            )}
            renderHiddenItem={data => (
              <View style={styles.hiddenUnit}>
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
            keyExtractor={unit => unit.id.toString()}
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
  saveData: state.savedUnit.data,
  deletedData: state.deletedUnitById.data,
  deletedError: state.deletedUnitById.error,
  data: state.units.data,
  loading: state.units.loading || state.deletedUnitById.loading,
  error: state.units.error,
});

const mapDispatchToProps = {
  deleteById,
  findAllUnits,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnitsScreen);
