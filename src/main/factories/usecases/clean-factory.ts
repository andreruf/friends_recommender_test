import { DbClean } from '../../../data/usecases/clean/clean'
import { InMemoryCleanRepository } from '../../../infra/in-memory-db/in-memory-clean'

export const makeClean = (): DbClean => {
  const inMemoryCleanRepository = new InMemoryCleanRepository()
  return new DbClean(inMemoryCleanRepository)
}
