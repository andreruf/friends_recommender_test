import { type HttpResponse, type HttpRequest, type Controller, type CreateRelationship, type CreateRelationshipModel } from './create-relationship-protocols'
import { MissingParamError, InvalidParamError, NotFoundError } from '../../errors'
import { badRequest, notFound, ok, serverError } from '../../helpers/http-helper'
import { type CpfValidator } from '../../../validation/protocols'

export class CreateRelationshipController implements Controller {
  constructor (
    private readonly cpfValidator: CpfValidator,
    private readonly createRelationship: CreateRelationship
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { cpf1, cpf2 } = httpRequest.body as CreateRelationshipModel

      if (!cpf1 || !cpf2) {
        return badRequest(new MissingParamError('cpf'))
      }

      const isCpf1Valid = this.cpfValidator.isValid(cpf1)
      const isCpf2Valid = this.cpfValidator.isValid(cpf2)

      if (!isCpf1Valid || !isCpf2Valid) {
        return badRequest(new InvalidParamError('cpf'))
      }

      const response = await this.createRelationship.create(
        cpf1, cpf2
      )

      if (!response) {
        return notFound(new NotFoundError('cpf'))
      }

      return ok(response)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
