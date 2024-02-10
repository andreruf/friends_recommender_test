import { type CreatePersonModel, type CreatePersonRepository, type PersonModel } from './create-person-protocols'
import { DbCreatePerson } from './create-person'
import { type LoadPersonRepository } from '../load-person/load-person-protocols'

interface sutTypes {
  sut: DbCreatePerson
  createPersonRepositoryStub: CreatePersonRepository
  loadPersonRepositoryStub: LoadPersonRepository
}

const makeCreatePersonRepository = (): CreatePersonRepository => {
  class CreatePersonRepositoryStub implements CreatePersonRepository {
    async create (personData: CreatePersonModel): Promise<PersonModel> {
      const fakePerson = {
        id: 1,
        name: 'André',
        cpf: '12345678912',
        friends: []
      }
      return await new Promise(resolve => { resolve(fakePerson) })
    }
  }
  return new CreatePersonRepositoryStub()
}

const makeLoadPersonRepository = (): LoadPersonRepository => {
  class CreatePersonRepositoryStub implements LoadPersonRepository {
    async load (cpf: string): Promise<PersonModel | null> {
      return await new Promise(resolve => { resolve(null) })
    }
  }
  return new CreatePersonRepositoryStub()
}

const makeSut = (): sutTypes => {
  const createPersonRepositoryStub = makeCreatePersonRepository()
  const loadPersonRepositoryStub = makeLoadPersonRepository()
  const sut = new DbCreatePerson(createPersonRepositoryStub, loadPersonRepositoryStub)
  return {
    sut,
    createPersonRepositoryStub,
    loadPersonRepositoryStub
  }
}

describe('DbCreatePerson', () => {
  test('should call CreatePersonRepository with correct values if person do not exists', async () => {
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

  test('should return null if person exists', async () => {
    const { sut, loadPersonRepositoryStub } = makeSut()
    jest.spyOn(loadPersonRepositoryStub, 'load').mockImplementationOnce(async () => {
      const fakePerson = {
        id: 1,
        name: 'André',
        cpf: '12345678912',
        friends: []
      }
      return await new Promise(resolve => { resolve(fakePerson) })
    })

    const personData = {
      name: 'André',
      cpf: '12345678912'
    }
    const result = await sut.create(personData)
    expect(result).toBe(null)
  })
})
