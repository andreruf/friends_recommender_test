import { type HttpResponse, type Controller } from './load-recommendations-protocols'
import { InvalidParamError, NotFoundError } from '../../errors'
import { badRequest, notFound, ok, serverError } from '../../helpers/http-helper'
import { type LoadPerson } from '../../../domain/usecases/load-person'
import { type LoadRecommendations } from '../../../domain/usecases/load-recommendations'
import { type CpfValidator } from '../../../validation/protocols'

export class LoadRecommendationsController implements Controller {
  constructor (
    private readonly cpfValidator: CpfValidator,
    private readonly loadRecommendations: LoadRecommendations,
    private readonly loadPerson: LoadPerson
  ) {}

  async handle (httpRequest: LoadRecommendationsController.Request): Promise<HttpResponse> {
    try {
      const { cpf } = httpRequest.params

      const isValid = this.cpfValidator.isValid(cpf)

      if (!isValid) {
        return badRequest(new InvalidParamError('cpf'))
      }

      const cpfExist = await this.loadPerson.load(cpf)

      if (!cpfExist) {
        return notFound(new NotFoundError('cpf'))
      }

      const response = await this.loadRecommendations.load(cpf)

      return ok(response)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}

export namespace LoadRecommendationsController {
  export type Request = {
    params: {
      cpf: string
    }
  }
}
