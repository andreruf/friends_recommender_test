import { type HttpResponse } from '../protocols'
import { ServerError } from '../errors'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error.message
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: 404,
  body: error.message
})

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError().message
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
