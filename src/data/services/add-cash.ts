import { AddCashModel } from '../../domain/models/add-cash'
import { AddCashUseCase } from '../../domain/useCases/add-cash'
import { TransactionRepository } from '../contracts/transaction-repository'
import { Transaction } from '../entities/transaction'

export class AddCashService implements AddCashUseCase {
  constructor (private readonly transactionRepository: TransactionRepository, private readonly transactionRepositoryMemory: TransactionRepository) {}
  async add ({ idUser, cash, whyAdd }: AddCashModel): Promise<void> {
    const transaction: Transaction = {
      idUser,
      cash,
      type: 'add',
      description: whyAdd
    }

    await this.transactionRepository.create(transaction)
    await this.transactionRepositoryMemory.create(transaction)
  }
}
