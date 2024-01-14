import { type Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeLoadPersonController } from '../factories/controllers/load-person-controller-factory'

export default (router: Router): void => {
  router.get('/person/:cpf', adaptRoute(makeLoadPersonController()))
}
