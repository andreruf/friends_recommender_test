import { type CreatePersonRepository, type CreatePersonModel, type PersonModel } from '../../data/usecases/create-person/create-person-protocols'

export class InMemoryCreatePersonRepository implements CreatePersonRepository {
  async create (personData: CreatePersonModel): Promise<PersonModel> {
    const personCollection = global.personCollection || []
    const formatedPersonData = Object.assign(personData, { id: personCollection.length + 1, friends: [] })

    personCollection.push(formatedPersonData)
    global.personCollection = personCollection

    return formatedPersonData
  }
}
