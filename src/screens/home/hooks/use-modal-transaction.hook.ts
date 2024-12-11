import {useContext, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Transaction} from '../../../common/interfaces/transaction.interface';
import {CategorizedBudgetService} from '../../../services/categorized-budget.service';
import {expenseCategoryTranslations} from '../../../common/enums/expense-category.enum';
import {TransactionService} from '../../../services/transaction.service';
import { GlobalContext } from '../../../context/global.context';

interface TransactionForm {
  name: string;
  type: 'Income' | 'Expense';
  amount: string;
  note: string;
  categorizedBudgetId: number;
  date: Date;
}

const initialFormValues: TransactionForm = {
  name: '',
  type: 'Income',
  amount: '',
  note: ' ',
  categorizedBudgetId: 0,
  date: new Date(),
};

export const useTransactionForm = (onClose: () => void) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: {errors},
  } = useForm<TransactionForm>({
    defaultValues: initialFormValues,
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const context = useContext(GlobalContext);
  const [categories, setCategories] = useState<
    {label: string; value: number}[]
  >([]);

  const categorizedBudget = watch('categorizedBudgetId');

  useEffect(() => {
    const getCategorizedBudget = async () => {
      try {
        setIsLoading(true);
        const response = await CategorizedBudgetService.getAll(new Date());
        setCategories(
          response.map(item => ({
            label: expenseCategoryTranslations[item.category],
            value: item.id,
          })),
        );
      } catch (error) {
        console.error('Error al obtener categorized-budget:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getCategorizedBudget();
  }, []);

  const onSubmit = async (data: TransactionForm) => {
    setIsLoading(true);
    console.log('Formulario enviado:', data);
    try {
      const response = await TransactionService.create({
        ...data,
        id: 0,
        amount: parseInt(data.amount),
        note: data.note.trim(),
        name: data.name.trim(),
      });
      context?.setSnackbarInfo({
        isVisible: true,
        message: 'Transacción registrada correctamente',
        type: 'success',
      });
      console.log(response);
      onClose();
    } catch (error) {
      console.error('Error al crear transacción:', error);
      context?.setSnackbarInfo({
        isVisible: true,
        message: 'Error al registrar la transacción, intente nuevamente',
        type: 'error',
      })
    }
    finally {
      setIsLoading(false);
    }
  };

  return {
    control,
    handleSubmit,
    reset,
    watch,
    errors,
    showDatePicker,
    setShowDatePicker,
    isLoading,
    categories,
    categorizedBudget,
    onSubmit,
  };
};
