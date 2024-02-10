import { DbCreateRelationship } from '../../../data/usecases/create-relationship/create-relationship'
import { InMemoryCreateRelationshipRepository } from '../../../infra/in-memory-db/in-memory-create-relationship'
import { InMemoryLoadPersonRepository } from '../../../infra/in-memory-db/in-memory-load-person'

export const makeCreateRelationship = (): DbCreateRelationship => {
  const inMemoryCreateRelationshipRepository = new InMemoryCreateRelationshipRepository()
  const inMemoryLoadPersonRepository = new InMemoryLoadPersonRepository()
  return new DbCreateRelationship(inMemoryCreateRelationshipRepository, inMemoryLoadPersonRepository)
}
