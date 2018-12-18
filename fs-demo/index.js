const fs = require('fs')

// fs.open('../index.js', 'r+', function (err, fd) {
//     if (err) {
//         return console.log(err)
//     }
//     console.log('open success', fd)

//     var readBuffer = new Buffer(1024);

//     fs.read(fd,readBuffer,0,readBuffer.length,100,function(err,readByte) {
//         console.log('读取数据总数：'+readByte+' bytes');

//         console.log(readBuffer.slice(0,readByte))
//     })

//     // setTimeout(() => {
//     //     fs.close(fd, function () {
//     //         console.log('close success')
//     //     })
//     // }, 2000);
// })

fs.writeFile('../index1.js','hello nodejs',function(err) {
    if(err){
        throw err
    }else{
        console.log('write success')
    }
})

fs.appendFile('../index1.js','\n append data','utf8',function(err) {
    if(err){
        throw err
    }else{
        console.log('append success')
    }
})

fs.appendFile('../index1.js','\n append buffer',function(err) {
    if(err){
        throw err
    }else{
        console.log('append buffer success')
    }    
})


fs.readFile('../index1.js',{encoding:'utf8'},function(err,data) {
    if(err){
        throw err
    }else{
        console.log('fs data : \n',data)
    }
        
})