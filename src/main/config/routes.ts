import { Router, type Express } from 'express'
import { bodyParser, cors, contentType } from '../middlewares'
import fg from 'fast-glob'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)

  const router = Router()

  app.use(router)

  fg.sync('**/src/main/routes/**routes.ts').map(async file => (await import(`../../../${file}`)).default(router))
}
