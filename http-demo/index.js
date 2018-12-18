const http = require('http')
const fs = require('fs')
const url = require('url')
const path = require('path')
const mime = require('./mime')
const host = '127.0.0.1'
const port = 8080


const server = http.createServer(function(req,res) {
    
    let filePath = url.parse(req.url).pathname;
    console.log('filePath',filePath)
    if(filePath === '/' || filePath === ''){
        filePath = './index.html'
    }

    fs.exists(filePath,function(exist) {
        if(!exist) return res.end('404')
        fs.readFile(filePath,function(err,data) {
            if(err) return res.end('404')
            res.writeHead(200,{'Content-Type':mime[path.extname(filePath)]}) 
            res.write(data)
            res.end()          
        })
    })
})

server.listen(port,host,function() {
    console.log('\n server is running at port 8080 ... \n')    
})