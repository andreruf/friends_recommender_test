import { type LoadPersonRepository, type PersonModel } from '../../data/usecases/load-person/load-person-protocols'

export class InMemoryLoadPersonRepository implements LoadPersonRepository {
  async load (cpf: string): Promise<PersonModel | null> {
    const personCollection = global.personCollection || []

    const personByCpf = personCollection.find((person) => person.cpf === cpf)

    return personByCpf || null
  }
}
