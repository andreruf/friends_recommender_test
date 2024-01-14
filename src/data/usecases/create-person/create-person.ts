import { type CreatePersonModel, type PersonModel, type CreatePersonRepository } from './create-person-protocols'
import { type CreatePerson } from '../../../domain/usecases/create-person'

export class DbCreatePerson implements CreatePerson {
  constructor (private readonly createPersonRepository: CreatePersonRepository) {}

  async create (personData: CreatePersonModel): Promise<PersonModel> {
    const person = await this.createPersonRepository.create(personData)
    return person
  }
}
