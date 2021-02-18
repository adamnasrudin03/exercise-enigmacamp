import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  contentBody: {
    height: '1000%',
    width: '1000%',
  },
  transaction: {
    backgroundColor: '#fff',
  },
  fab: {
    flex: 1,
  },
  hiddenTransaction: {
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
  iconSize: {
    fontSize: 20,
  },
});
export default styles;
