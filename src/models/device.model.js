import mUUID from 'uuid-mongodb'

export default class Device {
  static db = null

  constructor (data = {}) {
    const { id = mUUID.v4().toString(), name, createdAt, updatedAt } = data
    this.id = id
    this.name = name
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }

  static async getAll () {
    const devices = await Device.db.get('devices')
    return devices.map(data => new Device(data))
  }

  static async findById (id) {
    const devices = await Device.db.get('devices')
    const data = devices.find(d => d.id === id)
    if (data) return new Device(data)
  }

  static async updateById (id, update = {}) {
    const devices = await Device.db.get('devices')
    const deviceIndex = devices.findIndex(d => d.id === id)
    if (deviceIndex === -1) throw new Error('device not found')

    devices[deviceIndex] = { ...devices[deviceIndex], ...update, id }
    await Device.db.update('devices', devices)
  }

  async save () {
    if (!this.createdAt) {
      this.createdAt = Date.now()
    }

    this.updatedAt = Date.now()

    await Device.updateById(this.id, {
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    })
  }
}
