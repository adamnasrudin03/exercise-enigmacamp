import React, {Component} from 'react';
import {
  Button,
  Content,
  Container,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Text,
  View,
} from 'native-base';
import {CommonHeader} from '../../../components/CommonHeader';
import {
  showError,
  showErrorNumber,
  showErrorNumberOf,
  showErrorNumberOfZero,
} from '../../../utils/toast';
import styles from './styles';
import {connect} from 'react-redux';
import {save, findById} from '../../../action/transactions';

class TransactionScreen extends Component {
  constructor(props) {
    super(props);

    const {route} = this.props;
    this.state = {
      id: route.params?.id,
      amount: '',
      type: 'IN',
      description: '',
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
  onSubmit = () => {
    const {amount} = this.state;
    if (amount <= 0) {
      showErrorNumberOfZero(amount);
    } else if (amount > 9223372036854775807) {
      showErrorNumberOf(amount);
    } else if (isNaN(amount)) {
      showErrorNumber(amount);
    } else {
      this.props.save(this.state);
    }
  };
  onValueChange(value) {
    this.setState({
      type: value,
    });
  }
  render() {
    const {navigation, loading, saveError} = this.props;
    const {id, amount, type, description} = this.state;
    const errorData = saveError?.data;
    return (
      <Container>
        <CommonHeader navigation={navigation} title="Transaction Detail" />

        <Content style={styles.content}>
          <Form>
            {id && (
              <Item floatingLabel>
                <Label>ID</Label>
                <Input style={styles.input} disabled value={id.toString()} />
              </Item>
            )}
            <View>
              <Item floatingLabel error={errorData?.amount != null}>
                <Label>Amount</Label>
                <Input
                  style={styles.input}
                  keyboardType="numeric"
                  id="amount"
                  value={amount.toString()}
                  onChangeText={value => this.onChange('amount', value)}
                />
              </Item>
              {errorData?.amount && (
                <Text style={styles.error}>{errorData?.amount[0]}</Text>
              )}
            </View>
            <View>
              <Picker
                mode="dropdown"
                selectedValue={type}
                onValueChange={this.onValueChange.bind(this)}>
                <Picker.Item label="INCOME" value="IN" />
                <Picker.Item label="OUTCOME" value="OUT" />
              </Picker>
              {errorData?.type && (
                <Text style={styles.error}>{errorData?.type[0]}</Text>
              )}
            </View>
            <View>
              <Item floatingLabel error={errorData?.description != null}>
                <Label>Description</Label>
                <Input
                  multiline={true}
                  numberOfLines={5}
                  style={styles.input}
                  id="description"
                  value={description}
                  onChangeText={value => this.onChange('description', value)}
                />
              </Item>
              {errorData?.description && (
                <Text style={styles.error}>{errorData?.description[0]}</Text>
              )}
            </View>
            <Button
              style={styles.button}
              full
              onPress={this.onSubmit}
              disabled={loading}>
              <Text>Save</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  saveData: state.savedTransaction.data,
  saveError: state.savedTransaction.error,
  data: state.transactionById.data,
  loading: state.transactionById.loading || state.savedTransaction.loading,
  error: state.transactionById.error,
});

const mapDispatchToProps = {
  save,
  findById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionScreen);
