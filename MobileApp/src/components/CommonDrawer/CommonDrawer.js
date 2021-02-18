import React, {Component} from 'react';
import styles from './styles';
import {ImageBackground} from 'react-native';
import {
  Text,
  Container,
  Content,
  ListItem,
  Left,
  Icon,
  Body,
  Button,
} from 'native-base';

const items = [
  {
    icon: 'home',
    type: 'Feather',
    label: 'Home',
    target: 'Home',
  },
  {
    icon: 'tags',
    type: 'AntDesign',
    label: 'Items',
    target: 'Items',
  },
  {
    icon: 'unity',
    type: 'Fontisto',
    label: 'Units',
    target: 'Units',
  },
  {
    icon: 'shop',
    type: 'Entypo',
    label: 'Stocks',
    target: 'Stocks',
  },
  {
    icon: 'shopping-cart',
    type: 'Feather',
    label: 'Transactions',
    target: 'Transactions',
  },
];

function DrawerItems({navigation, item}) {
  return (
    <ListItem icon onPress={() => navigation.navigate(item.target)}>
      <Left>
        <Icon style={styles.icon} name={item.icon} type={item.type} />
      </Left>
      <Body>
        <Text>{item.label}</Text>
      </Body>
    </ListItem>
  );
}

class CommonDrawer extends Component {
  onLogOut = () => {
    this.props.navigation.navigate('Login');
  };
  render() {
    const {navigation} = this.props;

    return (
      <Container>
        <Content>
          <ImageBackground
            source={require('../../../Assets/images/drawer.jpg')}
            style={styles.image}>
            <Button
              style={styles.buttonLogin}
              transparent
              onPress={this.onLogOut}>
              <Icon style={styles.iconHead} name="logout" type="AntDesign" />
            </Button>
            <Text style={styles.textDrawer}>
              <Icon
                style={styles.iconHead}
                name="user-secret"
                type="FontAwesome"
              />
              Welcom @adamnasrudin
            </Text>
          </ImageBackground>
          {items.map((item, index) => (
            <DrawerItems key={index} navigation={navigation} item={item} />
          ))}
        </Content>
      </Container>
    );
  }
}

export default CommonDrawer;
