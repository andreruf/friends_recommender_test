import { type Router } from 'express'
import { makeCreateRelationshipController } from '../factories/controllers/create-relationship-controller-factory'
import { adaptRoute } from '../adapters/express/express-route-adapter'

export default (router: Router): void => {
  router.post('/relationship', adaptRoute(makeCreateRelationshipController()))
}
