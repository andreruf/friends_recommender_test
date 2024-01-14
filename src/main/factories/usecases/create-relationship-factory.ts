import { DbCreateRelationship } from '../../../data/usecases/create-relationship/create-relationship'
import { InMemoryCreateRelationshipRepository } from '../../../infra/in-memory-db/in-memory-create-relationship'

export const makeCreateRelationship = (): DbCreateRelationship => {
  const inMemoryCreateRelationshipRepository = new InMemoryCreateRelationshipRepository()
  return new DbCreateRelationship(inMemoryCreateRelationshipRepository)
}
