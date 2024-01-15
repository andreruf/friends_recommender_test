import { DbClean } from './clean'
import { type CleanRepository } from './clean-protocols'

interface sutTypes {
  sut: DbClean
  cleanRepositoryStub: CleanRepository
}

const makeCleanRepository = (): CleanRepository => {
  class CreatePersonRepositoryStub implements CleanRepository {
    async cleanAll (): Promise<string> {
      return await new Promise(resolve => { resolve('Database cleaned') })
    }
  }
  return new CreatePersonRepositoryStub()
}

const makeSut = (): sutTypes => {
  const cleanRepositoryStub = makeCleanRepository()
  const sut = new DbClean(cleanRepositoryStub)
  return {
    sut,
    cleanRepositoryStub
  }
}

describe('DbCreatePerson', () => {
  test('should call CreatePersonRepository with correct values', async () => {
    const { sut, cleanRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(cleanRepositoryStub, 'cleanAll')

    await sut.cleanAll()
    expect(createSpy).toHaveBeenCalled()
  })

  test('should throw error if CreatePersonRepository throws an error', async () => {
    const { sut, cleanRepositoryStub } = makeSut()
    jest.spyOn(cleanRepositoryStub, 'cleanAll').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))

    const promise = sut.cleanAll()
    await expect(promise).rejects.toThrow()
  })
})
