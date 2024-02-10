import { type CreateRelationship } from './create-relationship-protocols'
import { InvalidParamError, MissingParamError, NotFoundError, ServerError } from '../../errors'
import { CreateRelationshipController } from './create-relationship-controller'
import { type CpfValidator } from '../../../validation/protocols'

interface SutTypes {
  sut: CreateRelationshipController
  cpfValidatorStub: CpfValidator
  createRelationshipStub: CreateRelationship
}

const makeCpfValidator = (): CpfValidator => {
  class CpfValidatorStub implements CpfValidator {
    isValid (cpf: string): boolean {
      return true
    }
  }
  return new CpfValidatorStub()
}

const makeCreateRelationship = (): CreateRelationship => {
  class CreateRelationshipStub implements CreateRelationship {
    async create (cpf1: string, cpf2: string): Promise<string> {
      const respose = 'Relationship created'
      return await new Promise(resolve => { resolve(respose) })
    }
  }
  return new CreateRelationshipStub()
}

const makeSut = (): SutTypes => {
  const cpfValidatorStub = makeCpfValidator()
  const createRelationshipStub = makeCreateRelationship()
  const sut = new CreateRelationshipController(cpfValidatorStub, createRelationshipStub)
  return {
    sut,
    cpfValidatorStub,
    createRelationshipStub
  }
}

describe('Create Relationship Controller', () => {
  test('Should return 404 if cpfs are not found', async () => {
    const { sut, createRelationshipStub } = makeSut()
    jest.spyOn(createRelationshipStub, 'create').mockImplementationOnce(async () => {
      return null
    })
    const httpRequest = {
      body: {
        cpf1: '12345678922',
        cpf2: '12345678911'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(404)
    expect(httpResponse.body).toEqual(new NotFoundError('cpf').message)
  })

  test('Should return 400 if CPF lenght is not equal to 11', async () => {
    const { sut, cpfValidatorStub } = makeSut()
    jest.spyOn(cpfValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        cpf1: '12345672',
        cpf2: '12345678AA1'
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
        cpf1: '12345672',
        cpf2: '12345678AA1'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidParamError('cpf').message)
  })

  test('Should return 400 if both cpfs are not provider', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        cpf1: '12345672'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('cpf').message)
  })

  test('Should return 500 if CpfValidator throws error', async () => {
    const { sut, cpfValidatorStub } = makeSut()
    jest.spyOn(cpfValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        cpf1: '12345678912',
        cpf2: '12345678922'
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
        cpf1: '12345678912',
        cpf2: '12345678922'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith('12345678912')
    expect(isValidSpy).toHaveBeenCalledWith('12345678922')
  })

  test('Should call createRelationship with correct values', async () => {
    const { sut, createRelationshipStub } = makeSut()
    const createSpy = jest.spyOn(createRelationshipStub, 'create')
    const httpRequest = {
      body: {
        cpf1: '12345678912',
        cpf2: '12345678922'
      }
    }
    await sut.handle(httpRequest)
    expect(createSpy).toHaveBeenCalledWith('12345678912', '12345678922')
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut, createRelationshipStub } = makeSut()
    jest.spyOn(createRelationshipStub, 'create').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => { resolve('Relationship created') })
    })
    const httpRequest = {
      body: {
        cpf1: '12345678912',
        cpf2: '12345678922'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual('Relationship created')
  })
})
