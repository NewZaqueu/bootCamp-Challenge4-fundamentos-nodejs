import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  private newBalance: Balance;

  constructor() {
    this.transactions = [];
    this.newBalance = { income: 0, outcome: 0, total: 0 };
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeReducer = (acc: number, transaction: Transaction): number => {
      if (transaction.type === 'income') {
        acc += transaction.value;
      }
      return acc;
    };

    const outcomeReducer = (acc: number, transaction: Transaction): number => {
      if (transaction.type === 'outcome') {
        acc += transaction.value;
      }
      return acc;
    };

    this.newBalance.income = this.transactions.reduce(incomeReducer, 0);
    this.newBalance.outcome = this.transactions.reduce(outcomeReducer, 0);
    this.newBalance.total = this.newBalance.income - this.newBalance.outcome;

    return this.newBalance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const newTransaction = new Transaction({ title, type, value });
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
