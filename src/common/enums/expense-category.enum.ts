export enum ExpenseCategory {
  HOUSING = 'housing', // Vivienda
  FOOD = 'food', // Alimentación
  TRANSPORTATION = 'transportation', // Transporte
  HEALTH = 'health', // Salud
  EDUCATION = 'education', // Educación
  ENTERTAINMENT = 'entertainment', // Ocio y Entretenimiento
  CLOTHING = 'clothing', // Ropa y Accesorios
  SAVINGS = 'savings', // Ahorro e Inversiones
  DEBTS = 'debts', // Deudas
  WORK = 'work', // Trabajo
  OTHERS = 'others',
}

export const expenseCategoryTranslations: Record<ExpenseCategory, string> = {
  [ExpenseCategory.HOUSING]: 'Vivienda',
  [ExpenseCategory.FOOD]: 'Alimentación',
  [ExpenseCategory.TRANSPORTATION]: 'Transporte',
  [ExpenseCategory.HEALTH]: 'Salud',
  [ExpenseCategory.EDUCATION]: 'Educación',
  [ExpenseCategory.ENTERTAINMENT]: 'Ocio y Entretenimiento',
  [ExpenseCategory.CLOTHING]: 'Ropa y Accesorios',
  [ExpenseCategory.SAVINGS]: 'Ahorro e Inversiones',
  [ExpenseCategory.DEBTS]: 'Deudas',
  [ExpenseCategory.WORK]: 'Trabajo',
  [ExpenseCategory.OTHERS]: 'Otros',
};

export const expenseCategoryIcons: Record<ExpenseCategory, string> = {
  [ExpenseCategory.HOUSING]: 'home-city',
  [ExpenseCategory.FOOD]: 'food',
  [ExpenseCategory.TRANSPORTATION]: 'train-car',
  [ExpenseCategory.HEALTH]: 'heart-flash',
  [ExpenseCategory.EDUCATION]: 'school',
  [ExpenseCategory.ENTERTAINMENT]: 'popcorn',
  [ExpenseCategory.CLOTHING]: 'tshirt-crew',
  [ExpenseCategory.SAVINGS]: 'piggy-bank',
  [ExpenseCategory.DEBTS]: 'currency-usd-off',
  [ExpenseCategory.WORK]: 'briefcase',
  [ExpenseCategory.OTHERS]: 'strategy',
};
