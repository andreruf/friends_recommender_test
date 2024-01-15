import { type LoadRecommendationsRepository } from '../../protocols/load-recommendations-repository'
import { DbLoadRecommendations } from './load-recommendations'

interface sutTypes {
  sut: DbLoadRecommendations
  loadRecommendationsRepositoryStub: LoadRecommendationsRepository
}

const makeLoadPersonRepository = (): LoadRecommendationsRepository => {
  class LoadPersonRepositoryStub implements LoadRecommendationsRepository {
    async load (cpf: string): Promise<string[]> {
      return await new Promise(resolve => { resolve(['11111111111', '22222222222']) })
    }
  }
  return new LoadPersonRepositoryStub()
}

const makeSut = (): sutTypes => {
  const loadRecommendationsRepositoryStub = makeLoadPersonRepository()
  const sut = new DbLoadRecommendations(loadRecommendationsRepositoryStub)
  return {
    sut,
    loadRecommendationsRepositoryStub
  }
}

describe('DbLoadRecommendations', () => {
  test('should call LoadRecommendations with correct values', async () => {
    const { sut, loadRecommendationsRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(loadRecommendationsRepositoryStub, 'load')
    const cpf = '12345678912'

    await sut.load(cpf)
    expect(createSpy).toHaveBeenCalledWith(cpf)
  })

  test('should throw error if LoadPersonRepository throws an error', async () => {
    const { sut, loadRecommendationsRepositoryStub } = makeSut()
    jest.spyOn(loadRecommendationsRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => { reject(new Error()) }))
    const cpf = '12345678912'

    const promise = sut.load(cpf)
    await expect(promise).rejects.toThrow()
  })
})
