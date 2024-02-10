import { type PersonModel } from '../../models'
import { type LoadRecommendationsRepository } from '../../protocols/load-recommendations-repository'
import { type LoadPersonRepository } from '../load-person/load-person-protocols'
import { DbLoadRecommendations } from './load-recommendations'

interface sutTypes {
  sut: DbLoadRecommendations
  loadRecommendationsRepositoryStub: LoadRecommendationsRepository
  loadPersonRepositoryStub: LoadPersonRepository
}

const makeLoadRecommendationsRepository = (): LoadRecommendationsRepository => {
  class LoadRecommendationsRepositoryStub implements LoadRecommendationsRepository {
    async load (id: number): Promise<PersonModel> {
      const fakePerson = {
        id: 1,
        name: 'André',
        cpf: '11111111111',
        friends: [
          {
            id: 2,
            cpf: '22222222222'
          }
        ]
      }
      return await new Promise(resolve => { resolve(fakePerson) })
    }
  }
  return new LoadRecommendationsRepositoryStub()
}

const makeLoadPersonRepository = (): LoadPersonRepository => {
  class LoadPersonRepositoryStub implements LoadPersonRepository {
    async load (cpf: string): Promise<PersonModel> {
      const fakePerson = {
        id: 1,
        name: 'André',
        cpf: '11111111111',
        friends: [
          {
            id: 2,
            cpf: '22222222222'
          },
          {
            id: 3,
            cpf: '33333333333'
          }
        ]
      }
      return await new Promise(resolve => { resolve(fakePerson) })
    }
  }
  return new LoadPersonRepositoryStub()
}

const makeSut = (): sutTypes => {
  const loadRecommendationsRepositoryStub = makeLoadRecommendationsRepository()
  const loadPersonRepositoryStub = makeLoadPersonRepository()
  const sut = new DbLoadRecommendations(loadRecommendationsRepositoryStub, loadPersonRepositoryStub)
  return {
    sut,
    loadRecommendationsRepositoryStub,
    loadPersonRepositoryStub
  }
}

describe('DbLoadRecommendations', () => {
  test('should call LoadRecommendations with correct values', async () => {
    const { sut, loadRecommendationsRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadRecommendationsRepositoryStub, 'load')
    const cpf = '11111111111'

    await sut.load(cpf)
    expect(loadSpy).toHaveBeenCalledWith(2)
    expect(loadSpy).toHaveBeenCalledWith(3)
  })

  test('should return correct friends recommendation on success', async () => {
    const { sut, loadPersonRepositoryStub, loadRecommendationsRepositoryStub } = makeSut()
    jest.spyOn(loadPersonRepositoryStub, 'load').mockImplementationOnce(async () => {
      const fakePerson = {
        id: 1,
        name: 'André',
        cpf: '11111111111',
        friends: [{ id: 2, cpf: '22222222222' }, { id: 3, cpf: '33333333333' }]
      }
      return await new Promise(resolve => { resolve(fakePerson) })
    })

    jest.spyOn(loadRecommendationsRepositoryStub, 'load').mockImplementationOnce(async () => {
      const fakePerson = {
        id: 2,
        name: 'Rufino',
        cpf: '22222222222',
        friends: [{ id: 4, cpf: '44444444444' }, { id: 3, cpf: '33333333333' }]
      }
      return await new Promise(resolve => { resolve(fakePerson) })
    })
    const cpf = '11111111111'

    const result = await sut.load(cpf)
    expect(result).toEqual(['44444444444'])
  })

  test('should return null if LoadPersonRepository returns null', async () => {
    const { sut, loadPersonRepositoryStub } = makeSut()
    jest.spyOn(loadPersonRepositoryStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => { resolve(null) }))
    const cpf = '11111111111'

    const result = await sut.load(cpf)
    expect(result).toBe(null)
  })
})
