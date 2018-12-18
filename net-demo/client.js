const net = require('net');
const port = 3000;
const host = '127.0.0.1';

const client = new net.Socket();

client.connect(port,host,function() {
    console.log('\n connect the server...') 


    client.write('\n message from client...')
})

client.on('data',function(data) {
    console.log('\n the data of server is '+ data.toString())    
})

client.on('end',function() {
    console.log('\n the server is end...')
})

client.on('close',function(){
    console.log('\n the server is close...')
})

client.on('error',function(err) {
    console.log('\n the server is error: ',err)    
})

