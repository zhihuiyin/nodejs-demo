!window.Vue &&
    document.write(unescape('%3Cscript src="./vue.js" %3E %3C/script%3E')) //引用cdn不成功后加载本地的代码
// quoteJS();

function quoteJS(v) { //创建script标签引入js，有延迟
    console.log('quoteJS');
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = v || "./vue.js";
    document.head.appendChild(script);
}

// function setHtml(ele) { //在head标签末尾追加script标签
//     var head = document.getElementsByTagName('head')[0];
//     head.innerHTML = head.innerHTML + unescape('%3Cscript src="./vue.js" %3E %3C/script%3E');
// }

// function setAttr(attr, v, ele) { //有延迟
//     var att = document.createAttribute(attr || "src");
//     att.value = v || "./vue.js";
//     var vue = document.getElementById(ele || 'vue');
//     vue.setAttributeNode(att);
//     // vue.setAttribute('src','./vue.js');
//     console.log(vue);
// }