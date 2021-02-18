import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  content: {
    color: 'white',
  },
  note: {
    color: 'black',
    fontSize: 8,
  },
  // textContent: {
  //   paddingTop: 20,
  //   color: 'black',
  //   fontSize: 12,
  // },
  listContent: {
    width: 320,
  },
  item: {
    flex: 1,
  },
  hiddenItem: {
    padding: 10,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  iconDelete: {
    fontSize: 20,
    color: 'red',
  },
  slide: {
    width: 400,
    height: 400,
    backgroundColor: '#616161',
  },
  slideCard: {
    fontSize: 16,
    backgroundColor: '#616161',
  },
  textTitle: {
    fontSize: 20,
    marginTop: 20,
    borderColor: 'black',
  },
  textContent: {
    marginTop: 10,
    textAlign: 'justify',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButton: {
    color: 'white',
    fontSize: 25,
  },
  backgroundImage: {
    alignSelf: 'center',
    height: 250,
    width: 400,
  },
});
export default styles;
