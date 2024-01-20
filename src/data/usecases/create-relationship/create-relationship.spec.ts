import { type CreateRelationshipRepository } from './create-relationship-protocols'
import { DbCreateRelationship } from './create-relationship'
import { type PersonModel, type LoadPersonRepository } from '../load-person/load-person-protocols'

interface sutTypes {
  sut: DbCreateRelationship
  createRelationshipRepositoryStub: CreateRelationshipRepository
  loadPersonRepositoryStub: LoadPersonRepository
}

const makeCreatePersonRepository = (): CreateRelationshipRepository => {
  class CreatePersonRepositoryStub implements CreateRelationshipRepository {
    async create (person1: PersonModel, person2: PersonModel): Promise<string> {
      return await new Promise(resolve => { resolve('Relationships created') })
    }
  }
  return new CreatePersonRepositoryStub()
}

const makeLoadPersonRepository = (): LoadPersonRepository => {
  class LoadPersonRepositoryStub implements LoadPersonRepository {
    async load (cpf: string): Promise<PersonModel | null> {
      return await new Promise(resolve => { resolve(null) })
    }
  }
  return new LoadPersonRepositoryStub()
}

const makeSut = (): sutTypes => {
  const createRelationshipRepositoryStub = makeCreatePersonRepository()
  const loadPersonRepositoryStub = makeLoadPersonRepository()
  const sut = new DbCreateRelationship(createRelationshipRepositoryStub, loadPersonRepositoryStub)
  return {
    sut,
    createRelationshipRepositoryStub,
    loadPersonRepositoryStub
  }
}

describe('DbCreateRelationship', () => {
  test('should call CreatePersonRepository with correct values', async () => {
    const { sut, createRelationshipRepositoryStub, loadPersonRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(createRelationshipRepositoryStub, 'create')
    jest.spyOn(loadPersonRepositoryStub, 'load').mockImplementationOnce(async () => {
      const fakePerson = {
        id: 1,
        name: 'André',
        cpf: '11111111111',
        friends: []
      }
      return await new Promise(resolve => { resolve(fakePerson) })
    })
    jest.spyOn(loadPersonRepositoryStub, 'load').mockImplementationOnce(async () => {
      const fakePerson = {
        id: 2,
        name: 'Rufino',
        cpf: '22222222222',
        friends: []
      }
      return await new Promise(resolve => { resolve(fakePerson) })
    })
    await sut.create('11111111111', '22222222222')
    expect(createSpy).toHaveBeenCalledWith({
      id: 1,
      name: 'André',
      cpf: '11111111111',
      friends: []
    },{
      id: 2,
      name: 'Rufino',
      cpf: '22222222222',
      friends: []
    })
  })

  test('should return null if person do not exists', async () => {
    const { sut } = makeSut()

    const result = await sut.create('11111111111', '22222222222')

    expect(result).toBe(null)
  })
})
