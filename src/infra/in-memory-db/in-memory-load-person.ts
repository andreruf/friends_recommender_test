import { type LoadPersonRepository, type PersonModel } from '../../data/usecases/load-person/load-person-protocols'

export class InMemoryLoadPersonRepository implements LoadPersonRepository {
  async load (cpf: string): Promise<PersonModel> {
    const personCollection = global.personCollection || []

    const personByCpf = personCollection.filter(person => person.cpf === cpf)

    return personByCpf.at(0) || null
  }
}
