import { type HttpResponse, type HttpRequest, type Controller, type CreatePerson, type CreatePersonModel } from './create-person-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { type LoadPerson } from '../../../domain/usecases/load-person'
import { type CpfValidator } from '../../../validation/protocols'

export class CreatePersonController implements Controller {
  constructor (
    private readonly cpfValidator: CpfValidator,
    private readonly createPerson: CreatePerson,
    private readonly loadPerson: LoadPerson
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'cpf']

      const { cpf, name } = httpRequest.body as CreatePersonModel

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.cpfValidator.isValid(cpf)

      if (!isValid) {
        return badRequest(new InvalidParamError('cpf'))
      }

      const personExist = await this.loadPerson.load(cpf)

      if (personExist) {
        return badRequest(new Error('cpf already exists'))
      }

      const person = await this.createPerson.create({
        name,
        cpf
      })

      return ok(person)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
