import fs from 'fs/promises'
import path from 'path'

export const loadDB = (opts = {}) => {
  let { dbPath } = opts

  dbPath = path.resolve(process.cwd(), dbPath)

  const db = {
    get: async (file) => {
      const data = await fs.readFile(path.join(dbPath, `${file}.json`))
      return JSON.parse(data)
    },
    update: async (file, data) => {
      await fs.writeFile(path.join(dbPath, `${file}.json`), JSON.stringify(data, null, 2), 'utf-8')
    }
  }

  return (req, res, next) => {
    req.db = db
    next()
  }
}
