import { type Router } from 'express'
import { makeCreatePersonController } from '../factories/controllers/create-person-controller-factory'
import { adaptRoute } from '../adapters/express/express-route-adapter'

export default (router: Router): void => {
  router.post('/person', adaptRoute(makeCreatePersonController()))
}
