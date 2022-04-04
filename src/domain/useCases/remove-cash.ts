import { RemoveCashModel } from '../models/remove-cash'

export interface RemoveCashUseCase {
  remove: (data: RemoveCashModel) => Promise<void>
}
