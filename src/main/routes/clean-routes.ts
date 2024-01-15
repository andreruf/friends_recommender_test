import { type Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeCleanController } from '../factories/controllers/clean-controller-factory'

export default (router: Router): void => {
  router.delete('/clean', adaptRoute(makeCleanController()))
}
