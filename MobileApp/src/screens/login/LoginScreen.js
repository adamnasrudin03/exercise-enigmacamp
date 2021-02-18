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
  Icon,
} from 'native-base';
import {ImageBackground} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import {loginData} from './../../action/login';
import {showError} from './../../utils/toast';

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      showPassword: true,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {data, error, navigation} = this.props;
    if (prevProps.data !== data) {
      if (data?.username != null) {
        navigation.navigate('Main');
      }
    } else if (error && prevProps.error !== error) {
      showError(error);
    }
  }

  onChange = (name, value) => {
    this.setState({[name]: value});
  };
  onSubmit = () => {
    this.props.loginData(this.state);
  };
  onShowPassword = () => {
    const {showPassword} = this.state;
    this.setState({[showPassword]: false});
  };
  render() {
    const {navigation} = this.props;
    const {username, password, showPassword} = this.state;
    return (
      <Container>
        <Content>
          <ImageBackground
            source={require('../../../Assets/images/loginScreen.jpeg')}
            style={styles.backgroundImage}>
            <Form style={styles.form}>
              <View style={styles.viewForm}>
                <Item floatingLabel>
                  <Icon style={styles.iconHead} name="user" type="AntDesign" />

                  <Label>Username</Label>
                  <Input
                    style={styles.input}
                    value={username}
                    onChangeText={value => this.onChange('username', value)}
                  />
                </Item>

                <Item floatingLabel>
                  <Icon style={styles.iconHead} name="lock" type="AntDesign" />

                  <Label>Password</Label>
                  <Input
                    style={styles.input}
                    secureTextEntry={showPassword}
                    value={password}
                    onChangeText={value => this.onChange('password', value)}
                  />

                  <Icon
                    style={styles.iconHead}
                    active
                    onPress={() => this.onShowPassword}
                    name="eye-off"
                    type="Feather"
                  />
                </Item>
                {/* <Button
                  style={styles.buttonTo}
                  medium
                  block
                  success
                  onPress={() => navigation.navigate('Main')}>
                  <Text>Login</Text>
                </Button> */}
                <Button
                  style={styles.buttonTo}
                  medium
                  block
                  success
                  onPress={this.onSubmit}>
                  <Text>Login</Text>
                </Button>
              </View>
            </Form>
          </ImageBackground>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  data: state.login.data,
  loading: state.login.loading,
  error: state.login.error,
});

const mapDispatchToProps = {
  loginData,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
