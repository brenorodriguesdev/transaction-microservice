import { TransactionModel } from '../../domain/models/transaction'
import { GetTransactionsUseCase } from '../../domain/useCases/get-transactions'
import { TransactionRepository } from '../contracts/transaction-repository'

export class GetTransactionsService implements GetTransactionsUseCase {
  constructor (private readonly transactionRepository: TransactionRepository) {}
  async get (idUser: number): Promise<TransactionModel[]> {
    const transactions = await this.transactionRepository.allByUser(idUser)
    return transactions
  }
}
