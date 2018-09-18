
var ioc =require('./ioc')

console.log("*you can invoke fn without record ************************************************")
ioc.invoke("withoutRecord").withoutRecord("p1","p2").then(function(data){
    console.log("withoutRecord invoke success")
    return 1;
}).then(function(data){
    console.log("then withoutRecord invoke success:"+ data)
})
ioc.reg("withoutRecord",function(p1,p2){return p1+p2})