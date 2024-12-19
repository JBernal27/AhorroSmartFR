import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  filterGroup: {
    marginRight: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dropdown: {
    width: 150,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 14,
    fontWeight: '500',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  item: {
    padding: 10,
  },
  textItem: {
    fontSize: 14,
  },
  dateButton: {
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    flexDirection: 'row',
  }, 
});
