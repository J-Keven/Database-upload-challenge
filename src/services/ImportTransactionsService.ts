import fs from 'fs';

import Transaction from '../models/Transaction';
import AppError from '../errors/AppError';
import CreateTransactionService from './CreateTransactionService';

import uploadConfigs from '../configs/uploadConfig';
import readCSV from '../utils/readCsv';

class ImportTransactionsService {
  async execute(filename: string): Promise<Transaction[]> {
    const filePath = `${uploadConfigs.directory}/${filename}`;
    const fileExist = await fs.promises.stat(filePath);

    if (!fileExist) {
      throw new AppError('Error loading file', 400);
    }
    const createTransactionService = new CreateTransactionService();

    const data = await readCSV(filePath);
    // const transactions: Transaction[] = [];
    const [...transactions] = await data.map(
      async ({ category, title, type, value }): Promise<Transaction> => {
        const transaction = await createTransactionService.execute({
          title,
          type: type as 'income' | 'outcome',
          value,
          category,
        });
        return transaction;
      },
    );
    return transactions;
  }
}

export default ImportTransactionsService;
