import React, {Component} from 'react';
import {
  Body,
  Card,
  CardItem,
  Content,
  Container,
  ListItem,
  Icon,
  Text,
  Right,
  View,
} from 'native-base';
import {ImageBackground} from 'react-native';
import {CommonHeader} from '../../components/CommonHeader';

import styles from './styles';
import AppIntroSlider from 'react-native-app-intro-slider';
const slides = [
  {
    key: 1,
    target: 'Home',
    desc: 'Welcome application control logistics inventory',
    image: require('../../../Assets/images/homeScreen.png'),
  },
  {
    key: 2,
    target: 'StockSummary',
    desc: 'Report Stock summary',
    image: require('../../../Assets/images/stockSum.png'),
  },
  {
    key: 3,
    target: 'TransactionSummary',
    desc: 'Report Transaction Stock',
    image: require('../../../Assets/images/transactionSum.jpg'),
  },
];
class HomeScreen extends Component {
  renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon style={styles.nextButton} name="md-arrow-round-forward" />
      </View>
    );
  };
  renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon style={styles.nextButton} name="md-checkmark" />
      </View>
    );
  };
  renderItem = ({item}) => {
    const {navigation} = this.props;
    return (
      <View style={styles.slide}>
        <ImageBackground source={item.image} style={styles.backgroundImage} />

        <ListItem
          style={styles.listContent}
          icon
          onPress={() => navigation.navigate(item.target)}>
          <Body>
            <Text style={styles.content}>{item.desc}</Text>
          </Body>
          <Right>
            <Icon
              style={styles.content}
              name="cursor-default-click-outline"
              type="MaterialCommunityIcons"
            />
          </Right>
        </ListItem>
      </View>
    );
  };
  render() {
    const {navigation} = this.props;
    return (
      <Container>
        <CommonHeader navigation={navigation} title="Home" />

        <Content>
          <AppIntroSlider
            autoplay
            style={styles.cardContent}
            renderItem={this.renderItem}
            data={slides}
            renderDoneButton={this.renderDoneButton}
            renderNextButton={this.renderNextButton}
            showPrevButton
          />
          <Card>
            <Text style={styles.textTitle}> Home</Text>
            <CardItem>
              <Text style={styles.textContent}>
                &emsp;&emsp;Coding Bootcamp is an informatics science training
                program with material relevant to industry needs so that it has
                a greater impact on career opportunities. There are many
                programs that Coding Bootcamp can offer, including programming a
                website, software, Android. The duration of the program is also
                relatively short, which is 12 to 24 weeks, making Bootcamp a
                very effective program. For learning, usually use the method of
                direct practice and assisted by several instructors that you can
                always discuss. Classes also usually consist of only 15-20
                people so that the message is conveyed more clearly. The
                curriculum of Bootcamp is also designed by experienced and
                professional instructors and direct practitioners so that
                students are truly ready to enter the workforce directly upon
                graduation. &emsp;&emsp;Then, you will also be equipped with
                other skills that are also needed in the world of work, such as
                making a resume, how to successfully deal with interviews, etc.
                Then another advantage is that you are helped to get a job, even
                the Bootcamp partner hiring partner is ready to recruit when you
                are done. And this is a Mobile Application, to control logistics
                inventory during bootcamp training.
              </Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

export default HomeScreen;
