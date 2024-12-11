import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {Text, useTheme} from 'react-native-paper';
import {IBudget} from '../../../common/interfaces/budget.interface';
import {TransactionService} from '../../../services/transaction.service';
import {getMonthName} from '../../../utilities/get-month-name.utility';
import Loader from '../../../utilities/components/loader.utility';

const screenWidth = Dimensions.get('window').width;

const numberFormatter = new Intl.NumberFormat('es-ES', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const IncomeExpenseChart = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        color: (opacity = 1) => theme.colors.primary,
        strokeWidth: 2,
      },
      {
        data: [] as number[],
        color: (opacity = 1) => theme.colors.error,
        strokeWidth: 2,
      },
    ],
    legend: ['Ingresos', 'Gastos'],
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await TransactionService.getAll();

        const groupedData = response.reduce<{
          labels: number[];
          incomes: Record<number, number>;
          expenses: Record<number, number>;
        }>(
          (acc, transaction) => {
            const day = new Date(transaction.date).getUTCDate();

            if (!acc.labels.includes(day)) {
              acc.labels.push(day);
            }

            if (transaction.type === 'Income') {
              acc.incomes[day] = (acc.incomes[day] || 0) + transaction.amount;
            } else if (transaction.type === 'Expense') {
              acc.expenses[day] = (acc.expenses[day] || 0) + transaction.amount;
            }

            return acc;
          },
          {labels: [], incomes: {}, expenses: {}},
        );

        groupedData.labels.sort((a, b) => a - b);

        const incomeData = groupedData.labels.map(
          day => groupedData.incomes[day] || 0,
        );
        const expenseData = groupedData.labels.map(
          day => groupedData.expenses[day] || 0,
        );

        const totalIncomes = incomeData.reduce((sum, value) => sum + value, 0);
        const totalExpenses = expenseData.reduce((sum, value) => sum + value, 0);

        setData({
          labels: groupedData.labels.map(String),
          datasets: [
            {
              data: incomeData,
              color: (opacity = 1) => theme.colors.primary,
              strokeWidth: 2,
            },
            {
              data: expenseData,
              color: (opacity = 1) => theme.colors.error,
              strokeWidth: 2,
            },
          ],
          legend: [
            `$${numberFormatter.format(totalIncomes)}`,
            `$${numberFormatter.format(totalExpenses)}`,
          ],
        });
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const formattedData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      data: dataset.data.map(value => Number(numberFormatter.format(value))),
    })),
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {boxShadow: `0px 0px 30px ${theme.colors.elevation.level5}`},
      ]}>
      <Loader visible={isLoading} />
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
        data={formattedData}
        width={screenWidth - 32}
        height={170}
        withInnerLines={false}
        withShadow={false}
        withDots={true}
        xAxisLabel={`${getMonthName(new Date()).substring(0, 3)} `}
        yAxisLabel="$"
        yAxisSuffix="k"
        fromZero={true}
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
