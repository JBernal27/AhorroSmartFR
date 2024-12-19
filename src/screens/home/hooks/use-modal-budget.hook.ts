import {useContext, useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {CategorizedBudgetService} from '../../../services/categorized-budget.service';
import {ExpenseCategory, expenseCategoryTranslations} from '../../../common/enums/expense-category.enum';
import {GlobalContext} from '../../../context/global.context';

interface BudgetForm {
  category: string;
  amount: string;
  date: Date;
}

const initialFormValues: BudgetForm = {
  category: '',
  amount: '',
  date: new Date(),
};

export const useBudgetForm = (
  onClose: () => void,
  refreshHome: () => void,
  budget?: {id: number; category: string; amount: number; date: Date}
) => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: {errors},
  } = useForm<BudgetForm>({
    defaultValues: budget
      ? {
          category: budget.category,
          amount: budget.amount.toString(),
          date: new Date(budget.date),
        }
      : initialFormValues,
  });
  const context = useContext(GlobalContext);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<{label: string; value: ExpenseCategory}[]>([]);
  const allCategories = useRef<{label: string; value: ExpenseCategory}[]>([]);

  Object.keys(expenseCategoryTranslations).forEach(key => {
    allCategories.current.push({
      label: expenseCategoryTranslations[key as ExpenseCategory],
      value: key as ExpenseCategory,
    });
  });

  const date = watch('date');

  useEffect(() => {
    const getCategorizedBudget = async () => {
      try {
        setIsLoading(true);
        const response = await CategorizedBudgetService.getAll(date || new Date());

        const existingCategoryIds = response.map(item => item.category);

        const availableCategories = allCategories.current.filter(
          category => !existingCategoryIds.includes(category.value) || category.value === budget?.category
        );

        setCategories(availableCategories);
      } catch (error) {
        console.error('Error al obtener categorized-budget:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getCategorizedBudget();
  }, [date, budget?.category]);

  const onSubmit = async (data: BudgetForm) => {
    try {
      setIsLoading(true);

      if (budget) {
        await CategorizedBudgetService.update(budget.id, {
          ...data,
          amount: parseInt(data.amount),
          category: data.category as ExpenseCategory,
        });
        context?.setSnackbarInfo({
          isVisible: true,
          message: 'Presupuesto actualizado correctamente',
          type: 'success',
        });
      } else {
        // Crear presupuesto
        await CategorizedBudgetService.create({
          ...data,
          amount: parseInt(data.amount),
          category: data.category as ExpenseCategory,
        });
        context?.setSnackbarInfo({
          isVisible: true,
          message: 'Presupuesto creado correctamente',
          type: 'success',
        });
      }

      refreshHome();
      onClose();
    } catch (error) {
      console.error('Error al guardar presupuesto:', error);
      context?.setSnackbarInfo({
        isVisible: true,
        message: 'Hubo un error al guardar el presupuesto, intente nuevamente',
        type: 'error',
      });
    } finally {
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
    onSubmit,
  };
};
