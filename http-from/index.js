const http = require('http')

const server = http.createServer(function(req,res) {
    res.writeHead(200,{"Content-Type":"text/html"})
    if(req.url == '/'){
        res.end([
            '<form method="POST" action="/url">',
            '<h1>My form</h1>',
            '<fieldset>',
            '<label>Personal information</label>',
            '<p>What is your name?</p>',
            '<input type="text" name="name">',
            '<p><button>Submit</button></p>',
            '</form>'
        ].join(''))
    }else if(req.url == '/url'){
        res.end(`You sent a <b>${req.method}</b> request`)
    }else{
        res.writeHead(404);
        res.end('404 Not Found')
    }
})

server.listen(3000,function() {
    console.log(" server is running at localhost:3000... ")    
})