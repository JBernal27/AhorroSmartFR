import React, { useState, useEffect, useRef } from 'react';
import { CategorizedBudgetService } from '../../../services/categorized-budget.service';
import { useTheme } from 'react-native-paper';
import { ExpenseCategory, expenseCategoryTranslations } from '../../../common/enums/expense-category.enum';

const useCategoriesChart = (triggerRefresh: boolean) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const theme = useTheme();
  const maxExpense = useRef({value: 0, name: ''});

  const categoryColors: Record<ExpenseCategory, string> = {
    [ExpenseCategory.HOUSING]: theme.colors.primary,
    [ExpenseCategory.FOOD]: theme.colors.secondary,
    [ExpenseCategory.TRANSPORTATION]: theme.colors.tertiary,
    [ExpenseCategory.HEALTH]: theme.colors.error,
    [ExpenseCategory.EDUCATION]: theme.colors.primaryContainer,
    [ExpenseCategory.ENTERTAINMENT]:theme.colors.secondaryContainer,
    [ExpenseCategory.CLOTHING]: theme.colors.outline ?? theme.colors.tertiaryContainer,
    [ExpenseCategory.SAVINGS]: theme.colors.inversePrimary,
    [ExpenseCategory.DEBTS]: theme.colors.errorContainer,
    [ExpenseCategory.WORK]: theme.colors.onBackground,
    [ExpenseCategory.OTHERS]: theme.colors.surfaceVariant,
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await CategorizedBudgetService.getAll(new Date());        

        const totalExpenses = response.reduce((acc, item) => acc + item.totalExpenses, 0);
        maxExpense.current = {...maxExpense.current, value: Math.max(...response.map(item => item.totalExpenses))};

        const pieData = response.map(item => {
          const percentage = ((item.totalExpenses / totalExpenses) * 100).toFixed(2);
          const color = categoryColors[item.category as ExpenseCategory] || theme.colors.onSurface;

          if (item.totalExpenses === maxExpense.current.value) {
            maxExpense.current = {...maxExpense.current, name: expenseCategoryTranslations[item.category]};
          }

          return {
            value: parseFloat(percentage),
            color,
            label: expenseCategoryTranslations[item.category],
            focused: item.totalExpenses === maxExpense.current.value,
          };
        });
        
        setData(pieData);
      } catch (error) {
        console.error('Error loading categorized budgets chart:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [triggerRefresh, theme]);

  return { isLoading, data, maxExpense };
};

export default useCategoriesChart;
