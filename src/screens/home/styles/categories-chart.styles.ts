import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    padding: 10,
    borderRadius: 16,
    gap: 10,
    marginBottom: 25,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'left',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
    marginRight: 5,
  },
  legendColor: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
  },
  pieChartWrapper: {
    padding: 10,
    alignItems: 'center',
  },
  pieChartCenterLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieChartAmountText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  pieChartCategoryText: {
    fontSize: 12,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
  },
  legendContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});

export default styles;
