import { CleanController } from '../../../presentation/controllers/clean/clean-controller'
import { makeClean } from '../usecases/clean-factory'

export const makeCleanController = (): CleanController => {
  return new CleanController(makeClean())
}
