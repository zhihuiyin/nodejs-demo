const mongoose = require('mongoose')
const host = '127.0.0.1'
const port = 27017

const uri = `mongodb://${host}:${port}/article`

mongoose.connect(uri,{ useNewUrlParser: true },function(err){
    if(err) return console.log('\n connect filed ',err)
    console.log('\n connect success ')
})

const ArticleSchema = new mongoose.Schema({
    title:String,
    age:Number,
    high:Number,
    sex:String,
    pushTime:Date
})

mongoose.model('Article',ArticleSchema)
const model = mongoose.model('Article')

// let art = new model({
//     title:'zhansan',
//     age:25,
//     high:180,
//     sex:'men',
//     pushTime:new Date()
// })

// art.save(function(err){
//     if(err) return console.log('\n data save filed ',err)
//     console.log('\n save success ')
// })

model.find({},function(err,docs){
    if(err) return console.log('\n find filed ',err)
    docs[2].title = 'lishi'
    docs[3].title = 'wangwu'
    docs[0].remove()
    console.log('\n find success ',docs)

})