import { AxiosInstance } from "../../axios.config";
import { ICategorizedBudget } from "../common/interfaces/categorized-budget.interface";
import { ITransaction, ITransactionReq } from "../common/interfaces/transaction.interface";

const entityName = 'transactions';

export class TransactionService {

  static async create(transaction: ITransactionReq): Promise<ITransaction> {
    try {
        const response = await AxiosInstance.post(entityName, transaction);
        return response.data.data;
      } catch (error) {
        console.error('Error al obtener categorized-budget:', error);
        throw error;
      }
  }

  static async getAll(date?: Date): Promise<ITransaction[]> {
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

  static async update(id: number, transaction: Partial<ITransactionReq>): Promise<ITransaction> {
    try {
      const response = await AxiosInstance.patch(`${entityName}/${id}`, transaction);
      return response.data.data;
    } catch (error) {
      console.error('Error al crear categorized-budget:', error);
      throw error;
    }
  }

  static async delete(id: number): Promise<void> {
    try {
      await AxiosInstance.delete(`${entityName}/${id}`);
    } catch (error) {
      console.error('Error al eliminar categorized-budget:', error);
      throw error;
    }
  }
}