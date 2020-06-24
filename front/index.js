let noti = $('.noti')
let ws = createWS()

$('.new-link').click(() => {
  ws && ws.close()
  ws = createWS()
})

function createWS() {
  let ws = new WebSocket('ws://localhost:8080')
  ws.onmessage = onMessage
  noti.text('寻找陌生人中。。。')
  return ws
}

function onMessage(e) {
  let m = JSON.parse(e.data)
  if (m.cmd) {
    createLeft(m.msg)
  } else {
    noti.text('开始聊天吧')
  }
}

let msg = $('.message')
$('.send').click(() => {
  let val = msg.val()
  if (ws && val) {
    ws.send(val)
    msg.val('')
    createRight(val)
  }
})

let main = $('.main')
function createRight(val) {
  main.append('<div class="msg"><div class="right">' + val + '</div></div>')
}

function createLeft(val) {
  main.append('<div class="msg"><div class="left">' + val + '</div></div>')
}
