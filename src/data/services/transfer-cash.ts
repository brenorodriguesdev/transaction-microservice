import { TransferCashModel } from '../../domain/models/transfer-cash'
import { AddCashUseCase } from '../../domain/useCases/add-cash'
import { RemoveCashUseCase } from '../../domain/useCases/remove-cash'
import { TransferCashUseCase } from '../../domain/useCases/transfer-cash'
import { TransactionRepository } from '../contracts/transaction-repository'
import { Transaction } from '../entities/transaction'

export class TransferCashService implements TransferCashUseCase {
  constructor (private readonly transactionRepositoryMemory: TransactionRepository,
    private readonly addCashUsecase: AddCashUseCase,
    private readonly removeCashUseCase: RemoveCashUseCase) {}

  async transfer ({ toIdUser, fromIdUser, cash }: TransferCashModel): Promise<void | Error> {
    const transactions = await this.transactionRepositoryMemory.allByUser(fromIdUser)
    const fromUserCash = transactions.reduce((totalCash, transaction: Transaction) => {
      if (transaction.type === 'add') { totalCash += transaction.cash }
      if (transaction.type === 'remove') { totalCash -= transaction.cash }
      return 0
    }, 0)
    if (fromUserCash < cash) {
      return new Error('Você não tem saldo suficiente para completar essa transferência!')
    }
    await this.addCashUsecase.add({
      idUser: toIdUser,
      cash,
      whyAdd: `O ${fromIdUser} transferiu ${cash} para você!`
    })

    await this.removeCashUseCase.remove({
      idUser: fromIdUser,
      cash,
      whyRemove: `Você transferiu ${cash} para ${toIdUser}!`
    })
  }
}
