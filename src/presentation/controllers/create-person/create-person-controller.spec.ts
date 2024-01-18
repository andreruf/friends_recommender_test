import { type PersonModel, type CreatePerson, type CreatePersonModel, type LoadPerson } from './create-person-protocols'
import { InvalidParamError, MissingParamError, ServerError } from '../../errors'
import { CreatePersonController } from './create-person-controller'
import { type CpfValidator } from '../../../validation/protocols'

interface SutTypes {
  sut: CreatePersonController
  cpfValidatorStub: CpfValidator
  createPersonStub: CreatePerson
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

const makeCreatePerson = (): CreatePerson => {
  class CreatePersonStub implements CreatePerson {
    async create (person: CreatePersonModel): Promise<PersonModel> {
      const fakePerson = {
        name: 'André',
        cpf: '12345678912',
        friends: []
      }
      return await new Promise(resolve => { resolve(fakePerson) })
    }
  }
  return new CreatePersonStub()
}

const makeLoadPersonNotFound = (): LoadPerson => {
  class LoadPersonStub implements LoadPerson {
    async load (cpf: string): Promise<PersonModel | null> {
      const fakePerson = null
      return await new Promise(resolve => { resolve(fakePerson) })
    }
  }
  return new LoadPersonStub()
}

const makeLoadPersonSuccess = (): LoadPerson => {
  class LoadPersonStub implements LoadPerson {
    async load (cpf: string): Promise<PersonModel | null> {
      const fakePerson = {
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
  const createPersonStub = makeCreatePerson()
  const loadPersonStub = makeLoadPersonNotFound()
  const sut = new CreatePersonController(cpfValidatorStub, createPersonStub, loadPersonStub)
  return {
    sut,
    cpfValidatorStub,
    createPersonStub,
    loadPersonStub
  }
}

describe('Create Person Controller', () => {
  test('Should return 400 if CPF already exists ', async () => {
    const cpfValidatorStub = makeCpfValidator()
    const createPersonStub = makeCreatePerson()
    const loadPersonStub = makeLoadPersonSuccess()
    const sut = new CreatePersonController(cpfValidatorStub, createPersonStub, loadPersonStub)
    const httpRequest = {
      body: {
        name: 'André',
        cpf: '12345678912'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error('cpf already exists').message)
  })

  test('Should return 400 if CPF lenght is not equal to 11', async () => {
    const { sut, cpfValidatorStub } = makeSut()
    jest.spyOn(cpfValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'André',
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
      body: {
        name: 'André',
        cpf: '1234567890A'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('cpf').message)
  })

  test('Should return 400 if no CPF is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'André'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('cpf').message)
  })

  test('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        cpf: '12345678912'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name').message)
  })

  test('Should return 500 if CpfValidator throws error', async () => {
    const { sut, cpfValidatorStub } = makeSut()
    jest.spyOn(cpfValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'André',
        cpf: '1234567'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError().message)
  })

  test('Should return 500 if CreatePerson throws error', async () => {
    const { sut, createPersonStub } = makeSut()
    jest.spyOn(createPersonStub, 'create').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => { reject(new Error()) })
    })
    const httpRequest = {
      body: {
        name: 'André',
        cpf: '1234567'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
    expect(httpResponse.body).toEqual(new ServerError().message)
  })

  test('Should call CpfValidator with correct cpf', async () => {
    const { sut, cpfValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(cpfValidatorStub, 'isValid')
    const httpRequest = {
      body: {
        name: 'André',
        cpf: '12345678902'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('12345678902')
  })

  test('Should call createPerson with correct values', async () => {
    const { sut, createPersonStub } = makeSut()
    const createSpy = jest.spyOn(createPersonStub, 'create')
    const httpRequest = {
      body: {
        name: 'André',
        cpf: '1234567'
      }
    }
    await sut.handle(httpRequest)
    expect(createSpy).toHaveBeenCalledWith({
      name: 'André',
      cpf: '1234567'
    })
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'André',
        cpf: '12345678902'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      name: 'André',
      cpf: '12345678912',
      friends: []
    })
  })
})
