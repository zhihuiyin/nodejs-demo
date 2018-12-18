const net = require('net');
const fs = require('fs');
const async = require('async');//流程控制库
const host = 'localhost';
const port = 3000;

const server = net.createServer(function (socket) {
    console.log('someone connects')

    server.maxConnections = 3;
    server.getConnections(function(err,count) {
        if(err) return console.log('err:',err); 
        console.log('the count of client is ' + count)        
    })

    socketManager(socket)//socket对象管理器

    next(null,JSON.stringify(socket));//串行逻辑执行器
    // async.waterfall([
    //     writeFile,
    //     rename,
    //     appendFile,
    //     readFile
    // ],function(err,result) {
    //     if(err) return console.log('error: ',err)
    //     console.log('result: ',result)
    // })
})

function writeFile(data) {
    fs.writeFile('log.json',data, err =>{
        if(!err) console.log('\n write socket to log.json success...')
        next(err);
    })
}
function rename() {
    fs.rename('log.json','log.txt',err => {
        if(!err) console.log('\n rename log.json to log.txt success...')
        next(err)
    })
}
function appendFile() {
    fs.appendFile('log.txt','\n\n new log is append',err => {
        if(!err) console.log('\n append new data to log.txt success...')
        next(err)
    })
}
function readFile() {
    fs.readFile('log.txt', (err,data) => {
        if(err) return console.log('read file error: ',err)
        console.log('\n file content is: \n',data.toString())
    })
}

const tasks = [writeFile,rename,appendFile,readFile]

function next(err,result) {
    if(err) throw err;
    const currentTask = tasks.shift();
    if(currentTask) {
        setTimeout(() => {
            currentTask(result);
        }, 2000);
    }
}

server.listen(port, host)

server.on('listening', function () {
    console.log(`\n server is on ${host}:${port}...`)
    showAdress();
    // showObj(server)
})

var num = 0;

server.on('connection', function (socket) {
    // showObj(socket)
})

server.on('close', function () {
    console.log('connect nums: ', num,'\n someone lease...')
})

server.on('error', function (error) {
    console.log('connect error: ', error)
})


function showAdress() {
    let address = server.address();
    console.log(
        `
         port is ${address.port}
         family is ${address.family}
         address is ${address.address}
        `);

}

function showObj(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let ele = obj[key];
            console.log(key,'- -',ele)
        }
    }   
}


function socketManager(socket) {
    var dataStr = '';
    var address = server.address();
    var message = '\n client , the server address is '+JSON.stringify(address);

    socket.write(message,function() {
        console.log(message + ' has send');
        console.log('the size of message is ',socket.bytesWritten)
    })

    socket.on('connect',function(){
        num += 1;
        console.log('socket connect...')
        console.log('connect nums: ', num)
        
    })

    socket.on('data',function(data) {
        dataStr += data.toString();
        console.log('client send data: ',data.toString())   
        console.log('the size of data is ',socket.bytesRead)     

        fs.appendFile('clientData.txt',data.toString(),err => {
            if(err) return console.log('append client data error: ',err)
            console.log('append client data success... ')
        })
    })

    socket.on('end',function () {
        num -= 1;
        console.log('socket end')
        console.log('dataStr is ',dataStr)

        fs.readFile('clientData.txt',(err,data) => {
            if(err) return console.log('read clientData error: ',err)
            console.log('read clientData success... \n',data.toString())
        })
    })

    socket.on('error',function(err){
        console.log('socket error: ',err)
    })

    socket.on('timeout',function(){
        console.log('socket timeout...')
    })

    console.log(`
            localPort: ${socket.localPort}
            localAddress: ${socket.localAddress}
            remotePort: ${socket.remotePort}
            remoteFamily: ${socket.remoteFamily}
            remoteAddress: ${socket.remoteAddress}
        `)
}



