const http = require('http')
const host = '127.0.0.1'
const port = 8080


const server = http.createServer(function(req,res) {
    let url = req.url
    let method = req.method
    let data = req.data
    let obj = {url,method,data}

    requestManager(req)
    // console.log('req: ',req)
    res.writeHead(200,{'Content-Type':'application/json'})
    res.write(JSON.stringify(obj))
    res.end()
})

server.listen(port,host,function(){
    console.log('\n server is running at %s:%s ',host,port)
})

server.on('listening',function(){
    console.log('\n server is listening')
})

server.on('connection',function(socket) {
    console.log('\n clinet is connect ...')  
    // console.log('\n socket is ',socket)  
})

server.on('close',function(){
    console.log('\n server is close')
})

server.on('error',function(err) {
    console.log('\n server is error: ',err)    
})

function requestManager(req) {
    let data = ''
    
    req.on('data',function(chunk){
        data += chunk
        // console.log('chunk',chunk)
    })

    req.on('end',function(){
        console.log('\n client send data: ',data.toString())
    })
}