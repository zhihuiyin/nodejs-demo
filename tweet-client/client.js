const http = require('http')
const qs = require('querystring')

var search = process.argv.slice(2).join(' ').trim()

if (!search.length) {
    return console.log('\n Usage:node tweets <search term>\n')
}
console.log('\n searching for: \033[96m' + search + '\033[39m\n')

// function send(theName) {
http.request({
    host: 'search.twitter.com',
    port: 80,
    path: '/search.json?'+qs.stringify({q:search}),
    method: 'GET',
}, function (res) {
    var body = ''
    res.setEncoding('utf8')
    res.on('data',function(chunk) {
        body += chunk
    })
    res.on('end', function () {
        var obj = JSON.parse(body)
        obj.results.forEach(tweet => {
            console.log('\n  \033[90m '+tweet.text+' \033[39m')
            console.log('\n  \033[90m '+tweet.from_user+' \033[39m')
            console.log('--')
        });
        
        // process.stdout.write('\n your name: ')
    })
}).end()

// }

// process.stdout.write('\n your name: ')
// process.stdin.resume();
// process.stdin.setEncoding('utf8')
// process.stdin.on('data', function (name) {
//     send(name.replace('\n', ''))
// })