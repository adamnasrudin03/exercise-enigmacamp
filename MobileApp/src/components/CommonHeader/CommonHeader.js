import React, {Component} from 'react';
import styles from './styles';
import {Body, Button, Header, Icon, Left, Title} from 'native-base';

import PropTypes from 'prop-types';

class CommonHeader extends Component {
  onMenuPress = () => {
    this.props.navigation.openDrawer();
  };

  onBackPress = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {navigation, hideLeftButton, title} = this.props;
    return (
      <Header style={styles.appBar}>
        {!hideLeftButton && (
          <Left>
            {typeof navigation.openDrawer === 'function' ? (
              <Button onPress={this.onMenuPress}>
                <Icon name="md-menu" type="Ionicons" />
              </Button>
            ) : (
              <Button onPress={this.onBackPress}>
                <Icon name="md-arrow-round-back" type="Ionicons" />
              </Button>
            )}
          </Left>
        )}
        <Body>
          <Title style={styles.title}>{title}</Title>
        </Body>
      </Header>
    );
  }
}

CommonHeader.propTypes = {
  navigation: PropTypes.object.isRequired,
  hideLeftButton: PropTypes.bool,
  title: PropTypes.string,
};

export default CommonHeader;
