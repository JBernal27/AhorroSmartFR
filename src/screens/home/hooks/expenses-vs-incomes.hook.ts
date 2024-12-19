import React, {useState, useEffect} from 'react';
import {TransactionService} from '../../../services/transaction.service';
import {useTheme} from 'react-native-paper';

type ChartDataItem = {
  value: number;
  label: string;
};

type ChartData = {
  expenses: ChartDataItem[];
  incomes: ChartDataItem[];
  maxStepValue: number;
  totalIncome: number;
  totalExpenses: number;
};

const numberFormatter = new Intl.NumberFormat('es-ES', {
  style: 'decimal',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const useIncomeExpenseChart = (triggerRefresh: boolean) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ChartData>({
    expenses: [],
    incomes: [],
    maxStepValue: 100,
    totalIncome: 0,
    totalExpenses: 0,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const response = await TransactionService.getAll(new Date());

        const groupedData = response.reduce<{
          labels: number[];
          incomes: Record<number, number>;
          expenses: Record<number, number>;
          totalIncome: number;
          totalExpenses: number;
        }>(
          (acc, transaction) => {
            const day = new Date(transaction.date).getDate();

            if (!acc.labels.includes(day)) {
              acc.labels.push(day);
            }

            if (transaction.type === 'Income') {
              acc.incomes[day] = (acc.incomes[day] || 0) + transaction.amount;
              console.log('ingreso', transaction.amount);
              acc.totalIncome += transaction.amount;
            } else if (transaction.type === 'Expense') {
              acc.expenses[day] = (acc.expenses[day] || 0) + transaction.amount;
              console.log('gasto', transaction.amount);
              acc.totalExpenses += transaction.amount;
            }

            return acc;
          },
          {
            labels: [],
            incomes: {},
            expenses: {},
            totalIncome: 0,
            totalExpenses: 0,
          },
        );

        groupedData.labels.sort((a, b) => a - b);

        const incomes = groupedData.labels.map(day => ({
          value: groupedData.incomes[day] / 1000 || 0,
          label: `${day}/${new Date().getMonth() + 1}`,
        }));
        const expenses = groupedData.labels.map(day => ({
          value: groupedData.expenses[day] / 1000 || 0,
          label: `${day}/${new Date().getMonth() + 1}`,
        }));

        const maxIncome = Math.max(...incomes.map(item => item.value));
        const maxExpense = Math.max(...expenses.map(item => item.value));
        const maxValue = Math.max(maxIncome, maxExpense);

        let maxStepValue;
        if (maxValue < 100) {
          maxStepValue = Math.ceil(maxValue / 1000) * 10;
        } else {
          maxStepValue = Math.ceil(maxValue / 1000) * 100;
        }

        setData({
          incomes,
          expenses,
          maxStepValue,
          totalIncome: groupedData.totalIncome,
          totalExpenses: groupedData.totalExpenses,
        });
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [triggerRefresh]);

  return {isLoading, data};
};

export default useIncomeExpenseChart;
