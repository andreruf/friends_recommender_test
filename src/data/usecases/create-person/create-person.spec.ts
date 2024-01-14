import { type CreatePersonModel, type CreatePersonRepository, type PersonModel } from './create-person-protocols'
import { DbCreatePerson } from './create-person'

interface sutTypes {
  sut: DbCreatePerson
  createPersonRepositoryStub: CreatePersonRepository
}

const makeCreatePersonRepository = (): CreatePersonRepository => {
  class CreatePersonRepositoryStub implements CreatePersonRepository {
    async create (personData: CreatePersonModel): Promise<PersonModel> {
      const fakePerson = {
        name: 'André',
        cpf: '12345678912',
        friends: []
      }
      return await new Promise(resolve => { resolve(fakePerson) })
    }
  }
  return new CreatePersonRepositoryStub()
}

const makeSut = (): sutTypes => {
  const createPersonRepositoryStub = makeCreatePersonRepository()
  const sut = new DbCreatePerson(createPersonRepositoryStub)
  return {
    sut,
    createPersonRepositoryStub
  }
}

describe('DbCreatePerson', () => {
  test('should call CreatePersonRepository with correct values', async () => {
    const { sut, createPersonRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(createPersonRepositoryStub, 'create')
    const personData = {
      name: 'André',
      cpf: '12345678912'
    }
    await sut.create(personData)
    expect(createSpy).toHaveBeenCalledWith({
      name: 'André',
      cpf: '12345678912'
    })
  })

  test('should throw error if CreatePersonRepository throws an error', async () => {
    const { sut, createPersonRepositoryStub } = makeSut()
    jest.spyOn(createPersonRepositoryStub, 'create').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const personData = {
      name: 'André',
      cpf: '12345678912'
    }
    const promise = sut.create(personData)
    await expect(promise).rejects.toThrow()
  })
})
