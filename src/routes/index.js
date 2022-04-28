import express from 'express'
import deviceRoutes from './device.route.js'

const router = {
  app: express.Router(),
  api: express.Router()
}

router.app.use('/devices', deviceRoutes.app)
router.api.use('/devices', deviceRoutes.api)

export default router
