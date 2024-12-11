import {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../../../context/global.context';
import {IBudget} from '../../../common/interfaces/budget.interface';
import {BudgetService} from '../../../services/budget.service';


export const useHome = () => {
  const [isTransactionModalVisible, setIsTransactionModalVisible] =
    useState(false);
  const [isBudgetModalVisible, setIsBudgetModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const context = useContext(GlobalContext);
  const [budget, setBudget] = useState<IBudget>();
  const [isLoading, setIsLoading] = useState(true);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  const refreshHome = async () => {
    setTriggerRefresh(true);
  };

  useEffect(() => {
    const fetchBudget = async () => {
      setIsLoading(true);
      try {
        const budget = await BudgetService.get(new Date());
        setBudget(budget);
      } catch (error) {
        context?.setSnackbarInfo({
          message: 'Error al obtener el budget. Intenta nuevamente.',
          type: 'error',
          isVisible: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBudget();
  }, []);

  return {
    budget,
    isLoading,
    isTransactionModalVisible,
    setIsTransactionModalVisible,
    isBudgetModalVisible,
    setIsBudgetModalVisible,
    isOpen,
    setIsOpen,
    refreshHome,
  };
};
