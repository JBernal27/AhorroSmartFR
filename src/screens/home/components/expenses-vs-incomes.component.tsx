import React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Text, useTheme} from 'react-native-paper';
import { IBudget } from '../../../common/interfaces/budget.interface';

const screenWidth = Dimensions.get('window').width;

const IncomeExpenseChart = ( {budget}: {budget: IBudget}) => {
  const theme = useTheme();

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [500, 700, 800, 650, 900, 1000],
        color: (opacity = 1) => theme.colors.primary,
        strokeWidth: 2,
      },
      {
        data: [300, 400, 450, 800, 500, 600],
        color: (opacity = 1) => theme.colors.error,
        strokeWidth: 2,
      },
    ],
    legend: ['Ingresos', 'Gastos'],
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {boxShadow: `0px 0px 10px ${theme.colors.elevation.level5}`},
      ]}>
      <Text
        variant="titleLarge"
        style={[styles.title, {color: theme.colors.onBackground}]}>
        Ingresos vs Gastos
      </Text>
      <Text
        variant="bodySmall"
        style={[{textAlign: 'left', color: theme.colors.onBackground}]}>
        Aqui puedes ver tus movimientos de ingresos y gastos
      </Text>
      <LineChart
        data={data}
        width={screenWidth - 32}
        height={170}
        withInnerLines={false}
        withShadow={false}
        withDots={false}
        fromZero
        chartConfig={{
          decimalPlaces: 0,
          backgroundGradientFrom: theme.colors.background,
          backgroundGradientTo: theme.colors.background,
          color: (opacity = 1) => theme.colors.onBackground,
          labelColor: (opacity = 1) => theme.colors.onBackground,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        bezier
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    padding: 10,
    borderRadius: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
    width: '90%',
  },
});

export default IncomeExpenseChart;
