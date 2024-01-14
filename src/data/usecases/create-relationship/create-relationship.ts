import { type CreateRelationship } from '../../../domain/usecases/create-relationship'
import { type CreateRelationshipModel, type CreateRelationshipRepository } from './create-relationship-protocols'

export class DbCreateRelationship implements CreateRelationship {
  constructor (private readonly createPersonRepository: CreateRelationshipRepository) {}

  async create (persons: CreateRelationshipModel): Promise<string> {
    const person = await this.createPersonRepository.create(persons)
    return person
  }
}
