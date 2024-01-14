import { type CreatePersonRepository, type CreatePersonModel, type PersonModel } from '../../data/usecases/create-person/create-person-protocols'

export class InMemoryCreatePersonRepository implements CreatePersonRepository {
  async create (personData: CreatePersonModel): Promise<PersonModel> {
    const formatedPersonData = Object.assign(personData, { friends: [] })
    const personCollection = global.personCollection || []

    personCollection.push(formatedPersonData)
    global.personCollection = personCollection

    return formatedPersonData
  }
}
