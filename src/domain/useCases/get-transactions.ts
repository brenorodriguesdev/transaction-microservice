import { TransactionModel } from '../models/transaction'

export interface GetTransactionsUseCase {
  get: (idUser: number) => Promise<TransactionModel>
}
