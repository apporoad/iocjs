
console.log("*easy use with chain*******************************************************")

var m1 = require("./ioc").module("m1").reg("fn1",function(data){
    console.log("m1 chain success:" + data)
}).invoke

var m2 = require("./ioc").module("m2").reg("fn1",function(data){
    console.log("m1 chain success" + data)
}).invoke

m1.fn1("hello good day")
m2.fn1("hello good day")

//here is invoke
require("./ioc").invoke("fn1").fn1("hello good day").then(function(data){ console.log("here is then")})

//here is register
require("./ioc").reg("fn1",function(p1){console.log("divide chain success:" + p1 + " "+ this.LiSA)},{ LiSA : "love and peace"})


// recomand operation
//here is invoke
var i1154 = require("./ioc").module("1154").invoke(["fn1","config"])

i1154.fn1("hello good day")
i1154.config().then(function(config){
    console.log("config value :" + config.name)
})


// here is reg
var m1154 = require("./ioc").module("1154")
m1154.reg([
    {
        name:"fn1",
        fn:function(p1){
            console.log("recommanded is success:" + p1)
            return "yes"
        }
    },
    {
        name:"config",
        fn:function(){
            return {
                name : "LiSA"
            }
        }
    }
])



