import { getCustomRepository } from 'typeorm';
import { isUuid } from 'uuidv4';
import AppError from '../errors/AppError';
import TrasnsactionRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    const transactionRepository = getCustomRepository(TrasnsactionRepository);

    if (!isUuid(id)) {
      throw new AppError('Invalid ID, expected id type is uuid', 401);
    }

    const transaction = await transactionRepository.findOne(id);
    if (!transaction) {
      throw new AppError(`Trasaction does't exist`, 401);
    }

    await transactionRepository.delete({
      id,
    });
  }
}

export default DeleteTransactionService;
