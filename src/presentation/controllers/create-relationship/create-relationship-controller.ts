import { type HttpResponse, type HttpRequest, type Controller, type CpfValidator, type CreateRelationship, type CreateRelationshipModel } from './create-relationship-protocols'
import { MissingParamError, InvalidParamError, NotFoundError } from '../../errors'
import { badRequest, notFound, ok, serverError } from '../../helpers/http-helper'
import { type LoadPerson } from '../../../domain/usecases/load-person'

export class CreateRelationshipController implements Controller {
  constructor (
    private readonly cpfValidator: CpfValidator,
    private readonly createRelationship: CreateRelationship,
    private readonly loadPerson: LoadPerson
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

      const cpf1Exist = await this.loadPerson.load(cpf1)
      const cpf2Exist = await this.loadPerson.load(cpf2)

      if (!cpf1Exist || !cpf2Exist) {
        return notFound(new NotFoundError('cpf'))
      }

      const response = await this.createRelationship.create({
        cpf1, cpf2
      })

      return ok(response)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
