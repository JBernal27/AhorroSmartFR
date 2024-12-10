export interface IBudget {
    id:            number;
    amount:        number;
    date:          Date;
    totalExpenses: number;
    totalIncomes:  number;
    percentage:    number;
    remaining:     number;
}
