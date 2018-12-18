
const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
const Db = mongodb.Db
const Server = mongodb.Server
const host = '127.0.0.1'
const port = 27017
const studentDb = new Db('student',new Server(host,port))//创建数据库

// const url = `mongodb://${host}:${port}/student`

// MongoClient.connect(url,{useNewUrlParser:true},function(err,db) {
//     if(err) return console.log('\n connect failed ',err)
    
//     console.log('\n connect success ...')
// })
// console.log('studentDb',studentDb)

let student1 = {
    id:'1101',
    name:'jack',
    age:25
}

let student2 = {
    id:'1102',
    name:'rose',
    age:22
}

let student3 = {
    id:'1103',
    name:'liao',
    age:23
}

studentDb.open(function(err,db){//打开数据库
    if(err) return console.log('\n open studentDb filed ',err)

    db.collection('student',function(err,collection){//打开集合
        if(err) return console.log('\n open student collection filed ',err)

        // collection.insertOne(student,function(err,doc){
        //     studentDb.close()
        //     if(err) return console.log('\n insert student filed ',err)
        //     console.log('\n doc: ',doc[0])
        // })
        // collection.insertMany([student1,student2,student3],function(err,doc){
        //     studentDb.close()
        //     if(err) return console.log('\n insert filed ',err)
        //     console.log('\n insert success ')
        // })
        // collection.findOne({},function(err,doc){
        //     studentDb.close()
        //     if(err) return console.log('\n find filed ',err)
        //     console.log('\n doc: ',doc)
        // })
        // collection.find().toArray(function(err,docs){
        //     studentDb.close()
        //     if(err) return console.log('\n find filed ',err)
        //     console.log('\n docs ',docs)
        // })
        // collection.deleteOne({id:'1101'},function(err,doc){
        //     studentDb.close()
        //     if(err) return console.log('\n delete filed ',err)
        //     console.log('\n delete success ',doc)
        // })
        collection.updateOne({id:'1100'},{$set:{name:'zhangsan',age:20}},function(err,doc){
            studentDb.close()
            if(err) return console.log('\n update filed ',err)
            console.log('\n update success')
        })
    })
})