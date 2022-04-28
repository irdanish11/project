import express from 'express'
import { validator } from 'express-fastest-validator'

const router = {
  app: express.Router(),
  api: express.Router()
}

router.app.get('/', async (req, res, next) => {
  try {
    const devices = await req.models.Device.getAll()
    res.render('devices', {
      title: 'Devices',
      devices
    })
  } catch (err) {
    next(err)
  }
})

router.api.get('/', async (req, res, next) => {
  try {
    const devices = await req.models.Device.getAll()
    res.json({ data: devices })
  } catch (err) {
    next(err)
  }
})

router.api.put('/:id', validator({
  params: {
    id: { type: 'uuid' }
  },
  body: {
    name: { type: 'string', min: 3 }
  }
}),
async (req, res, next) => {
  try {
    const device = await req.models.Device.findById(req.params.id)
    if (!device) throw req.error(404, 'device not found')
    device.name = req.body.name
    await device.save()
    return res.json({ data: device })
  } catch (err) {
    next(err)
  }
})

export default router
