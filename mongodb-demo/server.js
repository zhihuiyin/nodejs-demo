const mongoose = require('mongoose')
const host = '127.0.0.1'
const port = 27017
const user = 'Administrator'
const password = 'qwerty123456'

//定义mongodb地址
const uri = `mongodb://${host}:${port}/article`
// const uri = `mongodb://${user}:${password}@${host}:${port}/article`

//连接mongodb
mongoose.connect(uri,{ useNewUrlParser: true },function(err){
    if(err) return console.log('\n connect error: ',err)
    console.log('\n connect success ...')
})

//创建文档模板
const ArticleSchema = new mongoose.Schema({//合法数据类型有：String,Number,Date,Buffer,Boolean,Mixed,Objectid,Array
    title:String,
    author:String,
    content:String,
    publisthTime:Date
})

//注册模板
mongoose.model('Article',ArticleSchema)

//获取数据模型
const Article = mongoose.model('Article')

//实例化数据
let art = new Article({
    title:'node.js',
    author:'node',
    content:'node.js is great!',
    publisthTime:new Date()
})

//将数据插入到collection中
// art.save(function(err){
//     if(err) return console.log('\n save filed')
//     console.log('\n save success')
// })

// Article.find({a:1},function(err,docs) {
//     if(err) return console.log('find error: ',err)
//     console.log('\n find success \n\n',docs)    
// })

// Article.findOne({title:'node.js'},function(err,docs) {
//     if(err) return console.log('find error: ',err)
//     console.log('\n find success \n\n',docs)    
// })

Article.find({title:'hello mongodb'},function(err,docs) {
    if(err) return console.log('find error: ',err)
    docs[0].remove()
    console.log('\n find success \n\n',docs)    
})

Article.find({},function(err,docs) {
    if(err) return console.log('find error: ',err)
    console.log('\n find success \n\n',docs)    
})
