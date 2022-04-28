import { createApp } from './app.js'
import { NODE_PORT } from './env.js'

const port = NODE_PORT || 3000
const app = createApp()
app.listen(port, () => {
  console.log(`listening to requests on port ${port}`)
})
