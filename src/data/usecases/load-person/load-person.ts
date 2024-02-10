import { type LoadPerson } from '../../../domain/usecases/load-person'
import { type LoadPersonRepository } from '../../protocols/load-person-repository'
import { type PersonModel } from './load-person-protocols'

export class DbLoadPerson implements LoadPerson {
  constructor (private readonly loadPersonRepository: LoadPersonRepository) {}

  async load (cpf: string): Promise<PersonModel | null> {
    return this.loadPersonRepository.load(cpf)
  }
}
