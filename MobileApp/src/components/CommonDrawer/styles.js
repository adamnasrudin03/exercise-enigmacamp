import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    padding: 10,
    height: 250,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  textDrawer: {
    padding: 10,
    color: 'white',
    marginTop: 150,
    justifyContent: 'flex-end',
  },
  buttonLogin: {
    position: 'absolute',
    top: 20,
    right: 15,
  },
  iconHead: {
    fontSize: 30,
    color: 'white',
  },
  icon: {
    fontSize: 20,
  },
});
export default styles;
