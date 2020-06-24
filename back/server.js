const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 })

const users = []

wss.on('connection', function connection(ws) {
  if (!users.length) {
    return users.push(ws)
  }

  const other = users.shift()
  other.peer = ws
  ws.peer = other

  bind(ws, other)

  connected(ws, other)
})

const conn = JSON.stringify({ cmd: 0 })
function connected(ws1, ws2) {
  ws1.send(conn)
  ws2.send(conn)
}

function bind(ws1, ws2) {
  ws1.on('message', incoming)
  ws2.on('message', incoming)
}

function incoming(message) {
  this.peer.send(
    JSON.stringify({
      cmd: 1,
      msg: message,
    })
  )
}
