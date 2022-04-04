import { RemoveCashModel } from '../../domain/models/remove-cash'
import { RemoveCashUseCase } from '../../domain/useCases/remove-cash'
import { TransactionRepository } from '../contracts/transaction-repository'
import { Transaction } from '../entities/transaction'

export class RemoveCashService implements RemoveCashUseCase {
  constructor (private readonly transactionRepository: TransactionRepository, private readonly transactionRepositoryMemory: TransactionRepository) {}
  async remove ({ idUser, cash, whyRemove }: RemoveCashModel): Promise<void> {
    const transaction: Transaction = {
      idUser,
      cash,
      type: 'remove',
      description: whyRemove
    }

    await this.transactionRepository.create(transaction)
    await this.transactionRepositoryMemory.create(transaction)
  }
}
