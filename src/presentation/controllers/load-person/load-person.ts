import { type HttpResponse, type Controller, type CpfValidator } from './load-person-protocols'
import { InvalidParamError, NotFoundError } from '../../errors'
import { badRequest, notFound, ok, serverError } from '../../helpers/http-helper'
import { type LoadPerson } from '../../../domain/usecases/load-person'

export class LoadPersonController implements Controller {
  constructor (private readonly cpfValidator: CpfValidator, private readonly loadPerson: LoadPerson) {}

  async handle (httpRequest: LoadPersonController.Request): Promise<HttpResponse> {
    try {
      const { cpf } = httpRequest.params

      const isValid = this.cpfValidator.isValid(cpf)

      if (!isValid) {
        return badRequest(new InvalidParamError('cpf'))
      }

      const person = await this.loadPerson.load(cpf)

      if (!person) {
        return notFound(new NotFoundError('cpf'))
      }

      return ok(person)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}

export namespace LoadPersonController {
  export type Request = {
    params: {
      cpf: string
    }
  }
}
