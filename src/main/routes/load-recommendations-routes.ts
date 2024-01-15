import { type Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeLoadRecommendationsController } from '../factories/controllers/load-recommendations-controller-factory'

export default (router: Router): void => {
  router.get('/recommendations/:cpf', adaptRoute(makeLoadRecommendationsController()))
}
