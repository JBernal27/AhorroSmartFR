import { ExpenseCategory } from "../enums/expense-category.enum";
import { IBudget } from "./budget.interface";

export interface ICategorizedBudget {
  id: number;
  category :ExpenseCategory;
  amount: number;
  totalExpenses: number;
  totalIncomes: number;
  budget: IBudget;
}