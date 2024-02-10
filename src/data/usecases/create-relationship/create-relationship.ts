import { type CreateRelationship } from '../../../domain/usecases/create-relationship'
import { type PersonModel, type LoadPersonRepository } from '../load-person/load-person-protocols'
import { type CreateRelationshipRepository } from './create-relationship-protocols'

export class DbCreateRelationship implements CreateRelationship {
  constructor (private readonly createRelationshipRepository: CreateRelationshipRepository, private readonly loadPersonRepository: LoadPersonRepository) {}

  async create (cpf1: string, cpf2: string): Promise<string | null> {
    const person1 = await this.loadPersonRepository.load(cpf1)
    const person2 = await this.loadPersonRepository.load(cpf2)

    if (!person1 || !person2) {
      return null
    }

    const result = this.createRelatioship(person1, person2)

    return result
  }

  async createRelatioship (person1: PersonModel, person2: PersonModel): Promise<string> {
    const isFriends = person1.friends.find((person) => person.id === person2.id)
    let result = 'Relationship already exists'

    if (!isFriends) {
      result = await this.createRelationshipRepository.create(person1, person2)
    }

    return result
  }
}
