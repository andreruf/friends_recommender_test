import { type HttpResponse, type HttpRequest, type Controller, type CreatePerson, type CreatePersonModel } from './create-person-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http-helper'
import { type CpfValidator } from '../../../validation/protocols'

export class CreatePersonController implements Controller {
  constructor (
    private readonly cpfValidator: CpfValidator,
    private readonly createPerson: CreatePerson

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

      const person = await this.createPerson.create({
        name,
        cpf
      })

      if (!person) {
        return badRequest(new Error('cpf already exists'))
      }

      return ok(person)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
