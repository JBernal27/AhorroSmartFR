import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingLeft: 16,
    borderRadius: 12,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  pieChartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 69,
    width: 69,
    borderRadius: 50,
    backgroundColor: '#f1f1f1',
    marginRight: 15,
  },
  centerLabel: {
    fontWeight: 'bold',
  },
  textContainer: {
    justifyContent: 'center',
    flex: 1,
    gap: 5,
  },
  categoryName: {
    fontWeight: 'bold',
  },
  totalExpense: {
    fontWeight: 'bold',
  },
  amountContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    gap: 5,
    marginRight: 15,
  }
});

export default styles;
