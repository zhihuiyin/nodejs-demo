const cheerio = require('cheerio') 

function findImg(dom,cb) {
    console.log('findImg')
    let $ = cheerio.load(dom);
    // console.log('$img',$('img'))
    $('img').each(function(i,ele) {
        // console.log('img',$(this))
        let imgSrc = $(this).attr('src');
        cb(imgSrc,i);
    })
    
}

module.exports = {
    findImg
}