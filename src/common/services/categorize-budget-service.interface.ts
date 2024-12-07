import { ExpenseCategory } from "../enums/expense-category.enum";

export interface CreateCategorizeBudget {
    category: ExpenseCategory;
    amount: number;
    date: Date;
}