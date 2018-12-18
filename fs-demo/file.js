const fs = require('fs');

// fs.stat('index.js',function(err,stats) {
//     if(err) return console.log('err',err)
//     console.log(stats)   
// })

// fs.open('index.js','r+',function(err,fd) {
//     if(err) return console.error(err)
//     console.log('文件成功打开 fd：',fd)    

//     var readBuffer = Buffer.alloc(1024),
//         offset = 0,
//         len = readBuffer.length,
//         filePositon = 100;

//     fs.read(fd,readBuffer,offset,len,filePositon,function(err,readByte) {
//         console.log('读取数据总数 : '+ readByte)    
//         console.log(readBuffer.slice(0,readByte))    
//     })


//     setTimeout(() => {
//         fs.close(fd,function() {
//             console.log('文件成功关闭！')
//         })
//     }, 2000);
// })

fs.readFile('index.js', function (err, data) {
    throwErr();
    console.log('file data: ', data)

    fs.writeFile('newFile.js', data, err => {
        throwErr();
        console.log('write success')

        fs.appendFile('newFile.js', '\n\n "hello node.js 111"', 'utf8', err => {
            throwErr();
            console.log('append data success')
        })
        fs.appendFile('newFile.js', '\n\n "hello coder 111"', err => {
            throwErr();
            console.log('append buffer data success')
        })

        setTimeout(() => {
            fs.rename('newFile.js','newFile.txt',err => {
                throwErr();
                console.log('rename success')
            })
        }, 2000);

        setTimeout(() => {
            fs.unlink('newFile.txt',err => {
                throwErr();
                showSuccess('unlink file success')
            })
        }, 4000);
    })
})

function throwErr(err) {
    if (err) return console.log('error: ', err);
}

function showSuccess(text) {
    console.log(text);
}