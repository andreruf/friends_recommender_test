import { type CreateRelationshipRepository, type CreateRelationshipModel } from '../../data/usecases/create-relationship/create-relationship-protocols'

export class InMemoryCreateRelationshipRepository implements CreateRelationshipRepository {
  createRelatioship (personCpf: string, relationshipCpf: string): void {
    global.personCollection.forEach(function (person) {
      if (person.cpf === personCpf) {
        const isFriend = !!(person.friends.find((friendCpf: string) => friendCpf === relationshipCpf))

        if (!isFriend) {
          person.friends.push(relationshipCpf)
        }
      }
    })
  }

  async create (persons: CreateRelationshipModel): Promise<string> {
    const { cpf1, cpf2 } = persons

    this.createRelatioship(cpf1, cpf2)
    this.createRelatioship(cpf2, cpf1)
    return 'Relationship created'
  }
}
