const url = require('url');
const querystring = require('querystring');
const util = require('util');

let parseUrl = 'https://www.google.com/?q=node.js';

let urlObj = url.parse(parseUrl);

// console.log(urlObj);

let urlAdress = url.format(urlObj);

// console.log(urlAdress)

// console.log(url.resolve(urlAdress,'/image/asdf123'))

let str = 'a=1&b=2&c=3'

let strObj = querystring.parse(str);

// console.log(strObj);

// console.log(querystring.stringify(strObj))

let obj = {
    a:1,
    b:2,
    c:3
}

// console.log(util.inspect(obj,{color:true}))

// console.log('%s %s %s',obj.a,obj.b,obj.c)

// console.log(util.format('%s is %d%s','andy',12))

// console.log(util.log('\n hello nodejs'))

const path = require('path');

// console.log(path.join(__dirname,'asdf','node','node.js'))
// console.log(path.parse('c:/a/b/c/node/node.js'))
// console.log(path.format(path.parse('c:/a/b/c/node/node.js')))
// console.log(path.extname(path.format(path.parse('c:/a/b/c/node/node.js'))))

const dns = require('dns')

let domain = 'baidu.com';
// let domain = 'localhost'

dns.resolve(domain,function(err,address) {
    if(err){
        console.log(err);
        return
    }    
    console.log(address)
})

dns.lookup(domain,function(err,address) {
    if(err){
        console.log(err);
        return
    }    
    console.log(address)
})

// dns.reverse('114.114.114.114',function(err,domain) {
//     console.log(domain)
// })




