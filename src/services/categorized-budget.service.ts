import {AxiosInstance} from '../../axios.config';
import {CategorizedBudget} from '../common/interfaces/categorized-budget.interface';
import { CreateCategorizeBudget } from '../common/services/categorize-budget-service.interface';

const entityName = 'categorize-budget';

export class CategorizedBudgetService {
  static async getAll(date: Date): Promise<CategorizedBudget[]> {
    try {
      const dateString = date.toISOString();
      const response = await AxiosInstance.get(`${entityName}/${dateString}`);
      return response.data.data;
    } catch (error) {
      console.error('Error al obtener categorized-budget:', error);
      throw error;
    }
  }

  static async create(data: CreateCategorizeBudget): Promise<CategorizedBudget> {
    try {
      const response = await AxiosInstance.post(`${entityName}`, data);
      return response.data.data;
    } catch (error) {
      console.error('Error al crear categorized-budget:', error);
      throw error;
    }
  }
}
