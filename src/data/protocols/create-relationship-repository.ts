import { type PersonModel } from '../models'

export interface CreateRelationshipRepository {
  create: (person1: PersonModel, person2: PersonModel) => Promise<string>
}
