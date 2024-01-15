import { ServerError } from '../../errors'
import { CleanController } from './clean-controller'
import { type Clean } from './clean-protocols'

interface SutTypes {
  sut: CleanController
  cleanStub: Clean
}

const makeCreatePerson = (): Clean => {
  class CleanStub implements Clean {
    async cleanAll (): Promise<string> {
      return await new Promise(resolve => { resolve('Database cleaned') })
    }
  }
  return new CleanStub()
}

const makeSut = (): SutTypes => {
  const cleanStub = makeCreatePerson()
  const sut = new CleanController(cleanStub)
  return {
    sut,
    cleanStub
  }
}

describe('Clean Controller', () => {
  test('Should return 500 if Clean throws error', async () => {
    const { sut, cleanStub } = makeSut()
    jest.spyOn(cleanStub, 'cleanAll').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => { reject(new Error()) })
    })

    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError().message)
  })

  test('Should call clean correctly', async () => {
    const { sut, cleanStub } = makeSut()
    const createSpy = jest.spyOn(cleanStub, 'cleanAll')

    await sut.handle()
    expect(createSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual('Database cleaned')
  })
})
