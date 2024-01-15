import { type HttpResponse, type Controller, type Clean } from './clean-protocols'
import { ok, serverError } from '../../helpers/http-helper'

export class CleanController implements Controller {
  constructor (
    private readonly clean: Clean
  ) {}

  async handle (): Promise<HttpResponse> {
    try {
      const result = await this.clean.cleanAll()

      return ok(result)
    } catch (error) {
      console.log(error)
      return serverError()
    }
  }
}
