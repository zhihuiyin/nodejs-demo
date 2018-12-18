const mongodb = require('mongodb')
const Client = mongodb.MongoClient
const host = '127.0.0.1'
const port = 27017
const dbName = 'article'

const url = `mongodb://${host}:${[port]}/${dbName}`

Client.connect(url,function(err,db){
    if(err) return console.log('\n connect filed ',err)
    console.log('\n connect success ')
    
    db.collection('article',function(err,collection){
        if(err) return console.log('\n collecton error ',err)
        console.log('\n collection success ')

        collection.find().toArray({},function(err,doc){
            // Client.close()
            if(err) return console.log('\n find error ',err)
            console.log('\n find success ',doc)
        })
    })
})