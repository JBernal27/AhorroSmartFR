import {useEffect, useState, useCallback} from 'react';
import {ICategorizedBudget} from '../../../common/interfaces/categorized-budget.interface';
import {CategorizedBudgetService} from '../../../services/categorized-budget.service';

interface UseBudgetsReturn {
  categories: ICategorizedBudget[];
  filteredCategories: ICategorizedBudget[];
  filters: {name: string; date: Date};
  isLoading: boolean;
  handleFilterChange: (updatedFilters: {name: string; date: Date}) => void;
  triggerRefresh: boolean;
  setTriggerRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const useBudgets = (): UseBudgetsReturn => {
  const [categories, setCategories] = useState<ICategorizedBudget[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<
    ICategorizedBudget[]
  >([]);
  const [filters, setFilters] = useState<{name: string; date: Date}>({
    name: '',
    date: new Date(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  useEffect(() => {
    const getCategoriesBudget = async () => {
      setIsLoading(true);
      try {
        const response = await CategorizedBudgetService.getAll(filters.date);

        const sortedResponse = response.sort(
          (a, b) => b.totalExpenses - a.totalExpenses,
        );

        setCategories(sortedResponse);
        setFilteredCategories(sortedResponse);
      } catch (error) {
        console.error('Error al obtener categorized-budget:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getCategoriesBudget();
  }, [triggerRefresh]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...categories];

      if (filters.name) {
        filtered = filtered.filter(category =>
          category.category.toLowerCase().includes(filters.name.toLowerCase()),
        );
      }

      if (filters.date) {
        const selectedDate = new Date(filters.date);
        filtered = filtered.filter(
          transaction =>
            new Date(transaction.budget.date).getUTCMonth() ===
            new Date(selectedDate).getUTCMonth(),
        );
      }

      setFilteredCategories(filtered);
    };

    applyFilters();
  }, [filters, categories]);

  const handleFilterChange = useCallback((updatedFilters: typeof filters) => {
    setFilters(updatedFilters);
  }, []);

  return {
    categories,
    filteredCategories,
    filters,
    isLoading,
    handleFilterChange,
    triggerRefresh,
    setTriggerRefresh,
    setIsLoading,
  };
};

export default useBudgets;
