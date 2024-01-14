import { type CreateRelationshipModel } from '../usecases/create-person/create-person-protocols'

export interface CreateRelationshipRepository {
  create: (persons: CreateRelationshipModel) => Promise<string>
}
