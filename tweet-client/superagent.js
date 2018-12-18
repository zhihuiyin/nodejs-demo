const request = require('superagent')

request.get('http://twitter.com/search.json')
        .send({q:'justin bieber'})
        .end(function(res) {
            console.log(res.body)
        })