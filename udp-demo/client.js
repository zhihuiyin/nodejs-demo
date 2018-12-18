const dgram = require('dgram')
const host = '127.0.0.1'
const port = 3000
const protocol = 'udp4'

const socket = dgram.createSocket(protocol)

sendMsg('hello server ...', host, port)

socket.on('message', function (msg, rinfo) {
    console.log('\n get server msg: ', msg.toString())
    console.log('\n server rinfo: ', JSON.stringify(rinfo))
})

socket.on('close', function () {
    console.log('\n connect is close ...\n')
})

socket.on('error', function (err) {
    console.log('\n connect is error: ', err)
})

function sendMsg(msg, host, port) {
    socket.send(msg, 0, msg.length, port, host, function (err, bytes) {
        if (err) return console.log('\n send msg error: ', err)
        console.log('\n client send msg bytes ', bytes)
    })
}