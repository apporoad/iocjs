// here is test Promise

var i1154 = require("./ioc").module("1154").invoke(["fn1","config"])

i1154.fn1("hello").then(function(r){ console.log(r)}).then(function(){
    console.log("!")
})


// here is reg
var m1154 = require("./ioc").module("1154")
m1154.reg([
    {
        name:"fn1",
        fn:function(p1){
            return new Promise(function(resolve,reject){
                setTimeout(() => {
                    console.log(p1 + " ")
                    resolve("hello good day")
                },1000);
                
            })
           
        }
    }
])