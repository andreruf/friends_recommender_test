import { DbCreatePerson } from '../../../data/usecases/create-person/create-person'
import { InMemoryCreatePersonRepository } from '../../../infra/in-memory-db/in-memory-create-person'

export const makeCreatePerson = (): DbCreatePerson => {
  const inMemoryCreatePersonRepository = new InMemoryCreatePersonRepository()
  return new DbCreatePerson(inMemoryCreatePersonRepository)
}
