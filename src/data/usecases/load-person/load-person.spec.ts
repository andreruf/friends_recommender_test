import { type LoadPersonRepository, type PersonModel } from './load-person-protocols'
import { DbLoadPerson } from './load-person'

interface sutTypes {
  sut: DbLoadPerson
  loadPersonRepositoryStub: LoadPersonRepository
}

const makeLoadPersonRepository = (): LoadPersonRepository => {
  class LoadPersonRepositoryStub implements LoadPersonRepository {
    async load (cpf: string): Promise<PersonModel> {
      const fakePerson = {
        name: 'André',
        cpf: '12345678912',
        friends: []
      }
      return await new Promise(resolve => { resolve(fakePerson) })
    }
  }
  return new LoadPersonRepositoryStub()
}

const makeSut = (): sutTypes => {
  const loadPersonRepositoryStub = makeLoadPersonRepository()
  const sut = new DbLoadPerson(loadPersonRepositoryStub)
  return {
    sut,
    loadPersonRepositoryStub
  }
}

describe('DbLoadPerson', () => {
  test('should call LoadPersonRepository with correct values', async () => {
    const { sut, loadPersonRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(loadPersonRepositoryStub, 'load')
    const cpf = '12345678912'

    await sut.load(cpf)
    expect(createSpy).toHaveBeenCalledWith(cpf)
  })

  test('should throw error if LoadPersonRepository throws an error', async () => {
    const { sut, loadPersonRepositoryStub } = makeSut()
    jest.spyOn(loadPersonRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const cpf = '12345678912'

    const promise = sut.load(cpf)
    await expect(promise).rejects.toThrow()
  })
})
