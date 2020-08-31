import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactions = await this.find();

    const reduce = (
      acumulator: number,
      item: Transaction,
      type: 'income' | 'outcome',
    ): number => {
      return item.type === type ? acumulator + Number(item.value) : acumulator;
    };

    const income = transactions.reduce(
      (acumulator, item) => reduce(acumulator, item, 'income'),
      0,
    );

    const outcome = transactions.reduce(
      (acumulator, item) => reduce(acumulator, item, 'outcome'),
      0,
    );
    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }
}

export default TransactionsRepository;
