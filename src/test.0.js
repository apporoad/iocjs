
var ioc = require('./ioc')

console.log("here is easy use******************************************************")
//error
//ioc.invoke.test1("p1","p2")
//1. you must record first
ioc.record(["test1","test2","test3"])
//2. you can invoke fn you recorded already
ioc.invoke.test1("p1","p2").then(function(data){
    console.log(data)
})
ioc.invoke.test2().then(function(){
    console.log("test2 invoked ok")
})
ioc.invoke.test3("p1").then(function(data){
    console.log(data)
})

var bo = {
    name : "LiSA",
    age :32
}
//3. you must register fn anywhere in 5 seconds
ioc.reg([
    {
        name:"test1",
        fn:function(p1,p2,p3){
            return p1 + p2 ;
        }
    },
    {
        name : "test2",
        fn:function(p1){
            
        }
    },
    {
        name: "test3",
        fn: function(p1){
            return p1 + this.name + this.age;
        },
        bindObj : bo
    }
])
