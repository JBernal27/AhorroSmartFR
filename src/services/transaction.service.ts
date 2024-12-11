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

  static async getAll(date?: Date): Promise<Transaction[]> {
    try {
        const response = await AxiosInstance.get(entityName, { params: { date } });
        console.log('transactions');
        
        console.log(response.data.data);
        return response.data.data;
      } catch (error) {
        console.error('Error al obtener categorized-budget:', error);
        throw error;
      }
  }
}