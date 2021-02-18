import React, {Component} from 'react';
import {
  Button,
  Content,
  Container,
  Form,
  Item,
  Input,
  Label,
  Text,
  View,
} from 'native-base';
import {CommonHeader} from '../../../components/CommonHeader';
import {showError} from './../../../utils/toast';
import styles from './styles';
import {connect} from 'react-redux';
import {save, findById} from '../../../action/items';

class ItemScreen extends Component {
  constructor(props) {
    super(props);

    const {route} = this.props;
    this.state = {
      id: route.params?.id,
      name: '',
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
      console.log('save error', saveError);
      showError(saveError);
    }
  }

  onChange = (name, value) => {
    this.setState({[name]: value});
  };
  onSubmit = () => {
    this.props.save(this.state);
  };
  render() {
    const {navigation, loading, saveError} = this.props;
    const {id, name} = this.state;
    const errorData = saveError?.data;
    return (
      <Container>
        <CommonHeader navigation={navigation} title="Item Detail" />

        <Content style={styles.content}>
          <Form>
            {id && (
              <Item floatingLabel>
                <Label>ID</Label>
                <Input style={styles.input} disabled value={id.toString()} />
              </Item>
            )}
            <View>
              <Item floatingLabel error={errorData?.name != null}>
                <Label>Name</Label>
                <Input
                  style={styles.input}
                  id="name"
                  value={name}
                  onChangeText={value => this.onChange('name', value)}
                />
              </Item>
              {errorData?.name && (
                <Text style={styles.error}>{errorData?.name[0]}</Text>
              )}
            </View>
            <Button
              style={styles.button}
              block
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
  saveData: state.savedItem.data,
  saveError: state.savedItem.error,
  data: state.itemById.data,
  loading: state.itemById.loading || state.savedItem.loading,
  error: state.itemById.error,
});

const mapDispatchToProps = {
  save,
  findById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemScreen);
