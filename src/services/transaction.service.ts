import { AxiosInstance } from "../../axios.config";
import { CategorizedBudget } from "../common/interfaces/categorized-budget.interface";
import { Transaction } from "../common/interfaces/transaction.interface";

const entityName = 'transactions';

export class TransactionService {


  static async create(transaction: Transaction): Promise<Transaction> {
    try {
        const response = await AxiosInstance.post(entityName, transaction);
        return response.data.data;
      } catch (error) {
        console.error('Error al obtener categorized-budget:', error);
        throw error;
      }
  }
}