import { type CreatePersonModel, type PersonModel, type CreatePersonRepository } from './create-person-protocols'
import { type CreatePerson } from '../../../domain/usecases/create-person'
import { type LoadPersonRepository } from '../load-person/load-person-protocols'

export class DbCreatePerson implements CreatePerson {
  constructor (
    private readonly createPersonRepository: CreatePersonRepository,
    private readonly loadPersonRepository: LoadPersonRepository
  ) {}

  async create (personData: CreatePersonModel): Promise<PersonModel | null> {
    const { cpf } = personData
    let created: PersonModel | null = null
    const personExist = await this.loadPersonRepository.load(cpf)

    if (!personExist) {
      created = await this.createPersonRepository.create(personData)
    }

    return created
  }
}
