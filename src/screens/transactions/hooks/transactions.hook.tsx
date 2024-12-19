import {useEffect, useState, useCallback} from 'react';
import {TransactionService} from '../../../services/transaction.service';
import {ExpenseCategory} from '../../../common/enums/expense-category.enum';
import {ITransaction} from '../../../common/interfaces/transaction.interface';

const useTransactions = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    ITransaction[]
  >([]);
  const [triggerRefresh, setTriggerRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState<{
    category: ExpenseCategory | '';
    date: Date | null;
    type: 'Income' | 'Expense' | '';
  }>({
    category: '',
    date: null,
    type: '',
  });

  useEffect(() => {
    setIsLoading(true);
    const getTransactions = async () => {
      try {
        const response = await TransactionService.getAll();
        const sortedResponse = response.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        setTransactions(sortedResponse);
        setFilteredTransactions(sortedResponse);
      } catch (error) {
        console.error('Error al obtener transacciones:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getTransactions();
  }, [triggerRefresh]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...transactions];

      if (filters.category) {
        filtered = filtered.filter(
          transaction =>
            transaction.categorizedBudget.category === filters.category,
        );
      }

      if (filters.date) {
        const selectedDate = filters.date.toDateString();
        filtered = filtered.filter(
          transaction =>
            new Date(transaction.date).toDateString() === selectedDate,
        );
      }

      if (filters.type) {
        filtered = filtered.filter(
          transaction => transaction.type === filters.type,
        );
      }

      setFilteredTransactions(filtered);
    };

    applyFilters();
  }, [filters, transactions]);

  const handleFilterChange = useCallback((updatedFilters: typeof filters) => {
    setFilters(updatedFilters);
  }, []);

  return {
    filteredTransactions,
    filters,
    setFilters: handleFilterChange,
    triggerRefresh,
    setTriggerRefresh,
    isLoading,
    setIsLoading,
  };
};

export default useTransactions;
