import { ICategorizedBudget } from "./categorized-budget.interface";

export interface ITransactionReq {
  id: number;
  name: string;
  type: 'Income' | 'Expense';
  amount: number;
  note: string;
  categorizedBudgetId: number;
  date: Date;
}

export interface ITransaction {
  id: number;
  name: string;
  type: 'Income' | 'Expense';
  amount: number;
  note: string;
  categorizedBudget: ICategorizedBudget;
  date: Date;
}