const http = require('http')
const host = '127.0.0.1'
const port = 8080
const method = 'POST'

const client = http.request({port,host,method})

client.write('hello server','utf8',function(){
    console.log('\n some msg send to server')
})

client.on('response',function(res){
    let data = ''

    res.on('data',function(chunk){
        data += chunk
    })

    res.on('end',function(){
        console.log('\n get server data: ',data.toString())
    })
})

client.end()