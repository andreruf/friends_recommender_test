import { DbCreatePerson } from '../../../data/usecases/create-person/create-person'
import { InMemoryCreatePersonRepository } from '../../../infra/in-memory-db/in-memory-create-person'
import { InMemoryLoadPersonRepository } from '../../../infra/in-memory-db/in-memory-load-person'

export const makeCreatePerson = (): DbCreatePerson => {
  const inMemoryCreatePersonRepository = new InMemoryCreatePersonRepository()
  const inMemoryLoadPersonRepository = new InMemoryLoadPersonRepository()
  return new DbCreatePerson(inMemoryCreatePersonRepository, inMemoryLoadPersonRepository)
}
