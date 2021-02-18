import React, {Component} from 'react';
import {
  Body,
  Button,
  Container,
  Left,
  ListItem,
  Icon,
  Right,
  Text,
  View,
  Input,
  Item,
} from 'native-base';

import {CommonHeader} from '../../../../components/CommonHeader';
import styles from '../styles';
import {RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import {showError} from '../../../../utils/toast';
import {findAllUnits} from '../../../../action/units';
import {FlatList} from 'react-native-gesture-handler';

function RowUnit({onPress, unit}) {
  return (
    <ListItem thumbnail style={styles.unit} onPress={() => onPress(unit)}>
      <Left>
        <Icon name="unity" type="MaterialCommunityIcons" />
      </Left>
      <Body>
        <Text>{unit.name}</Text>
        <Text note>{unit.description}</Text>
      </Body>
      <Right>
        <Icon active name="arrow-right-circle" type="Feather" />
      </Right>
    </ListItem>
  );
}

class UnitsOptions extends Component {
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
    this.props.findAllUnits({search: {name: search}, sort, page});
  }

  onRefresh = () => {
    const {params} = this.state;
    this.setState({data: [], total: 0, params: {...params, page: 0}}, () =>
      this.reload(this.state.params),
    );
  };

  onShowForm = unit => {
    this.props.route.params.callBackValue(unit);

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
        <CommonHeader navigation={navigation} title="Units Options" />
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
            renderItem={({item: unit}) => (
              <RowUnit unit={unit} onPress={this.onShowForm} />
            )}
            keyExtractor={unit => unit.id.toString()}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
          />
        </View>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  data: state.units.data,
  loading: state.units.loading,
  error: state.units.error,
});

const mapDispatchToProps = {
  findAllUnits,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnitsOptions);
