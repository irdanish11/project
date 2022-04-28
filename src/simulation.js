import fetch from 'node-fetch'
import fs from 'fs/promises'
import path from 'path'
import { DB_PATH, NODE_PORT, API_HOST } from './env.js'

function rand (min, max) {
  max = max + 1
  return Math.floor(Math.random() * (max - min)) + min
}

;(async () => {
  const devices = JSON.parse(await fs.readFile(path.resolve(DB_PATH, './devices.json')))

  while (true) {
    await new Promise(resolve => setTimeout(resolve, rand(1_000, 5_000)))
    const device = devices[rand(0, devices.length - 1)]

    const data = {
      deviceId: device.id,
      uptime: rand(0, 20),
      load: rand(0, 100),
      freeMem: rand(0, 2048)
    }

    const res = await fetch(`http://${API_HOST}:${NODE_PORT}/api/v1/updates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).catch(err => {
      console.error(err.message)
    })

    console.log({
      url: `http://${API_HOST}:${NODE_PORT}/api/v1/updates`,
      data,
      response: {
        status: res?.status,
        data: await res?.json()
      }
    })
  }
})()
