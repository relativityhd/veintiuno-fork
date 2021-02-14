const path = require('path')
const express = require('express')
const cors = require('cors')
const http = require('http')
const socketIO = require('socket.io')

const app = express()
const server = http.Server(app)

const io =
  process.env.NODE_ENV === 'production'
    ? socketIO(server)
    : socketIO(server, {
        cors: {
          origin: 'http://localhost:3000',
          methods: ['GET', 'POST']
        }
      })
const port = process.env.PORT || 5000

app.use(express.static(path.resolve(__dirname, '../../react-client/build')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../react-client/build/index.html'))
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`)
})
