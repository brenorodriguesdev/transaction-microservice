import { TransferCashModel } from '../models/transfer-cash'

export interface TransferCashUseCase {
  transfer: (data: TransferCashModel) => Promise<void>
}
