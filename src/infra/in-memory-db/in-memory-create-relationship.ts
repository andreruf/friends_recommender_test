import { type PersonModel, type CreateRelationshipRepository } from '../../data/usecases/create-relationship/create-relationship-protocols'

export class InMemoryCreateRelationshipRepository implements CreateRelationshipRepository {
  async create (person1: PersonModel, person2: PersonModel): Promise<string> {
    global.personCollection[person1.id - 1].friends.push({ id: person2.id, cpf: person2.cpf })
    global.personCollection[person2.id - 1].friends.push({ id: person1.id, cpf: person1.cpf })

    return 'Relationship created'
  }
}
