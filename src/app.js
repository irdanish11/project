import express from 'express'
import * as eta from 'eta'
import path from 'path'
import { fileURLToPath } from 'url'

import { DB_PATH } from './env.js'
import { createError, errorHandler } from './middlewares/error.js'
import { loadDB } from './middlewares/db.js'
import routes from './routes/index.js'
import models from './models/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const createApp = () => {
  const app = express()

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.engine('eta', eta.renderFile)
  app.set('view engine', 'eta')
  app.set('views', path.join(__dirname, './views'))

  app.use(express.static('public'))
  app.use(createError)
  app.use(loadDB({ dbPath: DB_PATH }))

  app.use(models)
  app.use('/', routes.app)
  app.use('/api/v1', routes.api)

  app.get('/not-found', (req, res) => {
    res.render('not-found', {
      title: 'Not found'
    })
  })

  app.get('/', (req, res) => {
    return res.status(301).redirect('/devices')
  })

  app.get('*', (req, res) => {
    return res.status(301).redirect('/not-found')
  })

  app.all('/api/v1/*', (req, res, next) => {
    next(res.error(404, 'not found'))
  })

  app.use(errorHandler)

  return app
}
