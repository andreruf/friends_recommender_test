import { type PersonModel, type LoadPerson } from './load-person-protocols'
import { InvalidParamError, NotFoundError, ServerError } from '../../errors'
import { LoadPersonController } from './load-person-controller'
import { type CpfValidator } from '../../../validation/protocols'

interface SutTypes {
  sut: LoadPersonController
  cpfValidatorStub: CpfValidator
  loadPersonStub: LoadPerson
}

const makeCpfValidator = (): CpfValidator => {
  class CpfValidatorStub implements CpfValidator {
    isValid (cpf: string): boolean {
      return true
    }
  }
  return new CpfValidatorStub()
}

const makeLoadPerson = (): LoadPerson => {
  class LoadPersonStub implements LoadPerson {
    async load (cpf: string): Promise<PersonModel | null> {
      const fakePerson = {
        id: 1,
        name: 'André',
        cpf: '12345678912',
        friends: []
      }
      return await new Promise(resolve => { resolve(fakePerson) })
    }
  }
  return new LoadPersonStub()
}

const makeSut = (): SutTypes => {
  const cpfValidatorStub = makeCpfValidator()
  const loadPersonStub = makeLoadPerson()
  const sut = new LoadPersonController(cpfValidatorStub, loadPersonStub)
  return {
    sut,
    cpfValidatorStub,
    loadPersonStub
  }
}

describe('Create Person Controller', () => {
  test('Should return 400 if CPF lenght is not equal to 11', async () => {
    const { sut, cpfValidatorStub } = makeSut()
    jest.spyOn(cpfValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      params: {
        cpf: '1234567'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('cpf').message)
  })

  test('Should return 400 if CPF contains any non-numeric character', async () => {
    const { sut, cpfValidatorStub } = makeSut()
    jest.spyOn(cpfValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      params: {
        cpf: '123456789AA'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('cpf').message)
  })

  test('Should return 500 if CpfValidator throws error', async () => {
    const { sut, cpfValidatorStub } = makeSut()
    jest.spyOn(cpfValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      params: {
        cpf: '1234567'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError().message)
  })

  test('Should return 500 if LoadPerson throws error', async () => {
    const { sut, loadPersonStub } = makeSut()
    jest.spyOn(loadPersonStub, 'load').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => { reject(new Error()) })
    })
    const httpRequest = {
      params: {
        cpf: '12345678912'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError().message)
  })

  test('Should return 404 if no person was found', async () => {
    const { sut, loadPersonStub } = makeSut()
    jest.spyOn(loadPersonStub, 'load').mockImplementationOnce(async () => {
      return null
    })
    const httpRequest = {
      params: {
        cpf: '12345678912'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.body).toEqual(new NotFoundError('cpf').message)
  })

  test('Should call CpfValidator with correct cpf', async () => {
    const { sut, cpfValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(cpfValidatorStub, 'isValid')
    const httpRequest = {
      params: {
        cpf: '12345678912'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('12345678912')
  })

  test('Should call loadPerson with correct values', async () => {
    const { sut, loadPersonStub } = makeSut()
    const createSpy = jest.spyOn(loadPersonStub, 'load')
    const httpRequest = {
      params: {
        cpf: '12345678912'
      }
    }
    await sut.handle(httpRequest)
    expect(createSpy).toHaveBeenCalledWith('12345678912')
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      params: {
        cpf: '12345678912'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 1,
      name: 'André',
      cpf: '12345678912',
      friends: []
    })
  })
})
