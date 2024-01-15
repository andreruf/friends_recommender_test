import { type CreateRelationshipModel, type CreateRelationshipRepository } from './create-relationship-protocols'
import { DbCreateRelationship } from './create-relationship'

interface sutTypes {
  sut: DbCreateRelationship
  createRelationshipRepositoryStub: CreateRelationshipRepository
}

const makeCreatePersonRepository = (): CreateRelationshipRepository => {
  class CreatePersonRepositoryStub implements CreateRelationshipRepository {
    async create (persons: CreateRelationshipModel): Promise<string> {
      return await new Promise(resolve => { resolve('Relationships created') })
    }
  }
  return new CreatePersonRepositoryStub()
}

const makeSut = (): sutTypes => {
  const createRelationshipRepositoryStub = makeCreatePersonRepository()
  const sut = new DbCreateRelationship(createRelationshipRepositoryStub)
  return {
    sut,
    createRelationshipRepositoryStub
  }
}

describe('DbCreateRelationship', () => {
  test('should call CreatePersonRepository with correct values', async () => {
    const { sut, createRelationshipRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(createRelationshipRepositoryStub, 'create')
    const personData = {
      cpf1: '11111111111',
      cpf2: '22222222222'
    }
    await sut.create(personData)
    expect(createSpy).toHaveBeenCalledWith({
      cpf1: '11111111111',
      cpf2: '22222222222'
    })
  })

  test('should throw error if CreateRelationshipRepository throws an error', async () => {
    const { sut, createRelationshipRepositoryStub } = makeSut()
    jest.spyOn(createRelationshipRepositoryStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const personData = {
      cpf1: '11111111111',
      cpf2: '22222222222'
    }
    const promise = sut.create(personData)
    await expect(promise).rejects.toThrow()
  })
})
