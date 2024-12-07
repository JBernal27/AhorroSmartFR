export interface Transaction {
  id: number;
  name: string;
  type: 'Income' | 'Expense';
  amount: number;
  note: string;
  categorizedBudgetId: number;
  date: Date;
}