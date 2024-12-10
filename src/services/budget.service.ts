import { AxiosInstance } from '../../axios.config';
import {IBudget} from '../common/interfaces/budget.interface';

const entityName = 'budget';

export class BudgetService {
  static async get(date: Date): Promise<IBudget> {
    try {
      const dateString = date.toISOString();
      const response = await AxiosInstance.get(`${entityName}/${dateString}`);
      console.log('Amout:', response.data);
      
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      console.error('Error al obtener budget:', error);
      throw error;
    }
  }

}
