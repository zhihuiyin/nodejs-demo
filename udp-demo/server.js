const dgram = require('dgram')
const host = '127.0.0.1'
const port = 3000
const protocol = 'udp4'

const socket = dgram.createSocket(protocol)

socket.bind(port,host,function() {
    console.log(`\n udp server is bind at ${host}:${port} ... `)
})

socket.on('listening',function() {
    console.log('\n server is listening ... ')
})

socket.on('message',function(msg,rinfo){
    console.log('\n client send msg: %s ',msg.toString())
    console.log('\n client rinfo : %s ',JSON.stringify(rinfo))

    sendMsg('hello client',rinfo.address,rinfo.port)
}) 

socket.on('close',function(){
    console.log('\n server is close ... ')
})

socket.on('error',function(err){
    console.log('\n server is error: ',err)
})


function sendMsg(msg,address,port) {
    socket.send(msg,0,msg.length,port,address,function(err,bytes) {
        if(err) return console.log('send error: ',err)
        console.log('\n server send msg bytes: ',bytes)
    })
}