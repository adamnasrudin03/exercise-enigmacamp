import React, {Component} from 'react';
import {
  Button,
  Content,
  Container,
  Form,
  Icon,
  Item,
  Input,
  Label,
  Text,
  View,
  Right,
} from 'native-base';

import {CommonHeader} from '../../../components/CommonHeader';

import {
  showError,
  showErrorNotBlank,
  showErrorNumber,
  showErrorNumberOf,
  showErrorNumberOfZero,
} from '../../../utils/toast';
import styles from './styles';
import {connect} from 'react-redux';
import {save, findById} from '../../../action/stocks';

class StockScreen extends Component {
  constructor(props) {
    super(props);

    const {route} = this.props;
    this.state = {
      id: route.params?.id,
      item: {},
      quantity: 0,
      unit: {},
    };
  }

  componentDidMount() {
    const {id} = this.state;
    if (id) {
      this.props.findById(this.state.id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {data, error, saveError, saveData, navigation} = this.props;

    if (prevProps.data !== data) {
      this.setState({...data});
    } else if (saveData && prevProps.saveData !== saveData) {
      navigation.goBack();
    } else if (error && prevProps.error !== error) {
      showError(error);
    } else if (saveError && prevProps.saveError !== saveError) {
      showError(saveError);
    }
  }

  onChange = (name, value) => {
    this.setState({[name]: value});
  };

  onOpenItem = () => {
    this.props.navigation.navigate('ItemsOptions', {
      callBackValue: this.itemOptions,
    });
  };
  itemOptions = item => {
    this.setState({item: item});
  };

  onOpenUnit = () => {
    this.props.navigation.navigate('UnitsOptions', {
      callBackValue: this.unitOptions,
    });
  };
  unitOptions = unit => {
    this.setState({unit: unit});
  };

  onSubmit = () => {
    const {quantity, item, unit} = this.state;
    if (item.id == null || unit.id == null) {
      showErrorNotBlank();
    } else if (quantity <= 0) {
      showErrorNumberOfZero(quantity);
    } else if (quantity > 9223372036854775807) {
      showErrorNumberOf(quantity);
    } else if (isNaN(quantity)) {
      showErrorNumber(quantity);
    } else {
      this.props.save(this.state);
    }
  };

  render() {
    const {navigation, loading, saveError} = this.props;
    const {id, item, quantity, unit} = this.state;
    const errorData = saveError?.data;

    return (
      <Container>
        <CommonHeader navigation={navigation} title="Stock Detail" />

        <Content style={styles.content}>
          <Form style={styles.form}>
            <View style={styles.viewForm}>
              {id && (
                <Item floatingLabel>
                  <Label>ID</Label>
                  <Input style={styles.input} disabled value={id.toString()} />
                </Item>
              )}
              <Button transparent small onPress={this.onOpenItem}>
                <Label style={styles.textDropdown}> Name</Label>
                <Icon
                  style={styles.dropdown}
                  name="ios-arrow-dropdown"
                  type="Ionicons"
                />
              </Button>

              <Item floatingLabel error={errorData?.item != null}>
                <Input disabled value={item.name} style={styles.input} />
              </Item>

              {errorData?.item && (
                <Text style={styles.error}>{errorData?.item[0]}</Text>
              )}

              <Item floatingLabel error={errorData?.quantity != null}>
                <Label>Quantity</Label>
                <Input
                  style={styles.input}
                  id="quantity"
                  keyboardType="numeric"
                  value={quantity.toString()}
                  onChangeText={value => this.onChange('quantity', value)}
                />
              </Item>
              {errorData?.quantity && (
                <Text style={styles.error}>{errorData?.quantity[0]}</Text>
              )}

              <Button small transparent onPress={this.onOpenUnit}>
                <Label style={styles.textDropdown}> Unit Name</Label>
                <Icon
                  style={styles.dropdown}
                  name="ios-arrow-dropdown"
                  type="Ionicons"
                />
              </Button>
              <Item floatingLabel error={errorData?.unit != null}>
                <Input disabled style={styles.input} value={unit.description} />
              </Item>
              {errorData?.unit && (
                <Text style={styles.error}>{errorData?.unit[0]}</Text>
              )}

              <Button
                style={styles.button}
                full
                onPress={this.onSubmit}
                disabled={loading}>
                <Text>Save</Text>
              </Button>
            </View>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  saveData: state.savedStock.data,
  saveError: state.savedStock.error,
  data: state.stockById.data,
  loading: state.stockById.loading || state.savedStock.loading,
  error: state.stockById.error,
});

const mapDispatchToProps = {
  save,
  findById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StockScreen);
