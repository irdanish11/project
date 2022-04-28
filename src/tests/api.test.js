import { test } from 'tap'
import request from 'supertest'
import fs from 'fs/promises'
import path from 'path'

import { createApp } from '../app.js'
import { DB_PATH } from '../env.js'

const app = createApp()

test('GET /api/v1/devices', async t => {
  const devices = JSON.parse(await fs.readFile(path.resolve(DB_PATH, './devices.json')))

  const res = await request(app)
    .get('/api/v1/devices')
    .expect(200)

  t.same(res.body.data, devices)
})
