import Device from './device.model.js'

export default (req, res, next) => {
  Device.db = req.db

  req.models = {
    Device
  }

  next()
}
