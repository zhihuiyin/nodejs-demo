const http = require('http');
const fs = require('fs')
const host = '127.0.0.1';
const port = 8080;

const server = http.createServer(function(req,res) {
    
    requsetManager(req);
    responseManager(res,req);
})

server.listen(port,host,function(){
    console.log('\n server is running on 127.0.0.1:8080...')
})

server.on('connection',function(socket) {
    console.log('someone connect...')
})

server.on('error',function(err) {
    console.log('connect error: ',err)    
})

server.on('close',function() {
    console.log('connect is close...')    
})

function requsetManager(req) {
    let data = '';
    req.on('data',function(chunk) {
        data += chunk;        
    })   
    req.on('end',function() {
        console.log('connect end...',data.toString())
    }) 
    req.on('close',function() {
        console.log('connect close...')        
    })
}

function responseManager(res,req) {
    // let obj = {
    //     method:req.method,
    //     url:req.url,
    //     headers:JSON.stringify(req.headers),
    //     httpVersion:req.httpVersion
    // }
    fs.readFile('index.html',(err,data) => {
        if(err) return console.log('error',err)
        sendMsg(data,'text/html',res)
    })

}

function sendMsg(data,type,res) {
    res.writeHead(200,{'Content-Type':type})
    res.write(data);
    res.end()
}