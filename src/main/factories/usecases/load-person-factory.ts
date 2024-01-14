import { DbLoadPerson } from '../../../data/usecases/load-person/load-person'
import { InMemoryLoadPersonRepository } from '../../../infra/in-memory-db/in-memory-load-person'

export const makeLoadPerson = (): DbLoadPerson => {
  const inMemoryLoadPersonRepository = new InMemoryLoadPersonRepository()
  return new DbLoadPerson(inMemoryLoadPersonRepository)
}
