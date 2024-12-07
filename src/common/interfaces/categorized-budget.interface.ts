import { ExpenseCategory } from "../enums/expense-category.enum";

export interface CategorizedBudget {
  id: number;
  category :ExpenseCategory;
  amount: number;
  date: Date;
  totalExpenses: number;
  totalIncomes: number;
  budgetId: number;
}