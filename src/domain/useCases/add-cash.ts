import { AddCashModel } from '../models/add-cash'

export interface AddCashUseCase {
  add: (data: AddCashModel) => Promise<void>
}
