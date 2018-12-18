const http = require('http')
const host = '127.0.0.1'
const port = 8080
const options = {host,port}
let resData = ''

const request = http.request(options)

// request.writeHead({'Content-Type':'text/plan'})

request.write('hello server...',function(){
    console.log('message send to server')
})

request.on('response',function(res) {
    console.log('connect success ...')
    res.on('data',function(chunk) {
        resData += chunk;
    })

    res.on('end',function(){
        console.log('connect end ... \n',JSON.parse(resData))
    })
})

setTimeout(() => {
    request.end();
}, 2000);